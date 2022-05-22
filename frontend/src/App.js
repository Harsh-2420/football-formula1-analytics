import * as React from "react"
import { Component } from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import { Formula } from "./Formula"
import { Football } from "./Football"
import { Home } from "./Home"
import ScrollToTop from "./Components/ScrollToTop"

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/formula" element={<Formula />} />
                    <Route path="/football" element={<Football />} />
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    )
}

export default App
