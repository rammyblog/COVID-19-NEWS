import React, {useEffect, useState} from 'react';
import {NavbarStyles} from './NavbarStyled'
import {Nav, Navbar as Navigation} from "react-bootstrap";
import axios from 'axios';
import ModalBox from './Modal'
import {Link} from "react-router-dom";


const Navbar = () => {

    const [modalShow, setModalShow] = useState(false);
    const [maskimage, setMaskImage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/masks.php', {
                    responseType: 'arraybuffer', headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "af071e0d68msh1b09ca43577c8f0p164b67jsn473e4cb936c0"
                    },
                })
                    .then((response) => {
                        let image = btoa(
                            new Uint8Array(response.data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
                    });
                setMaskImage(response)
            } catch (e) {
                console.log(e)
            }


        }

        fetchData()

    }, []);


    return (
        <>


            <NavbarStyles>
                <Navigation collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navigation.Brand><Link to='/'>Covid-19<span>Nigeria</span></Link></Navigation.Brand>
                    <Navigation.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navigation.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => setModalShow(true)}>Random Guide</Nav.Link>
                            <Link className='nav-link'>Prevention</Link>
                            <Link className='nav-link' to="/causes/">Causes</Link>
                            <Link className='nav-link' to="/analytics/">Analytics</Link>

                            {/*    <NavDropdown.Divider/>*/}
                            {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                    </Navigation.Collapse>
                </Navigation>
            </NavbarStyles>

            <ModalBox show={modalShow} maskimage={maskimage} onHide={() => setModalShow(false)}/>

        </>
    );
};

export default Navbar;