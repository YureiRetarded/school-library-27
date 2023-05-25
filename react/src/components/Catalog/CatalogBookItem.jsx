import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import AuthorsBookList from "../AuthorsBookList.jsx";
import {useNavigate} from "react-router-dom";

const CatalogBookItem = ({book}) => {
    //Для переадресации
    const navigate = useNavigate();
    //Переход на странице книги
    const toBook = () => {
        navigate('/books/' + book.id);
    }
    //Обрезаем описание если она слишком большое
    const cut = (str, maxCount) => {
        return (str.length > maxCount) ? str.slice(0, maxCount - 1) + '...' : str;
    }
    return (
        <Card className='mb-2' onClick={toBook}>
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
                            {book.description && <div>{cut(book.description, 255)}</div>}
                        </Card.Footer>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default CatalogBookItem;
