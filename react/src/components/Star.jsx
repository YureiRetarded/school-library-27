import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Star = ({id, painted, painting, clicked}) => {
    return (
        <FontAwesomeIcon
            icon={faStar}
            color={painted ? 'red' : 'gold'}
            onMouseEnter={() => painting(id, true)}
            onMouseLeave={() => painting(id, false)}
            className='starbar-star'
            onClick={() => clicked(id)}
        />
    );
};

export default Star;
