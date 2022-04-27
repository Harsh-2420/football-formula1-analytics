import React, { useEffect, useState } from "react"
import { DropdownItem } from "../Components/DropdownItem"

export const DropdownPage = () => {
    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()

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

    useEffect(() => {
        if (selectedYear) {
            fetch("http://127.0.0.1:5000/api/yearselect", {
                method: "POST",
                body: JSON.stringify(selectedYear),
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res)
                    return res.json()
                })
                // .then((data) => {})
                .catch(console.error)
        }
    }, [selectedYear])

    const handleDropdownSelectYear = (e) => {
        setSelectedYear(e.target.value)
    }
    return (
        <div>
            <select onChange={handleDropdownSelectYear}>
                <option value="">Select Year</option>
                {years.map((year) => (
                    <DropdownItem key={year.id} year={year}></DropdownItem>
                ))}
            </select>
        </div>
    )
}
