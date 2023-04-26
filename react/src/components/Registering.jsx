import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import ErrorField from "../ui/ErrorField.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserService from "../API/UserService.js";
import {useFormik} from "formik";
import * as Yup from "yup";

const Registering = () => {
    //Dispatch для сервиса API
    const dispatch = useDispatch();
    //Для переадресации на страницу пользователя в случае успеха
    const navigate = useNavigate();
    //Состояния общей ошибки
    const [error, setError] = useState({
        global: '',
    });
    //Валидация и отправка полей
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            login: '',
            first_name: '',
            second_name: '',
            password: '',
            confirm_password: '',
        },
        //Валидация
        validationSchema: Yup.object({
            login: Yup.string()
                .required('Поле не может быть пустым!').min(6, 'Длина логина должна начинаться от 6 символов!').max(16, 'Длина логина не может превышать 32 символа!').matches(/^[a-zA-Z0-9]+$/u, 'Используйте только цифры и латинские буквы!'),
            first_name: Yup.string()
                .required('Поле не может быть пустым!').min(2, 'Длина имени должна начинаться от 2 символов!').max(16, 'Длина имени не может превышать 16 символов!').matches(/^[А-Яа-яЁё]+$/u, 'Используйте только русские буквы!'),
            second_name: Yup.string()
                .required('Поле не может быть пустым!').min(2, 'Длина фамилии должна начинаться от 2 символов!').max(16, 'Длина фамилии не может превышать 16 символов!').matches(/^[А-Яа-яЁё]+$/u, 'Используйте только русские буквы!'),
            password: Yup.string()
                .required('Поле не может быть пустым!').min(6, 'Длина пароля должна начинаться от 6 символов!').max(64, 'Длина пароля не может превышать 64 символа!').matches(/^[a-zA-Z0-9!@#$%&{}()?]+$/, 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!'),
            confirm_password: Yup.string()
                .required('Поле не может быть пустым!').min(6, 'Длина пароля должна начинаться от 6 символов!').max(64, 'Длина пароля не может превышать 64 символа!').matches(/^[a-zA-Z0-9!@#$%&{}()?]+$/, 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!').oneOf([Yup.ref('password'), null], 'Пароли не совпадают!'),
        }),
        //Отправка
        onSubmit: values => {
            const submit = async () => {
                const response = await UserService.userRegistration(dispatch, values);
                if (response.status) {
                    return navigate('/profile')
                } else {
                    for (const [name, value] of Object.entries(response.errors)) {
                        switch (name.toString()) {
                            case 'login':
                                formik.setFieldError('login', value.toString())
                                break;
                            case 'first_name':
                                formik.setFieldError('first_name', value.toString())
                                break;
                            case 'second_name':
                                formik.setFieldError('second_name', value.toString())
                                break;
                            case 'password':
                                formik.setFieldError('password', value.toString())
                                break;
                            case 'confirm_password':
                                formik.setFieldError('confirm_password', value.toString())
                                break;
                            default:
                                setError({global: value})
                        }
                    }

                }
            }
            submit();
        }
    });
    return (
        <Form className='col-3 mx-auto my-5' onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type='text'
                    name='login'
                    onChange={formik.handleChange}
                    value={formik.values.login}
                    //onBlur={formik.handleBlur}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>

                </Form.Control>
                {formik.touched.login && formik.errors.login &&
                    <ErrorField message={formik.errors.login}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type='text'
                    name='first_name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>
                </Form.Control>
                {formik.touched.first_name && formik.errors.first_name &&
                    <ErrorField message={formik.errors.first_name}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                    type='text'
                    name='second_name'
                    onChange={formik.handleChange}
                    value={formik.values.second_name}
                    onBlur={formik.handleBlur}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>
                </Form.Control>
                {formik.touched.second_name && formik.errors.second_name &&
                    <ErrorField message={formik.errors.second_name}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>
                </Form.Control>
                {formik.touched.password && formik.errors.password &&
                    <ErrorField message={formik.errors.password}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control
                    type='password'
                    name='confirm_password'
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                    onBlur={formik.handleBlur}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>
                </Form.Control>
                {formik.touched.confirm_password && formik.errors.confirm_password &&
                    <ErrorField message={formik.errors.confirm_password}/>
                }
            </Form.Group>
            <Form.Group className='d-flex justify-content-center p-3'>
                <Button variant='primary' type='submit'>Зарегистрироваться</Button>
            </Form.Group>
            {error.global &&
                <ErrorField message={error.global}/>
            }
        </Form>
    );
};

export default Registering;
