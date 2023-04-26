import React from 'react';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faPen} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CountryService from "../../../API/CountryService.js";

const CountryItem = ({country, destroyCountry}) => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user)
    //Для возможности отправки на страницу редактирования
    const navigate = useNavigate();
    const destroy = async () => {
        const response = await CountryService.deleteCountry(user, country.id);
        if (response.status) {
            destroyCountry(country.id);
        }
    }
    //Отправка на страницу редактирования
    const edit = () => {
        navigate(`/librarian/countries/${country.id}/edit`);
    }
    return (
        <div className='card my-1'>
            <div className='card-body'>
                <div className='card-title d-flex justify-content-between align-items-center'>
                    {country.name}
                    <div className='d-flex justify-content-between align-items-center'>
                        <Button onClick={destroy} variant='danger' className='mx-1'>
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </Button>
                        <Button onClick={edit} variant='primary'>
                            <FontAwesomeIcon icon={faPen}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryItem;
