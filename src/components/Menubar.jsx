import { Navbar, Nav, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Menubar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light" sticky="top">
                <Navbar.Brand>COVID-19</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/indonesia">Indonesia</Nav.Link>
                    <Nav.Link as={Link} to="/vaksin">Vaksinasi</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Menubar;