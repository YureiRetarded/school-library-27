import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Col, Placeholder, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileLines, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import BookService from "../../../API/BookService.js";
import ModalBookDelete from "../../../ui/ModalBookDelete.jsx";
import AuthorsBookList from "../../AuthorsBookList.jsx";

const BookItem = ({book, destroyBook}) => {
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
        const response = await BookService.deleteBook(user, book.id);
        if (response.status) {
            destroyBook(book.id);
            handleClose();
        }
    };
    //Перейти на страницу книги
    const read = () => {
        navigate(`/librarian/books/${book.id}`);
    };
    //Перейти на страницу редактирования
    const edit = () => {
        navigate(`/librarian/books/${book.id}/edit`);
    };
    return (
        <Card className='mb-2'>
            <ModalBookDelete
                show={show}
                handleClose={handleClose}
                handeDelete={destroy}
            />
            <Row>
                <Col sm={2} className='author-page-icon d-flex justify-content-center'>
                    <Card.Img className='author-icon-image' src={'http://' + book.imageURL}/>
                </Col>
                <Col className='row justify-content-between pl-0'>
                    <div>
                        <Card.Title>
                            {book.name}
                        </Card.Title>
                        <Card.Footer className='bg-light m-0 p-0'>
                            <div>Категория: {book.category_name}</div>
                            <div>   {book.date_created && ('Дата написания: ' + book.date_created)}</div>
                            <div>{book.authors.length > 1 ? 'Авторы:' : 'Автор:'}</div>
                            <AuthorsBookList authors={book.authors}/>
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

export default BookItem;
