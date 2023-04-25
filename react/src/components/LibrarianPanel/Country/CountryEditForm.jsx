import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Spinner} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";
import CountryService from "../../../API/CountryService.js";

const CountryEditForm = () => {
    const [form, setForm] = useState({id: 0, name: ''})
    const [error, setError] = useState('');
    const isValidNameRegex = /^[А-Яа-яЁё ]+$/u;
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const {countryId} = useParams();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCountry = async () => {
            const response = await CountryService.getCountry(user, countryId);
            if (response.status) {
                setForm({id: response.data.id, name: response.data.name})
            } else {
                navigate('/librarian/countries/')
            }

            setIsLoading(false)
        }
        fetchCountry();
    }, [])


    const checkValidName = (e) => {
        setForm({...form, name: e.target.value})
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

    const UpdateCountry = async () => {
        if (form.name.trim() === '') {
            setError('Поле не может быть пустым!')
        } else if (error.length === 0) {
            const response = await CountryService.updateCountry(user, countryId, form.name);
            if (response.status) {
                navigate(-1)
            } else {
                setError(response.error)
            }
        }
    }
    return (
        <Form>
            {isLoading ? <Spinner animation='border'/> :
                <div>
                    <Form.Group className='mb-3'>
                        <Form.Label>Наименование страны</Form.Label>
                        <Form.Control type='text' placeholder='Введите имя страны' onChange={checkValidName}
                                      value={form.name}></Form.Control>
                        {error !== '' &&
                            <ErrorField message={error}/>
                        }
                    </Form.Group>
                    <Button variant='primary' onClick={UpdateCountry}>
                        Изменить
                    </Button>
                </div>}
        </Form>
    );
};

export default CountryEditForm;
