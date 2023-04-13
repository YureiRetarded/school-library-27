import React from 'react';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const NavAuth = () => {
    const user = useSelector(state => state.user);
    //Вывод ссылок в зависимости от авторизации пользователя
    return (
        <Nav>

            {user.access_level > 0 ? (
                <React.Fragment>
                    <Link to={'profile'} className="nav-link">Профиль</Link>
                    <Link to={'logOut'} className='nav-link'>Выйти</Link>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Link to={`login`} className='nav-link'>Войти</Link>
                    <Link to={`register`} className='nav-link'>Зарегистрироваться</Link>
                </React.Fragment>
            )
            }
        </Nav>
    );
};

export default NavAuth;
