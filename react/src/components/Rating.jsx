import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalRating from "../ui/ModalRating.jsx";


const Rating = ({rating, setRating, haveUserRating, userRating, deleteGrade}) => {
    //Показать модальное окно
    const [show, setShow] = useState(false);
    //Состояние наведение курсора на компонент
    const [isHovering, setIsHovering] = useState(false);
    //Калбек для закрытия модального окна
    const handleClose = () => setShow(false);
    //Вызов функции записи оценки
    const callback = (id) => {
        setRating(id);
        handleClose();
    }
    const handleShow = () => setShow(true);
    return (
        <div className='rating'>
            <ModalRating
                show={show}
                handleClose={handleClose}
                callback={callback}
            />
            <div className='rating-wrapper'>
                <div className='rating-sub-wrapper'>
                    <div className='rating-star'>
                        <FontAwesomeIcon icon={faStar} color={'gold'}/>
                    </div>
                    <div className='rating-count'>{rating.rating/(rating.users>0?rating.users:1)}</div>
                    <div className='rating-users'>{rating.users}</div>
                </div>
                {haveUserRating ?
                    <div className='button-rating' onMouseEnter={() => {
                        setIsHovering(true)
                    }} onMouseLeave={() => {
                        setIsHovering(false)
                    }}
                    onClick={deleteGrade}>
                        {isHovering ?
                            <div className='button-rating-wrapper button-rating-wrapper-have'>
                                <div className='button-rating-star'>
                                    <FontAwesomeIcon icon={faTrash} color='red'/>
                                </div>
                                <div className='button-rating-text'>
                                    Удалить
                                </div>
                            </div> :
                            <div className='button-rating-wrapper button-rating-wrapper-have'>
                                <div className='button-rating-text'>
                                    {userRating} - моя оценка
                                </div>
                            </div>}
                    </div> :
                    <div className='button-rating' onClick={handleShow}>
                        <div className='button-rating-wrapper'>
                            <div className='button-rating-star'>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                            <div className='button-rating-text'>
                                Оценить
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default Rating;
