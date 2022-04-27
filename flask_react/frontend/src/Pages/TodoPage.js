import React, { useEffect, useState } from "react"
import { AddTodoForm } from "../Components/AddTodoForm"
import { TodoItem } from "../Components/TodoItem"

export const TodoPage = () => {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setTodos(response))
    }, [])

    const handleAddInputChange = (e) => {
        setTodo(e.target.value)
        console.log(e)
    }
    const handleAddFormSubmit = (e) => {
        e.preventDefault()
        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todo.length + 1,
                    content: todo.trim(),
                },
            ])
        }
        fetch("http://127.0.0.1:5000/api/create", {
            method: "POST",
            body: JSON.stringify({ content: todo }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setTodo("")
                getLatestTodos()
            })
    }

    const getLatestTodos = () => {
        fetch("http://127.0.0.1:5000/api")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setTodo(response))
    }

    const handleDeleteClick = (id) => {
        fetch("http://127.0.0.1:5000/api/" + id, {
            methood: "DELETE",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data))

        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return (
        <div>
            <AddTodoForm
                todo={todo}
                onAddFormSubmit={handleAddFormSubmit}
                onAddInputChange={handleAddInputChange}
            />

            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </ul>
        </div>
    )
}
