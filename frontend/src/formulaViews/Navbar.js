import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"

export const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Sports analytics</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/formula">Formula 1</Nav.Link>
                    <Nav.Link href="/football">Football</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
