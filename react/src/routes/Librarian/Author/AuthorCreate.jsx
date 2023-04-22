import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Spinner} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";
import {useSelector} from "react-redux";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru)


const AuthorCreate = () => {
    const [image, setImage] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onImageChange = (e) => {
        if (e.target.files.length > 5) {
            setErrors({...errors, images: 'Можно загрузить только одну фотографию'})
        } else {
            setErrors({...errors, images: ''})
            const files = [...e.target.files]
            setImage(files.filter(file => file.size < 2097152 && (file.type === 'image/png' || file.type === 'image/jpeg')))

        }
    }
    const [form, setForm] = useState({
        first_name: '',
        second_name: '',
        middle_name: '',
        bio: '',
        country_id: 0,
        photo: '',
    })
    const [errors, setErrors] = useState({
        first_name: '',
        second_name: '',
        middle_name: '',
        bio: '',
        images: '',
    });
    const [birthday, setBirthday] = useState(new Date(1000, 0, 1));
    const [death, setDeath] = useState(new Date(1000, 0, 1));
    const [haveDateBirthday, setHaveDateBirthday] = useState(false)
    const [haveDateDeath, setHaveDateDeath] = useState(false)
    const isValidNameRegex = /^[А-Яа-яЁё ]+$/u;
    const user = useSelector(state => state.user);
    useEffect(() => {
        if (image.length < 1) return;
        const newImageUrl = [];
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImagesURL(newImageUrl)
    }, [image])
    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        }
        axios.get('http://127.0.0.1:8000/api/country/', config).then(response => {
            setCountries([...response.data.data])
            setIsLoading(false)
        })
    }, [])
    const checkValidFirstName = (e) => {
        setForm({...form, first_name: e.target.value})
        setErrors({...errors, first_name: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setErrors({...errors, first_name: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setErrors({...errors, first_name: 'Длина имени не может превышать 16 символов!'})
        }
    }
    const checkValidSecondName = (e) => {
        setForm({...form, second_name: e.target.value})
        setErrors({...errors, second_name: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setErrors({...errors, second_name: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setErrors({...errors, second_name: 'Длина фамилии не может превышать 16 символов!'})
        }
    }
    const checkValidMiddleName = (e) => {
        setForm({...form, middle_name: e.target.value})
        setErrors({...errors, middle_name: ''})
        if (e.target.value.length > 0) {
            if (!isValidNameRegex.test(e.target.value)) {
                setErrors({...errors, middle_name: 'Используйте только русские буквы!'})
            }
        }
        if (e.target.value.length > 16) {
            setErrors({...errors, middle_name: 'Длина отчества не может превышать 16 символов!'})
        }
    }
    const createAuthor = () => {
        if(haveDateBirthday&&haveDateDeath){
            setForm({...form,date_birthday:birthday,date_death:death})
        }
        else if(haveDateBirthday&&!haveDateDeath){
            setForm({...form,date_birthday:birthday})
        }
        else if(!haveDateBirthday&&haveDateDeath){
            setForm({...form,date_death:death})
        }

        if (image[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(image[0])
            reader.onload = () => {
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + user.token
                    }
                }
                axios.post('http://127.0.0.1:8000/api/author/', {
                    ...form,
                    image: reader.result
                }, config).then(response => {
                    console.log(response)
                })
            }

        } else {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            }
            axios.post('http://127.0.0.1:8000/api/author/', {...form}, config).then(response => {
                console.log(response)
            })
        }


    }
    return (
        <Form>
            <Form.Group className='mb-3'>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите фамилию'
                    value={form.second_name}
                    onChange={checkValidSecondName}
                ></Form.Control>
                {errors.second_name !== '' &&
                    <ErrorField message={errors.second_name}/>
                }
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите имя'
                    value={form.first_name}
                    onChange={checkValidFirstName}
                ></Form.Control>
                {errors.first_name !== '' &&
                    <ErrorField message={errors.first_name}/>
                }
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Введите имя отчество'
                    value={form.middle_name}
                    onChange={checkValidMiddleName}
                ></Form.Control>
                {errors.middle_name !== '' &&
                    <ErrorField message={errors.middle_name}/>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Страна рождения</Form.Label>
                {isLoading ? <Spinner animation='border'/> :
                    <Form.Select onChange={e => setForm({...form,country_id: e.target.value})}>
                        {countries.map(country =>
                            <option key={country.id} value={country.id}>{country.name}</option>
                        )}
                    </Form.Select>
                }
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="switch"
                    label="Наличие даты рождения"
                    onChange={e => setHaveDateBirthday(e.target.checked)}
                />
            </Form.Group>
            {haveDateBirthday &&
                <Form.Group className='mb-3'>
                    <Form.Label>Дата рождения</Form.Label>
                    <DatePicker dateFormat="dd/MM/yyyy" locale="ru" selected={birthday}
                                onChange={(date) => setBirthday(date)}/>
                </Form.Group>
            }
            <Form.Group>
                <Form.Check
                    type="switch"
                    label="Наличие даты смерти"
                    onChange={e => setHaveDateDeath(e.target.checked)}
                />
            </Form.Group>
            {haveDateDeath &&
                <Form.Group className='mb-3'>
                    <Form.Label>Дата смерти</Form.Label>
                    <DatePicker dateFormat="dd/MM/yyyy" locale="ru" selected={death}
                                onChange={(date) => setDeath(date)}/>
                </Form.Group>
            }
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Биография</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={e => setForm({...form, bio: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Фотография автора</Form.Label>
                <Form.Control type="file" accept="image/png,image/jpeg" onChange={onImageChange}/>
                {errors.images !== '' &&
                    <ErrorField message={errors.images}/>
                }
                <Image src={imagesURL[0]} rounded fluid/>
            </Form.Group>
            <Button onClick={createAuthor}>Сохранить</Button>

        </Form>
    );
};

export default AuthorCreate;
