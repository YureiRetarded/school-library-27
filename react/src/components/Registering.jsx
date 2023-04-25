import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import ErrorField from "../ui/ErrorField.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserService from "../API/UserService.js";

const Registering = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    //Состояние полей формы
    const [form, setForm] = useState({
        login: '',
        first_name: '',
        second_name: '',
        password: '',
        confirm_password: ''
    });
    //Состояние ошибок
    const [errors, setError] = useState({
        login: '',
        first_name: '',
        second_name: '',
        password: '',
        confirm_password: '',
    });
    //Регулярные выражения для проверки полей
    const isValidLoginRegex = /^[a-zA-Z0-9]+$/u;
    const isValidNameRegex = /^[А-Яа-яЁё]+$/u;
    const isValidPasswordRegex = /^[a-zA-Z0-9!@#$%&{}()?]+$/;

    //Проверка логина
    const checkValidLogin = (e) => {
        setForm({...form, login: e.target.value})
        setError({...errors, login: ''})
        if (e.target.value.length > 0) {
            if (!isValidLoginRegex.test(e.target.value)) {
                setError({...errors, login: 'Используйте только цифры и латинские буквы!'})
            }
        }

        if (e.target.value.length > 32) {
            setError({...errors, login: 'Длина логина не может превышать 32 символа!'})
        }
    }
    //Проверка имени
    const checkValidFirstName = (e) => {
        setForm({...form, first_name: e.target.value})
        setError({...errors, first_name: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setError({...errors, first_name: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setError({...errors, first_name: 'Длина имени не может превышать 16 символов!'})
        }
    }
    //Проверка фамилии
    const checkValidSecondName = (e) => {
        setForm({...form, second_name: e.target.value})
        setError({...errors, second_name: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setError({...errors, second_name: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setError({...errors, second_name: 'Длина фамилии не может превышать 16 символов!'})
        }
    }
    //Проверка пароля
    const checkValidPassword = (e) => {
        setForm({...form, password: e.target.value})
        setError({...errors, password: ''})
        if (e.target.value.length > 0) {
            if (!isValidPasswordRegex.test(e.target.value)) {
                setError({
                    ...errors,
                    password: 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!'
                })
            }
        }
        if (e.target.value.length > 64) {
            setError({...errors, password: 'Длина пароля не может превышать 64 символа!'})
        }
    }
    //Проверка подтверждения пароля
    const checkConfirmPassword = (e) => {
        setError({...errors, confirm_password: ''})
        setForm({...form, confirm_password: e.target.value})
        if (e.target.value.length > 0 && form.password !== e.target.value) {
            setError({...errors, confirm_password: 'Пароли не совпадают!'})
        }
    }
    //Отправка формы и её проверка
    const register = async () => {
        //Временный костыль
        const error = {login: '', first_name: '', second_name: '', password: '', confirm_password: ''};
        if (form.login === '') {
            error.login = 'Поле не может быть пустым!'
        } else if (form.login.length < 6) {
            error.login = 'Длина логина должна начинаться от 6 символов!'
        }
        if (form.first_name === '') {
            error.first_name = 'Поле не может быть пустым!'
        } else if (form.first_name.length < 2) {
            error.first_name = 'Длина имени должна начинаться от 2 символов!'
        }
        if (form.second_name === '') {
            error.second_name = 'Поле не может быть пустым!'
        } else if (form.second_name.length < 2) {
            error.second_name = 'Длина фамилии должна начинаться от 2 символов!'
        }
        if (form.password === '') {
            error.password = 'Поле не может быть пустым!'
        } else if (form.password.length < 6) {
            error.password = 'Длина пароля должна начинаться от 6 символов!'
        }
        if (form.confirm_password === '') {
            error.confirm_password = 'Поле не может быть пустым!'
        }
        if (form.confirm_password !== form.password) {
            error.confirm_password = 'Пароли должны совпадать!'
        }
        let er = false;
        for (const [name, value] of Object.entries(errors)) {
            if (value !== '')
                er = true
        }
        for (const [name, value] of Object.entries(error)) {
            if (value !== '')
                er = true
        }

        if (er) {
            setError({...{}, ...error})
        } else {
            const register = await UserService.userRegistration(dispatch, form);
            if (register.status) {
                return navigate('/profile')
            } else {
                for (const [name, value] of Object.entries(register.errors)) {
                    switch (name.toString()) {
                        case 'login':
                            setError({...errors, login: value[0]});
                            break;
                        case 'first_name':
                            setError({...errors, first_name: value[0]});
                            break;
                        case 'second_name':
                            setError({...errors, second_name: value[0]});
                            break;
                        case 'password':
                            setError({...errors, password: value[0]});
                            break;
                        case 'confirm_password':
                            setError({...errors, confirm_password: value[0]});
                            break;
                    }
                }

            }
        }
    }
    return (
        <Form className='col-3 mx-auto my-5'>
            <Form.Group>
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    onChange={checkValidLogin}
                    type='text'
                    value={form.login}
                >

                </Form.Control>
                {errors.login !== '' &&
                    <ErrorField message={errors.login}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    onChange={checkValidFirstName}
                    type='text'
                    value={form.first_name}
                >
                </Form.Control>
                {errors.first_name !== '' &&
                    <ErrorField message={errors.first_name}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                    onChange={checkValidSecondName}
                    type='text'
                    value={form.second_name}
                >
                </Form.Control>
                {errors.second_name !== '' &&
                    <ErrorField message={errors.second_name}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    onChange={checkValidPassword}
                    type='password'
                    value={form.password}
                >
                </Form.Control>
                {errors.password !== '' &&
                    <ErrorField message={errors.password}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control
                    onChange={checkConfirmPassword}
                    type='password'
                    value={form.confirm_password}
                >
                </Form.Control>
                {errors.confirm_password !== '' &&
                    <ErrorField message={errors.confirm_password}/>
                }
            </Form.Group>
            <Form.Group className='d-flex justify-content-center p-3'>
                <Button onClick={register}>Зарегистрироваться</Button>
            </Form.Group>
        </Form>
    );
};

export default Registering;
