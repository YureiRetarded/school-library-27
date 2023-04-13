import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import NavAuth from "./NavAuth.jsx";
import NavLinks from "./NavLinks.jsx";


const NavbarReact = () => {
    return (
        <Navbar bg="light" expand="lg" className='border-bottom'>
            <Link to={''} className='navbar-brand'>ОнлайнБиблиотека</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                <NavLinks/>
                <NavAuth/>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarReact;
