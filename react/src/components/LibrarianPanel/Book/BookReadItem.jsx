import React, {useEffect, useState} from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import BookService from "../../../API/BookService.js";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Col, Image, Row, Spinner} from "react-bootstrap";
import AuthorsBookList from "../../AuthorsBookList.jsx";

const BookReadItem = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //ID книги в адресной строке
    const {bookId} = useParams();
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState({
        id: 0,
        name: '',
        category: [],
        authors: [],
        imageURL: '',
        date_created: '',
        description: ''
    });
    //Загрузка книги
    useEffect(() => {
        const fetchBook = async () => {
            const response = await BookService.getBook(user, bookId);
            if (response.status) {
                setBook({
                    ...book,
                    id: response.data.id,
                    name: response.data.name,
                    category: response.data.category,
                    authors: response.data.authors,
                    imageURL: response.data.imageURL,
                    date_created: response.data.date_created,
                    description: response.data.description
                });
            }
            setIsLoading(false);
        };
        fetchBook();
    }, []);

    return (
        <div>
            {isLoading ?
                <Spinner animation="border" variant="dark"/> :
                <div>
                    <Container>
                        <Row>
                            <Col sm={2} className='author-page-icon'>
                                <Image src={'http://' + book.imageURL} rounded fluid/>
                            </Col>
                            <Col>
                                <h4>id книги:{book.id}</h4>
                                <h4>
                                    {book.name && book.name}
                                </h4>
                                {book.category.name &&
                                    <h4>Категория: {book.category.name}</h4>
                                }
                                <h4>
                                    {book.authors.length > 1 ? 'Авторы:' : 'Автор:'}
                                    <AuthorsBookList authors={book.authors}/>
                                </h4>

                                {book.date_created ?
                                    <h4>Дата создания: {book.date_created}</h4> :
                                    <h4>Дата создания: неизвестно</h4>
                                }
                                <Link to={'read'} className='btn btn-primary'>Читать</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='author-page-bio'>
                                {book.description ?
                                    book.description :
                                    'Нет более описания.'
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
        </div>
    );
};

export default BookReadItem;
