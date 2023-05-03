import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import CategoryService from "../../../API/CategoryService.js";
import {Button, Form, Spinner} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";

const CategoryEditForm = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Для переадресации на страницу в случае успеха
    const navigate = useNavigate();
    //ID категории в адресной строке
    const {categoryId} = useParams();
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
                .required('Поле не может быть пустым!').min(2, 'Длина наименования категории должна начинаться от 2 символов!').max(64, 'Длина наименования категории не может превышать 64 символа!').matches(/^[А-Яа-яЁё ]+$/u, 'Используйте только русские буквы!'),
        }),
        //Отправка
        onSubmit: values => {
            const submit = async () => {
                const response = await CategoryService.updateCategory(user, categoryId, values);
                if (response.status) {
                    return navigate('/librarian/categories');
                } else {
                    formik.setFieldError('name', response.error);
                }
            }
            submit();
        }
    });
    //Загрузка данных текущей категории
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await CategoryService.getCategory(user, categoryId);
            if (response.status) {
                formik.setFieldValue('name', response.data.name.toString());
            } else {
                navigate('/librarian/categories/');
            }
            setIsLoading(false);
        }
        fetchCategory();
    }, []);
    return (
        <Form onSubmit={formik.handleSubmit}>
            {isLoading ? <Spinner animation='border'/> :
                <div>
                    <Form.Group className='mb-3'>
                        <Form.Label>Наименование категории</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && formik.errors.name}
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

export default CategoryEditForm;
