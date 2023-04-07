import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Error from "../ui/error.jsx";
import axios from 'axios';
import {value} from "lodash/seq.js";

const Register = () => {
    const [form, setForm] = useState({login: '', firstName: '', secondName: '', password: '', confirmPassword: ''});
    const [errors, setError] = useState({
        login: '',
        firstName: '',
        secondName: '',
        password: '',
        confirmPassword: '',
    });
    const isValidLoginRegex = /^[a-zA-Z0-9]+$/;
    const isValidNameRegex = /^[а-яА-Я]+$/;
    const isValidPasswordRegex = /^[a-zA-Z0-9!@#$%&{}()?]+$/;
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
    const checkValidFirstName = (e) => {
        setForm({...form, firstName: e.target.value})
        setError({...errors, firstName: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setError({...errors, firstName: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setError({...errors, firstName: 'Длина имени не может превышать 16 символов!'})
        }
    }
    const checkValidSecondName = (e) => {
        setForm({...form, secondName: e.target.value})
        setError({...errors, secondName: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setError({...errors, secondName: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setError({...errors, secondName: 'Длина фамилии не может превышать 16 символов!'})
        }
    }
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
    const checkConfirmPassword = (e) => {
        setError({...errors, confirmPassword: ''})
        setForm({...form, confirmPassword: e.target.value})
        if (e.target.value.length > 0 && form.password !== e.target.value) {
            setError({...errors, confirmPassword: 'Пароли не совпадают!'})
        }
    }
    const register = () => {
        //Временный костыль
        const error = {login: '', firstName: '', secondName: '', password: '', confirmPassword: ''};
        if (form.login === '') {
            error.login = 'Поле не может быть пустым'
        }
        else if (form.login.length<6){
            error.login = 'Длина логина должна начинаться от 6 символов!'
        }
        if (form.firstName === '') {
            error.firstName = 'Поле не может быть пустым'
        }
        else if (form.firstName.length<2){
            error.firstName = 'Длина имени должна начинаться от 6 символов!'
        }
        if (form.secondName === '') {
            error.secondName = 'Поле не может быть пустым'
        }
        else if (form.secondName.length<2){
            error.secondName = 'Длина фамилии должна начинаться от 6 символов!'
        }
        if (form.password === '') {
            error.password = 'Поле не может быть пустым'
        }
        else if (form.password.length<6){
            error.password = 'Длина пароля должна начинаться от 6 символов!'
        }
        if (form.confirmPassword === '') {
            error.confirmPassword = 'Поле не может быть пустым'
        }
        if (form.confirmPassword !== form.password ) {
            error.confirmPassword = 'Пароли должны совпадать'
        }
        let er=false;
        for(const[name,value] of Object.entries(errors)){
            if(value!=='')
                er=true
        }
        for(const[name,value] of Object.entries(error)){
            if(value!=='')
                er=true
        }
        if (er){
            setError({...{},...error})
        }
        else {
            axios.post('http://127.0.0.1:8000/api/test',form).then((response)=>{
                console.log(response)
            })
        }

    }
    return (
        <div className='wrapper'>
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
                        <Error message={errors.login}/>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        onChange={checkValidFirstName}
                        type='text'
                        value={form.firstName}
                    >
                    </Form.Control>
                    {errors.firstName !== '' &&
                        <Error message={errors.firstName}/>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        onChange={checkValidSecondName}
                        type='text'
                        value={form.secondName}
                    >
                    </Form.Control>
                    {errors.secondName !== '' &&
                        <Error message={errors.secondName}/>
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
                        <Error message={errors.password}/>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control
                        onChange={checkConfirmPassword}
                        type='password'
                        value={form.confirmPassword}
                    >
                    </Form.Control>
                    {errors.confirmPassword !== '' &&
                        <Error message={errors.confirmPassword}/>
                    }
                </Form.Group>
                <Form.Group className='d-flex justify-content-center p-3'>
                    {/*{errors.global !== '' &&*/}
                    {/*    <Error message={errors.global}/>*/}
                    {/*}*/}
                    <Button onClick={register}>Зарегистрироваться</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Register;
