import React, {useContext} from 'react';
import {NavbarStyles} from './NavbarStyled'
import {Navbar as Navigation, Nav, NavDropdown} from "react-bootstrap";
import {StatsContext} from "../../context/StatsContext"


const Navbar = () => {


    return (
        <>

            <NavbarStyles>
                <Navigation collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navigation.Brand href="#home">Covid19<span>News</span></Navigation.Brand>
                    <Navigation.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navigation.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">Random Guide</Nav.Link>
                            <Nav.Link href="#pricing">Random Stat</Nav.Link>
                            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider/>*/}
                            {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                    </Navigation.Collapse>
                </Navigation>
            </NavbarStyles>
         
        </>
    );
};

export default Navbar;