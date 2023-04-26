import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Spinner} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";
import CountryService from "../../../API/CountryService.js";
import {useFormik} from "formik";
import * as Yup from "yup";

const CountryEditForm = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Для переадресации на страницу пользователя в случае успеха
    const navigate = useNavigate();
    //ID странны в адресной строке
    const {countryId} = useParams();
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            name: '',
        },
        //Валидация
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Поле не может быть пустым!').min(2, 'Длина наименования страны должна начинаться от 2 символов!').max(64, 'Длина наименования страны не может превышать 64 символа!').matches(/^[А-Яа-яЁё ]+$/u, 'Используйте только русские буквы!'),
        }),
        //Отправка
        onSubmit: values => {
            const submit = async () => {
                const response = await CountryService.updateCountry(user, countryId, values);
                if (response.status) {
                    return navigate('/librarian/countries');
                } else {
                    formik.setFieldError('name', response.error);
                }
            }
            submit();
        }
    });
    //Загрузка наименования текущей страны
    useEffect(() => {
        const fetchCountry = async () => {
            const response = await CountryService.getCountry(user, countryId);
            if (response.status) {
                formik.setFieldValue('name', response.data.name.toString());
            } else {
                navigate('/librarian/countries/')
            }
            setIsLoading(false)
        }
        fetchCountry();
    }, [])


    return (
        <Form onSubmit={formik.handleSubmit}>
            {isLoading ? <Spinner animation='border'/> :
                <div>
                    <Form.Group className='mb-3'>
                        <Form.Label>Наименование страны</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            onKeyDown={e => {
                                e.key === 'Enter' && e.preventDefault();
                            }}></Form.Control>
                        {formik.touched.name && formik.errors.name &&
                            <ErrorField message={formik.errors.name}/>
                        }
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Изменить
                    </Button>
                </div>}
        </Form>
    );
};

export default CountryEditForm;
