import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CountryService from "../../../API/CountryService.js";


const CountryCreateForm = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('');
    const isValidNameRegex = /^[А-Яа-яЁё ]+$/u;
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const checkValidName = (e) => {
        setName(e.target.value)
        setError('');
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setError('Используйте только русские буквы!')
            }
        }
        if (e.target.value.length > 0 && e.target.value.length < 2) {
            setError('Длина наименования страны должна начинаться от 2 символов!')
        } else if (e.target.value.length > 64) {
            setError('Длина наименования страны не может превышать 64 символа!')
        }
    }
    const createCountry = async () => {
        if (name.trim() === '') {
            setError('Поле не может быть пустым!')
        } else if (error.length === 0) {
            const response = await CountryService.storeCountry(user, {name: name})
            if (response.status) {
                return navigate('/librarian/countries')
            } else {
                setError(response.error)
            }
        }
    }
    return (
        <Form>
            <Form.Group className='mb-3'>
                <Form.Label>Наименование страны</Form.Label>
                <Form.Control type='text' placeholder='Введите имя страны' onChange={checkValidName}
                              value={name}></Form.Control>
                {error !== '' &&
                    <ErrorField message={error}/>
                }
            </Form.Group>
            <Button variant='primary' onClick={createCountry}>
                Добавить
            </Button>
        </Form>
    );
};

export default CountryCreateForm;
