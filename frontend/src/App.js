import "./App.css"
import * as React from "react"
import { TodoPage } from "./Pages/TodoPage"
import { DropdownPage } from "./Pages/DropdownPage"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    return (
        <div className="App">
            {/* <TodoPage /> */}
            <DropdownPage />
        </div>
    )
}

export default App
