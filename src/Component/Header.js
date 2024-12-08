import React, { Component } from "react";
import { Container, FormControl, Navbar, Nav, Form, Button } from "react-bootstrap";
import logo from "../asserts/bulba.png";
import {  BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from '../pages/Home'
import About from '../pages/About'
import Blog from '../pages/Blog'
import Contacts from '../pages/Contacts'


export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height="100"
                                wight="30"
                                className="d-inline-block align-top"
                                alt='Logo'

                            /> Gitler coput 
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/about">About us</Nav.Link>
                                <Nav.Link href="/contacts">Contacts</Nav.Link>
                                <Nav.Link href="/blog">Blog</Nav.Link>
                            </Nav>
                            <Form inline style={{ display: 'flex', alignItems: 'center', marginLeft: '500px' }}>
                                <FormControl
                                    type="text"
                                    placeholder="Srach"
                                    className="mr-sm-2"
                                    style={{ marginRight: '10px', width: '200px' }}
                                />
                                <Button variant="outline-info" style={{ marginRight: '10px' }}>Srach</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/about" element={<About/>}/>
                        <Route exact path="/contacts" element={<Contacts/>}/>
                        <Route exact path="/blog" element={<Blog/>}/>

                    </Routes>
                </Router>
            </>
        )


    }
}