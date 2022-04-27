import React, { useEffect, useState } from "react"
import { DropdownItem } from "../Components/DropdownItem"
import Select from "react-select"
import axios from "axios"

export const DropdownPage = () => {
    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState("")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setYears(data)
            })
    }, [])

    const handleDropdownSelectYear = (e) => {
        setSelectedYear(e.target.value)
    }
    const handleDropdownSubmitYear = (e) => {
        e.preventDefault()
        console.log(e)
        axios
            .post("http://127.0.0.1:5000/api/yearselect", selectedYear)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <form method="post" onSubmit={handleDropdownSubmitYear}>
                <select onChange={handleDropdownSelectYear}>
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <DropdownItem key={year.id} year={year}></DropdownItem>
                    ))}
                </select>
            </form>
        </div>
    )
}
