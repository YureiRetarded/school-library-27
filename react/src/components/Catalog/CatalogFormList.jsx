import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {Accordion, Button, Form} from "react-bootstrap";
import CatalogFormListAuthorName from "./CatalogFormListAuthorName.jsx";


const CatalogFormList = ({authors, categories, changing}) => {
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            authors: [],
            category: null
        },
        //Валидация
        validationSchema: Yup.object({}),
        //Отправка
        onSubmit: values => {
            changing(values)
        }
    });
    const clear = () => {
        formik.setFieldValue('authors', []);
        formik.setFieldValue('category', null);
        changing(null);
    };
    const checkHave = (number) => {
        for (let i = 0; i < formik.values.authors.length; i++) {
            if (parseInt(formik.values.authors[i]) === number) {
                return true;
            }
        }
        return false;
    };
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Accordion id="radio-group">
                <Accordion.Header>Категории</Accordion.Header>
                <Accordion.Body role="group-categories" aria-labelledby="radio-group"
                                className='accordion-body-overflow'>
                    {categories.map(category => <Form.Check>
                        <Form.Check
                            name="category"
                            type="radio"
                            checked={category.id === parseInt(formik.values.category)}
                            onChange={formik.handleChange}
                            value={category.id}
                            label={category.name}
                        />
                    </Form.Check>)}
                </Accordion.Body>
            </Accordion>
            <Accordion id="checkbox-group">
                <Accordion.Header>Авторы</Accordion.Header>
                <Accordion.Body role="group-authors" aria-labelledby="checkbox-group"
                                className='accordion-body-overflow'>
                    {authors.map(author => <Form.Check>
                        <Form.Check
                            name="authors"
                            type="checkbox"
                            onChange={formik.handleChange}
                            checked={checkHave(author.id)}
                            value={author.id}
                            label={<CatalogFormListAuthorName author={author}/>}
                        />
                    </Form.Check>)}
                </Accordion.Body>
            </Accordion>
            <div className='d-flex justify-content-center mt-2'><Button type='submit'>Выбрать</Button></div>
            <div className='d-flex justify-content-center mt-2'><Button variant="danger"
                                                                        onClick={clear}>Очистить</Button></div>


        </Form>
    );
};

export default CatalogFormList;
