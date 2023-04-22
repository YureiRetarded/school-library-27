import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Form, Spinner} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";

const CountryEditForm = () => {
    const [form, setForm] = useState({id: 0, name: ''})
    const [error, setError] = useState('');
    const isValidNameRegex = /^[А-Яа-яЁё ]+$/u;
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const {countryId} = useParams();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        }
        setIsLoading(true)
        axios.get(`http://127.0.0.1:8000/api/country/${countryId}`, config).then(response => {
            setIsLoading(false)
            if (response.data.success) {
                setForm({id: response.data.data.id, name: response.data.data.name})
            } else {
                navigate('/librarian/countries/')
            }
        })
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

    const UpdateCountry = () => {
        if (form.name.trim() === '') {
            setError('Поле не может быть пустым!')
        } else if (error.length === 0) {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            }
            axios.post(`http://127.0.0.1:8000/api/country/${countryId}/update`, {
                _method: 'PATCH',
                name: form.name
            }, config).then(response => {
                if (response.data.success) {
                    navigate(-1)
                } else {
                    setError(response.data.data.name.toString())
                }
            })
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
