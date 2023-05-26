import React from 'react';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const NavLinks = () => {
    //Для проверки уровня доступа пользователя
    const user = useSelector(state => state.user);
    return (
        <Nav>
            {user.access_level >= 5 &&
                <Link to={'librarian'} className='nav-link'>Панель библиотекаря</Link>
            }
            <Link to={`catalog`} className='nav-link'>Каталог</Link>
            <Link to={'authors'} className='nav-link'>Авторы</Link>
        </Nav>
    );
};

export default NavLinks;
