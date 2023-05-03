import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthorService from "../../../API/AuthorService.js";
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {faTrashCan, faPen, faFileLines} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalAuthorDelete from "../../../ui/ModalAuthorDelete.jsx";

const AuthorItem = ({author, destroyAuthor}) => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Для возможности отправки на страницу редактирования
    const navigate = useNavigate();
    //Показать модальное окно
    const [show, setShow] = useState(false);
    //Калбек для закрытия модального окна
    const handleClose = () => setShow(false);
    //Функция для вызова модального окна
    const handleOpen = () => setShow(true);
    //Функция для удаления автора из бд
    const destroy = async () => {
        const response = await AuthorService.deleteAuthor(user, author.id);
        if (response.status) {
            destroyAuthor(author.id);
            handleClose();
        }
    }
    //Перейти на страницу автора
    const read = () => {
        navigate(`/librarian/authors/${author.id}`);
    }
    //Перейти на страницу редактирования
    const edit = () => {
        navigate(`/librarian/authors/${author.id}/edit`);
    }
    return (
        <Card className='mb-2'>
            <ModalAuthorDelete
                show={show}
                handleClose={handleClose}
                handeDelete={destroy}
            />
            <Row>
                <Col sm={2} className='author-page-icon d-flex justify-content-center'>
                    <Card.Img className='author-icon-image' src={'http://' + author.imageURL}/>
                </Col>
                <Col className='row justify-content-between pl-0'>
                    <div>
                        <Card.Title>
                            {author.second_name && author.second_name + ' '}
                            {author.first_name && author.first_name + ' '}
                            {author.middle_name && author.middle_name + ' '}
                        </Card.Title>
                        <Card.Footer className='bg-light m-0 p-0'>
                            <div>Страна рождения: {author.country_name}</div>
                            <div>   {author.date_birthday && ('Дата рождения: ' + author.date_birthday)}</div>
                            <div> {author.date_death && 'Дата смерти: ' + author.date_death}</div>
                            <div>Количество книг: {author.count_book}</div>
                        </Card.Footer>
                    </div>
                    <div className='d-flex'>
                        <ButtonGroup className='w-100 align-self-end'>
                            <Button onClick={read}><FontAwesomeIcon icon={faFileLines}/></Button>
                            <Button onClick={edit}> <FontAwesomeIcon icon={faPen}/></Button>
                            <Button variant='danger' onClick={handleOpen}><FontAwesomeIcon icon={faTrashCan}/></Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default AuthorItem;
