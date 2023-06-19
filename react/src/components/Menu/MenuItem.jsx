import React from 'react';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MenuItem = ({item, selected, action}) => {
    //Функция для выполнения перенесения в другую колонку
    const move = () => {
        action(item.id);
    }
    return (
        <div onClick={move} className={'menu-item' + (selected ? ' menu-item-selected' : '')}>
            <div className='menu-item-text'>
                {item.second_name && item.second_name + ' '}
                {item.first_name && item.first_name + ' '}
                {item.middle_name && item.middle_name + ' '}
            </div>
            <div className='menu-item-arrow'>
                {selected ? <FontAwesomeIcon icon={faArrowLeft}/> : <FontAwesomeIcon icon={faArrowRight}/>}
            </div>
        </div>
    );
};

export default MenuItem;
