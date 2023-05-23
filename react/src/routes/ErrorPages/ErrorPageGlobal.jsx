import React from 'react';
import NavbarReact from "../../components/NavBar/NavbarReact.jsx";
import {Outlet} from "react-router-dom";
import Container from "react-bootstrap/Container";

const ErrorPageGlobal = () => {
    return (
        <Container className='bg-light wrapper'>
            <NavbarReact/>
            <h4>Страница не найдена!</h4>
        </Container>
    );
};

export default ErrorPageGlobal;
