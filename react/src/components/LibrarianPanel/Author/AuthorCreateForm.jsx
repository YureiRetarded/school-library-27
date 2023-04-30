import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import CountryService from "../../../API/CountryService.js";
import AuthorService from "../../../API/AuthorService.js";
import {Badge, Button, Form, Image, Spinner} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import {useFormik} from "formik";
import * as Yup from "yup";
import ModalAuthorStore from "../../../ui/ModalAuthorStore.jsx";

//Установка языка и локали в data-picker
registerLocale('ru', ru);


const AuthorCreateForm = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Показать модальное окно
    const [show, setShow] = useState(false);
    const [isErrorUpload, setIsErrorUpload] = useState(false);
    //Калбек для закрытия модального окна
    const handleClose = () => setShow(false);
    //Состояние для отрисовки загруженного изображения на странице
    const [imagesURL, setImagesURL] = useState();
    //Список стран
    const [countries, setCountries] = useState([]);
    //Состояние загрузки стран
    const [isLoading, setIsLoading] = useState(true);
    //Состояние загрузки формы
    const [isUploading, setIsUploading] = useState(false);
    //Состояния общей ошибки
    const [error, setError] = useState({
        global: '',
    });
    //Есть ли дата рождения
    const [haveDateBirthday, setHaveDateBirthday] = useState(false);
    //Есть ли дата смерти
    const [haveDateDeath, setHaveDateDeath] = useState(false);
    //Валидация
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            first_name: '',
            second_name: '',
            middle_name: '',
            bio: '',
            country_id: 1,
            photo: ''
        },
        //Валидация
        validationSchema: Yup.object({
            second_name: Yup.string()
                .notRequired().min(2, 'Длина фамилии должна начинаться от 2 символов!').max(32, 'Длина фамилии не может превышать 32 символов!').matches(/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u, 'Используйте только русские буквы!'),
            first_name: Yup.string()
                .required('Поле не может быть пустым!').min(2, 'Длина имени должна начинаться от 2 символов!').max(32, 'Длина имени не может превышать 32 символов!').matches(/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u, 'Используйте только русские буквы!'),
            middle_name: Yup.string()
                .notRequired().min(2, 'Длина отчества должна начинаться от 2 символов!').max(32, 'Длина отчества не может превышать 32 символов!').matches(/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u, 'Используйте только русские буквы!'),
            bio: Yup.string()
                .notRequired().max(65000, 'Длина биографии не может превышать 65000 символов!'),
            country_id: Yup.number()
                .required('Обязательно выберите страну!'),
            date_birthday: Yup.date()
                .notRequired(),
            date_death: Yup.date()
                .notRequired(),
        }),
        //Отправка
        onSubmit: values => {
            //Выставляем состояние загрузки и обнуляем ошибки
            setIsUploading(true);
            setShow(true);
            setIsErrorUpload(false);
            const submit = async () => {
                const response = await AuthorService.storeAuthor(user, values);
                if (response.status) {
                    setIsUploading(false);
                } else {
                    setIsErrorUpload(true);
                    setIsUploading(false);
                    for (const [name, value] of Object.entries(response.errors)) {
                        switch (name.toString()) {
                            case 'first_name':
                                formik.setFieldError('first_name', value.toString());
                                break;
                            case 'second_name':
                                formik.setFieldError('second_name', value.toString());
                                break;
                            case 'middle_name':
                                formik.setFieldError('middle_name', value.toString());
                                break;
                            case 'country_id':
                                formik.setFieldError('country_id', value.toString());
                                break;
                            case 'bio':
                                formik.setFieldError('bio', value.toString());
                                break;
                            case 'photo':
                                formik.setFieldError('photo', value.toString());
                                break;
                            case 'date_birthday':
                                formik.setFieldError('date_birthday', value.toString());
                                break;
                            case 'date_death':
                                formik.setFieldError('date_death', value.toString());
                                break;
                            default:
                                setError({global: value});
                        }
                    }
                }
            }
            submit();
        }
    });
    //Конвектор изображение в base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }
    //Обработчик загружаемого изображения
    const handleIcon = async (e, setFieldValue) => {
        const file = e.target.files[0];
        setImagesURL(undefined)
        if (file?.size / 1024 / 1024 < 2) {
            setImagesURL(URL.createObjectURL(file));
            const base64 = await convertToBase64(file);
            setFieldValue('photo', base64);
        } else {
            formik.setFieldError('photo', 'Фотография должна иметь размер 2 мегабайта или меньше!');
        }
    }
    //Загрузка стран
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await CountryService.getCountries(user);
            if (response.status) {
                setCountries([...response.data]);
                setIsLoading(false);
                await formik.setFieldValue('country_id', response.data[0].id)
            }
        }
        fetchCountries();
    }, []);
    //Удаление поле в случае отключения даты рождения
    useEffect(() => {
        formik.setFieldValue('date_birthday', undefined);
    }, [haveDateBirthday]);
    //Удаление поле в случае отключения даты смерти
    useEffect(() => {
        formik.setFieldValue('date_death', undefined);
    }, [haveDateDeath]);
    return (
        <Form onSubmit={formik.handleSubmit}>
            <ModalAuthorStore show={show} handleClose={handleClose} isLoading={isUploading} isError={isErrorUpload}/>
            <Form.Group className='mb-3'>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите фамилию'
                    name='second_name'
                    onChange={formik.handleChange}
                    value={formik.values.second_name}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.second_name && formik.errors.second_name}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault();
                    }}>
                </Form.Control>
                {formik.touched.second_name && formik.errors.second_name &&
                    <ErrorField message={formik.errors.second_name}/>
                }
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите имя'
                    name='first_name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.first_name && formik.errors.first_name}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault();
                    }}>
                </Form.Control>
                {formik.touched.first_name && formik.errors.first_name &&
                    <ErrorField message={formik.errors.first_name}/>
                }
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите имя отчество'
                    name='middle_name'
                    onChange={formik.handleChange}
                    value={formik.values.middle_name}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.middle_name && formik.errors.middle_name}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                ></Form.Control>
                {formik.touched.middle_name && formik.errors.middle_name &&
                    <ErrorField message={formik.errors.middle_name}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Страна рождения</Form.Label>
                {isLoading ? <Spinner animation='border'/> :
                    <Form.Select onChange={e => formik.setFieldValue('country_id', Number(e.target.value))}>
                        {countries.map(country =>
                            <option key={country.id} value={country.id}>{country.name}</option>
                        )}
                    </Form.Select>
                }
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="switch"
                    label="Наличие даты рождения"
                    onChange={e => setHaveDateBirthday(e.target.checked)}
                />
            </Form.Group>
            {haveDateBirthday &&
                <Form.Group className='mb-3'>
                    <Form.Label>Дата рождения</Form.Label>
                    <DatePicker dateFormat="dd/MM/yyyy" locale="ru" selected={formik.values.date_birthday}
                                onChange={(date) => formik.setFieldValue('date_birthday', date)}/>
                </Form.Group>
            }
            <Form.Group>
                <Form.Check
                    type="switch"
                    label="Наличие даты смерти"
                    onChange={e => setHaveDateDeath(e.target.checked)}
                />
            </Form.Group>
            {haveDateDeath &&
                <Form.Group className='mb-3'>
                    <Form.Label>Дата смерти</Form.Label>
                    <DatePicker dateFormat="dd/MM/yyyy" locale="ru" selected={formik.values.date_death}
                                onChange={(date) => formik.setFieldValue('date_death', date)}/>
                </Form.Group>
            }
            <Form.Group className="mb-3">
                <Form.Label>Биография</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name='bio'
                    onChange={formik.handleChange}
                    value={formik.values.bio}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.bio && formik.errors.bio}
                />
                <Badge
                    bg={formik.values.bio.length > 65000 ? 'danger' : 'primary'}>{formik.values.bio.length}/65000</Badge>
                {formik.touched.bio && formik.errors.bio &&
                    <ErrorField message={formik.errors.bio}/>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Фотография автора</Form.Label>
                <Form.Control type="file"
                              accept="image/png,image/jpeg"
                              isInvalid={formik.errors.photo}
                              onChange={(e) => handleIcon(e, formik.setFieldValue)}/>
                {formik.errors.photo &&
                    <ErrorField message={formik.errors.photo}/>
                }
                <Image src={imagesURL} rounded fluid/>
            </Form.Group>
            <Button type='submit'>Сохранить</Button>
            {error.global &&
                <ErrorField message={error.global}/>
            }
        </Form>
    );
};


export default AuthorCreateForm;
