import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import CategoryService from "../../../API/CategoryService.js";
import BookService from "../../../API/BookService.js";
import {Badge, Button, Form, Image, Spinner} from "react-bootstrap";
import ModalBookStore from "../../../ui/ModalBookStore.jsx";
import ErrorField from "../../../ui/ErrorField.jsx";
import MenuList from "../../Menu/MenuList.jsx";
import AuthorService from "../../../API/AuthorService.js";
import DatePicker from "react-datepicker";

const BookCreateForm = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Показать модальное окно
    const [show, setShow] = useState(false);
    //Для отправки на другие страницы
    const navigate = useNavigate();
    //Ошибка при загрузке
    const [isErrorUpload, setIsErrorUpload] = useState(false);
    //Калбек для закрытия модального окна
    const handleClose = () => setShow(false);
    //Состояние для отрисовки загруженного изображения на странице
    const [imagesURL, setImagesURL] = useState();
    //Список категорий
    const [categories, setCategories] = useState([]);
    //Список авторов
    const [authors, setAuthors] = useState([]);
    //Состояние загрузки категорий
    const [isCategoriesLoading, setCategoriesIsLoading] = useState(true);
    //Состояние загрузки категорий
    const [isAuthorsLoading, setAuthorsIsLoading] = useState(true);
    //Состояние загрузки формы
    const [isUploading, setIsUploading] = useState(false);
    //Состояния общей ошибки
    const [error, setError] = useState({
        global: '',
    });
    //Есть ли дата создания
    const [haveDateCreated, setHaveDateCreated] = useState(false);
    const [bookId, setBookId] = useState(0);
    //Валидация
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            name: '',
            description: '',
            category_id: 1,
            photo: '',
            pdf: '',
        },
        //Валидация
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Поле не может быть пустым!').min(2, 'Длина наименовании книги должна начинаться от 2 символов!').max(32, 'Длина наименовании книги не может превышать 32 символов!').matches(/^([А-Яа-яЁё№-]+\s)*[А-Яа-яЁё№-]+$/u, 'Используйте только русские буквы!'),
            description: Yup.string()
                .notRequired().max(65000, 'Длина описании не может превышать 65000 символов!'),
            category_id: Yup.number()
                .required('Обязательно выберите категорию!'),
            date_created: Yup.date()
                .notRequired(),
            pdf: Yup.string()
                .required('Обязательно выберите книгу')
        }),
        //Отправка
        onSubmit: values => {
            //Выставляем состояние загрузки и обнуляем ошибки
            setIsUploading(true);
            setShow(true);
            setIsErrorUpload(false);
            const submit = async () => {
                const response = await BookService.storeBook(user, values);
                if (response.status) {
                    setIsUploading(false);
                    setBookId(response.data.id);
                } else {
                    setIsErrorUpload(true);
                    setIsUploading(false);
                    for (const [name, value] of Object.entries(response.errors)) {
                        switch (name.toString()) {
                            case 'name':
                                formik.setFieldError('name', value.toString());
                                break;
                            case 'description':
                                formik.setFieldError('description', value.toString());
                                break;
                            case 'category_id':
                                formik.setFieldError('category_id', value.toString());
                                break;
                            case 'authors':
                                formik.setFieldError('date_created', value.toString());
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
    // //Обработчик загружаемого изображения
    const handleIcon = async (e, setFieldValue) => {
        const file = e.target.files[0];
        setImagesURL(undefined);
        if (file?.size / 1024 / 1024 < 2) {
            setImagesURL(URL.createObjectURL(file));
            const base64 = await convertToBase64(file);
            setFieldValue('photo', base64);
        } else {
            formik.setFieldError('photo', 'Фотография должна иметь размер 2 мегабайта или меньше!');
        }
    }
    const handleDocument = async (e, setFieldValue) => {
        const file = e.target.files[0];
        setImagesURL(undefined);
        if (file?.size / 1024 / 1024 < 50) {
            const base64 = await convertToBase64(file);
            setFieldValue('pdf', base64);
        } else {
            formik.setFieldError('pdf', 'Книга должна иметь размер меньше 50 мегабайт!');
        }
    }
    //Для отправки на страницу списка авторов

    const setSelectedAuthor = (selected) => {
        formik.setFieldValue('authors', selected)
    }
    const sendToIndex = () => {
        navigate('/librarian/books');
    }
    //Для отправки на страницу автора
    const sendToPage = () => {
        navigate('/librarian/books/' + bookId);
    }
    //Загрузка категорий
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await CategoryService.getCategories(user);
            if (response.status) {
                setCategories([...response.data]);
                setCategoriesIsLoading(false);
                await formik.setFieldValue('category_id', response.data[0].id);
            }
        }
        fetchCategories();
    }, []);
    //Загрузка авторов
    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await AuthorService.getAuthors(user);
            if (response.status) {
                setAuthors([...response.data]);
                setAuthorsIsLoading(false);
            }
        }
        fetchAuthors();
    }, []);
    //Удаление поле в случае отключения даты создания
    useEffect(() => {
        formik.setFieldValue('date_created', undefined);
    }, [haveDateCreated]);
    return (
        <Form onSubmit={formik.handleSubmit}>
            <ModalBookStore
                show={show}
                handleClose={handleClose}
                isLoading={isUploading}
                isError={isErrorUpload}
                sendToIndex={sendToIndex}
                sendToPage={sendToPage}
            />
            <Form.Group className='mb-3'>
                <Form.Label>Наименование книги</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите наименование книги'
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && formik.errors.name}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                />
                {formik.touched.name && formik.errors.name &&
                    <ErrorField message={formik.errors.name}/>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name='description'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.description && formik.errors.description}
                />
                <Badge
                    bg={formik.values.description.length > 65000 ? 'danger' : 'primary'}>{formik.values.description.length}/65000</Badge>
                {formik.touched.description && formik.errors.description &&
                    <ErrorField message={formik.errors.description}/>
                }
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Категория</Form.Label>
                {isCategoriesLoading ? <Spinner animation='border'/> :
                    <Form.Select onChange={e => formik.setFieldValue('category_id', Number(e.target.value))}>
                        {categories.map(category =>
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </Form.Select>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Автор(ы) книги</Form.Label>
                {isAuthorsLoading ? <Spinner animation='border'/> :
                    <MenuList elements={authors} getSelected={setSelectedAuthor}/>}
            </Form.Group>
            <Form.Group className='mb-1'>
                <Form.Check
                    type="switch"
                    label="Наличие даты написание книги"
                    onChange={e => setHaveDateCreated(e.target.checked)}
                />
            </Form.Group>
            {haveDateCreated &&
                <Form.Group className='mb-3'>
                    <Form.Label>Дата написания книги</Form.Label>
                    <DatePicker dateFormat="dd/MM/yyyy" locale="ru" selected={formik.values.date_created}
                                onChange={(date) => formik.setFieldValue('date_created', date)}/>
                </Form.Group>
            }
            <Form.Group className="mb-3">
                <Form.Label>Книга</Form.Label>
                <Form.Control type="file"
                              accept="application/pdf"
                              isInvalid={formik.touched.pdf && formik.errors.pdf}
                              onChange={(e) => handleDocument(e, formik.setFieldValue)}/>
                {formik.touched.pdf && formik.errors.pdf &&
                    <ErrorField message={formik.errors.pdf}/>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Обложка книги</Form.Label>
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

export default BookCreateForm;
