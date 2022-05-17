import * as React from "react"
import { Component } from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import { Formula } from "./Formula"
import { Football } from "./Football"
import { Home } from "./Home"
import { NavBar } from "./Components/Navbar"

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/formula" element={<Formula />} />
                <Route path="/football" element={<Football />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
