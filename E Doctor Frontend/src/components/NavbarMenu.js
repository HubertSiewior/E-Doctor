import React from "react";
import { Navbar, NavDropdown} from "react-bootstrap";


export const NavbarMenu = () => {
    return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/"><strong>Welcome to E-Doctor</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                        <NavDropdown title="Diseases" variant="danger" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/disease">DiseasesList</NavDropdown.Item>
                            <NavDropdown.Item href="/disease/new">Add new Disease</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown id="basic-navbar-nav" title="Medicines" variant="danger">
                            <NavDropdown.Item href="/medicine">MedicinesList</NavDropdown.Item>
                            <NavDropdown.Item href="/medicine/new">Add new Medicine</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown id="basic-navbar-nav" title="E-Doctor" variant="danger">
                            <NavDropdown.Item href="/eDoctor/new">Go to the E Doctor</NavDropdown.Item>
                            <NavDropdown.Item href="/eDoctor/history">Check my history</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown id="basic-navbar-nav" title="About" variant="danger">
                            <NavDropdown.Item href="/about">About</NavDropdown.Item>
                        </NavDropdown>
                    <NavDropdown id="basic-navbar-nav" title="LOGOUT" variant="danger">
                        <NavDropdown.Item href="/" onClick={() => localStorage.removeItem('TOKEN_SECRET')}>LOGOUT</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
    )
}