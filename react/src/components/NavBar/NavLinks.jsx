import React from 'react';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const NavLinks = () => {
    const user = useSelector(state => state.user);
    return (
        <Nav>
            {user.access_level >= 5 &&
                <Link to={'librarian'} className='nav-link'>Панель библиотекаря</Link>
            }
            <Link to={`catalog`} className='nav-link'>Каталог</Link>
            <Link to={''} className='nav-link'>Авторы</Link>
            <Link to={''} className='nav-link'>Поиск</Link>
        </Nav>
    );
};

export default NavLinks;
