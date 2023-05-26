import React from 'react';
import {useNavigate} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";

const AuthorsElementItem = ({author}) => {
    //Для переадресации
    const navigate = useNavigate();
    //Переход на странице книги
    const toAuthor = () => {
        navigate('/authors/' + author.id);
    }
    //Обрезаем биографию если она слишком большое
    const cut = (str, maxCount) => {
        return (str.length > maxCount) ? str.slice(0, maxCount - 1) + '...' : str;
    }
    return (
        <Card className='mb-2' onClick={toAuthor}>
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
                </Col>
            </Row>
        </Card>
    );
};

export default AuthorsElementItem;
