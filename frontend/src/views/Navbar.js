import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"

export const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Sport Analytics</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/formula">Formula 1</Nav.Link>
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    )
}
