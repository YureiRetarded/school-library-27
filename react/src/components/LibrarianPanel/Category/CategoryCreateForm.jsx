import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import CategoryService from "../../../API/CategoryService.js";
import {Button, Form} from "react-bootstrap";
import ErrorField from "../../../ui/ErrorField.jsx";

const CategoryCreateForm = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Для переадресации на страницу пользователя в случае успеха
    const navigate = useNavigate();
    //Валидация и отправка полей
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
                const response = await CategoryService.storeCategory(user, values);
                if (response.status) {
                    return navigate('/librarian/categories');
                } else {
                    formik.setFieldError('name', response.error);
                }
            }
            submit();
        }
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
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
                    }}>
                </Form.Control>
                {formik.touched.name && formik.errors.name &&
                    <ErrorField message={formik.errors.name}/>
                }
            </Form.Group>
            <Button variant='primary' type='submit'>
                Добавить
            </Button>
        </Form>
    );
};

export default CategoryCreateForm;
