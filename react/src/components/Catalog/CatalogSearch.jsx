import React from 'react';
import {useFormik} from "formik";
import {Button, Form} from "react-bootstrap";

const CatalogSearch = ({changing}) => {
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            name: '',
        },
        //Отправка
        onSubmit: values => {
            changing(values)
        }
    });
    const clear = () => {
        formik.setFieldValue('name', '');
        changing(null);
    };
    return (
        <Form onSubmit={formik.handleSubmit} className='d-flex search-block'>
            <Form.Group className='flex-grow-1 search-field'>
                <Form.Control
                    type='text'
                    name='name'
                    placeholder='Наименование книги'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onKeyDown={e => {
                        e.key === 'Enter' && e.preventDefault();
                    }}>
                </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
                Поиск
            </Button>
            {formik.values.name && <Button onClick={clear} variant='danger' className='ms-1'>X</Button>}
        </Form>
    );
};

export default CatalogSearch;
