import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import AuthorService from "../../../API/AuthorService.js";
import {Col, Image, Row, Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const AuthorReadItem = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //ID автора в адресной строке
    const {authorId} = useParams();
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Найден ли автор
    const [isFound, setIsFound] = useState(false);
    const [author, setAuthor] = useState({
        id: 0,
        country: [],
        imageURL: '',
        first_name: '',
        second_name: '',
        middle_name: '',
        date_birthday: '',
        date_death: '',
        bio: ''
    });
    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await AuthorService.getAuthor(user, authorId);
            if (response.status) {
                setAuthor({
                    ...author,
                    id: response.data.id,
                    country: response.data.country,
                    image: response.data.imageURL,
                    first_name: response.data.first_name,
                    second_name: response.data.second_name,
                    middle_name: response.data.middle_name,
                    date_birthday: response.data.date_birthday,
                    date_death: response.data.date_death,
                    bio: response.data.bio
                })
                setIsFound(true);
            } else {
                setIsFound(false);
            }
            setIsLoading(false);
        }
        fetchAuthor();
    }, []);

    return (
        <div>
            {isLoading ?
                <Spinner animation="border" variant="dark"/> :
                <div>
                    {isFound ?
                        <Container>
                            <Row>
                                <Col sm={2} className='author-page-icon'>
                                    <Image src={'http://' + author.image} rounded fluid/>
                                </Col>
                                <Col>
                                    <h4>id автора:{author.id}</h4>
                                    <h4>
                                        {author.second_name && author.second_name + ' '}
                                        {author.first_name && author.first_name + ' '}
                                        {author.middle_name && author.middle_name + ' '}
                                    </h4>
                                    {author.country.name &&
                                        <h4>Место рождения:{author.country.name}</h4>
                                    }
                                    {author.date_birthday &&
                                        <h4>Дата рождения:{author.date_birthday}</h4>
                                    }
                                    {author.date_death &&
                                        <h4>Дата смерти:{author.date_death}</h4>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className='author-page-bio'>
                                    {author.bio ?
                                        author.bio :
                                        'Нет более подробных сведений.'
                                    }
                                </Col>
                            </Row>
                        </Container> : <Container>
                            <h4>
                                Автор не найден!
                            </h4>
                        </Container>
                    }
                </div>}
        </div>
    );
};

export default AuthorReadItem;
