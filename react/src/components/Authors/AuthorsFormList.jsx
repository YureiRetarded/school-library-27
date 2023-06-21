import React from 'react';
import {useFormik} from "formik";
import {Accordion, Button, Form} from "react-bootstrap";

const AuthorsFormList = ({countries, changing}) => {
    const formik = useFormik({
        //Значение полей по умолчанию
        initialValues: {
            country: null
        },

        //Отправка
        onSubmit: values => {
            changing(values)
        }
    });
    const clear = () => {
        formik.setFieldValue('country', null);
        changing(null);
    };
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Accordion defaultActiveKey={['0']} alwaysOpen id="radio-group">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Страны</Accordion.Header>
                    <Accordion.Body role="group-countries" aria-labelledby="radio-group"
                                    className='accordion-body-overflow'>
                        {countries.map(country =>
                            <Form.Check
                                name="country"
                                type="radio"
                                checked={country.id === parseInt(formik.values.country)}
                                onChange={formik.handleChange}
                                value={country.id}
                                label={country.name}
                                key={country.id}
                            />)}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='d-flex justify-content-center mt-2'><Button type='submit'>Выбрать</Button></div>
            <div className='d-flex justify-content-center mt-2'>
                <Button variant="danger" onClick={clear}>Очистить</Button>
            </div>
        </Form>
    );
};

export default AuthorsFormList;
