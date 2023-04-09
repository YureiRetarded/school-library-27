import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setAccessLevel, setId, setToken} from "../store/userSlice.js";
import Error from "../ui/error.jsx";


const Login = () => {
    const user = useSelector(state => state.user);
    const [errors, setError] = useState({login: '', password: '', global: ''})
    const dispatch = useDispatch()
    const [form, setForm] = useState({login: '', password: ''})
    const checkValidLogin = (e) => {
        setForm({...form, login: e.target.value})
        setError({...errors, login: ''})
        if (e.target.value.length > 0 && e.target.value.length < 6) {
            setError({...errors, login: 'Длина логина должна начинаться от 6 символов!'})
        } else if (e.target.value.length > 32) {
            setError({...errors, login: 'Длина логина не может превышать 32 символа!'})
        }
    }
    const checkValidPassword = (e) => {
        setForm({...form, password: e.target.value})
        setError({...errors, password: ''})
        if (e.target.value.length > 0 && e.target.value.length < 6) {
            setError({...errors, password: 'Длина пароля должна начинаться от 6 символов!'})
        } else if (e.target.value.length > 64) {
            setError({...errors, password: 'Длина пароля не может превышать 64 символа!'})
        }
    }
    const login = () => {
        setError({login: '', password: '', global: ''})
        if (form.login.length === 0 && form.password.length === 0) {
            setError({...errors, login: 'Поле не может быть пустым!', password: 'Поле не может быть пустым!'})
        } else if (form.login.length === 0 && form.password.length !== 0) {
            setError({...errors, login: 'Поле не может быть пустым!'})
        } else if (form.login.length !== 0 && form.password.length === 0) {
            setError({...errors, password: 'Поле не может быть пустым!'})
        } else {
            axios.post('http://127.0.0.1:8000/api/login', form).then(response => {
                if (response.data.success) {
                    dispatch(setId(response.data.data.id));
                    dispatch(setAccessLevel(response.data.data.access_level));
                    dispatch(setToken(response.data.data.token));
                } else {
                    for (const [name, value] of Object.entries(response.data.data)) {
                        switch (name.toString()) {
                            case 'login':
                                setError({...errors, login: value})
                                break;
                            case 'password':
                                setError({...errors, password: value})
                                break;
                            default:
                                setError({...errors, global: value})

                        }
                    }
                }
            });
        }
    }

    return (
        <div className='wrapper'>
            <Form className='col-3 mx-auto my-5'>
                <Form.Group>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type='text' onChange={checkValidLogin}>
                    </Form.Control>
                    {errors.login !== '' &&
                        <Error message={errors.login}/>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' onChange={checkValidPassword}>
                    </Form.Control>
                    {errors.password !== '' &&
                        <Error message={errors.password}/>
                    }
                </Form.Group>
                <Form.Group className='d-flex justify-content-center p-3'>
                    <Button onClick={login}>Войти</Button>
                </Form.Group>
                {errors.global !== '' &&
                    <Error message={errors.global}/>
                }
            </Form>
        </div>
    );
};

export default Login;
