import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

const NavbarReact = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Link to={''} className='navbar-brand'>ОнлайнБиблиотека</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                <Nav>
                    <Link to={`catalog`} className='nav-link'>Каталог</Link>
                </Nav>
                <Nav>
                    <Link to={`login`} className='nav-link'>Войти</Link>
                    <Link to={`register`} className='nav-link'>Регистрация</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarReact;
