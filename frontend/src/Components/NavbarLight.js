import React from "react"
import "../App.css"
import { Container, Nav, Navbar } from "react-bootstrap"
import Background from "../images/tex.jpeg"

export const NavBarLight = () => {
    return (
        <div>
            <Navbar className="nav-glass" variant="light">
                <Container>
                    <Navbar.Brand href="/">Sports analytics</Navbar.Brand>
                    <Nav
                    // className="me-auto"
                    >
                        <Nav.Link href="/formula">Formula 1</Nav.Link>
                        <Nav.Link href="/football">Football</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
