import React from 'react';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faPen} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CountryItem = ({country, destroyCountry}) => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const destroy = () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        }
        axios.post('http://127.0.0.1:8000/api/country/' + country.id, {_method: 'DELETE'}, config).then(response => {
                destroyCountry(country.id)
            }
        )
    }
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
