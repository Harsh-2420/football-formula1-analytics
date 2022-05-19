import React from "react"
import "../App.css"
import { Container, Nav, Navbar } from "react-bootstrap"
import Background from "../images/tex.jpeg"

export const NavBar = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "150px 150px",
                // background: rgba(255, 255, 255, 0.19);
            }}
        >
            <Navbar className="nav-glass" variant="dark">
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
