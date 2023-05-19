import React, {useEffect, useState} from 'react';
import {Col, Row, Container} from "react-bootstrap";
import MenuItem from "./MenuItem.jsx";

const MenuList = ({elements, getSelected}) => {
    //Массив доступных объектов
    const [available, setAvailable] = useState([...elements]);
    //Массив выбранных объектов
    const [selected, setSelected] = useState([]);
    //Экземпляр сортировщика
    const collator = new Intl.Collator('ru-RU');

    //Функция для перемещения объекта в массив выбранных
    const toSelected = (id) => {
        const item = (available.filter(element => element.id === id))[0];
        setAvailable(available.filter(element => element.id !== id));
        setSelected([...selected, item].sort((a, b) => collator.compare(a.second_name, b.second_name)));
    }
    //Функция для перемещения объекта в массив доступных
    const toAvailable = (id) => {
        const item = (selected.filter(element => element.id === id))[0];
        setSelected(selected.filter(element => element.id !== id));
        setAvailable([...available, item].sort((a, b) => collator.compare(a.second_name, b.second_name)));
    }
    //Сортировка элементов при рендере компонента
    useEffect(() => {
        setAvailable([...available].sort((a, b) => collator.compare(a.second_name, b.second_name)));
    }, []);
    //Изменения списка выбранных элемента у родителя
    useEffect(() => {
        const ids = [];
        selected.map(element => ids.push(element.id));
        getSelected(ids);
    }, [selected]);
    return (
        <Container className='menu-list-wrapper'>
            <Row className='menu-list-wrapper-category'>
                <Col className='text-center'>
                    <h5>Доступные</h5>
                </Col>
                <Col className='text-center'>
                    <h5>Выбранные</h5>
                </Col>
            </Row>
            <Row>
                <Col className='menu-list-wrapper-items menu-list-wrapper-items-available'>
                    {available.map(element => <MenuItem key={element.id} item={element} selected={false}
                                                        action={toSelected}/>)}
                </Col>
                <Col className='menu-list-wrapper-items'>
                    {selected.map(element => <MenuItem key={element.id} item={element} selected={true}
                                                       action={toAvailable}/>)}
                </Col>
            </Row>
        </Container>
    );
};

export default MenuList;
