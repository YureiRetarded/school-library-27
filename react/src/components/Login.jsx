import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserService from "../API/UserService.js";
import {Button, Form} from "react-bootstrap";
import ErrorField from "../ui/ErrorField.jsx";
import {useFormik} from "formik";
import * as Yup from 'yup';

const Login = () => {
    //Dispatch для сервиса API
    const dispatch = useDispatch();
    //Для переадресации на страницу пользователя в случае успеха
    const navigate = useNavigate();
    //Состояния общей ошибки
    const [error, setError] = useState({global: ''});
    //Валидация и отправка полей
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            login: '',
            password: '',
        },
        //Валидация
        validationSchema: Yup.object({
            login: Yup.string()
                .required('Поле не может быть пустым!').min(6, 'Длина логина должна начинаться от 6 символов!').max(16, 'Длина логина не может превышать 32 символа!').matches(/^[a-zA-Z0-9]+$/u, 'Используйте только цифры и латинские буквы!'),
            password: Yup.string()
                .required('Поле не может быть пустым!').min(6, 'Длина пароля должна начинаться от 6 символов!').max(64, 'Длина пароля не может превышать 64 символа!').matches(/^[a-zA-Z0-9!@#$%&{}()?]+$/, 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!'),
        }),
        //Отправка
        onSubmit: values => {
            const submit = async () => {
                const response = await UserService.userAuthorization(dispatch, values);
                if (response.status) {
                    return navigate('/profile');
                } else {
                    for (const [name, value] of Object.entries(response.errors)) {
                        switch (name.toString()) {
                            case 'login':
                                formik.setFieldError('login', value.toString());
                                break;
                            case 'password':
                                formik.setFieldError('password', value.toString());
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
    return (
        <Form className='col-3 mx-auto my-5' onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type='text'
                    name='login'
                    onChange={formik.handleChange}
                    value={formik.values.login}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.login && formik.errors.login}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>
                </Form.Control>
                {formik.touched.login && formik.errors.login &&
                    <ErrorField message={formik.errors.login}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault()
                    }}>
                </Form.Control>
                {formik.touched.password && formik.errors.password &&
                    <ErrorField message={formik.errors.password}/>
                }
            </Form.Group>
            <Form.Group className='d-flex justify-content-center p-3'>
                <Button variant='primary' type='submit'>Войти</Button>
            </Form.Group>
            {error.global &&
                <ErrorField message={error.global}/>
            }
        </Form>
    );
};

export default Login;
