import React from "react"
import "../App.css"
import { Container, Nav, Navbar } from "react-bootstrap"
import Background from "../images/tex.jpeg"
import { Header } from "./Header"

export const NavBar = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "150px 150px",
            }}
        >
            <Navbar className="nav-glass" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <Header />
                    </Navbar.Brand>
                    <Nav
                    // className="me-auto"
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/formula">Football</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
