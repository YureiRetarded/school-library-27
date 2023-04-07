import NavbarReact from "../components/NavbarReact.jsx";
import Container from "react-bootstrap/Container";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <Container className='bg-light wrapper'>
            <NavbarReact/>
            <Outlet/>
        </Container>
    )
}

export default App
