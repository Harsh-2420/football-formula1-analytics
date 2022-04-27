import React, { useEffect, useState } from "react"
// import { DropdownItem } from "../Components/DropdownItem"

export const DropdownPage = () => {
    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()
    const [races, setRaces] = useState([])
    const [selectedRace, setSelectedRace] = useState()

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/getyear", {
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
        fetch("http://127.0.0.1:5000/api/getrace", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setRaces(data)
            })
    }, [])

    useEffect(() => {
        if (selectedYear) {
            fetch("http://127.0.0.1:5000/api/selectyear", {
                method: "POST",
                body: JSON.stringify(selectedYear),
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res)
                    return res.json()
                })
                .then((data) => {
                    getLatestRace()
                })
                .catch(console.error)
        }
    }, [selectedYear])
    useEffect(() => {
        if (selectedRace) {
            fetch("http://127.0.0.1:5000/api/selectrace", {
                method: "POST",
                body: JSON.stringify(selectedRace),
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res)
                    return res.json()
                })
                // .then((data) => {})
                .catch(console.error)
        }
    }, [selectedRace])

    const handleDropdownSelectYear = (e) => {
        setSelectedYear(e.target.value)
    }
    const handleDropdownSelectRace = (e) => {
        setSelectedRace(e.target.value)
    }

    const getLatestRace = () => {
        fetch("http://127.0.0.1:5000/api/getrace")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setRaces(response))
    }

    return (
        <div>
            <div>
                <select onChange={handleDropdownSelectYear}>
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <option key={year.id}>{year.content}</option>
                        // <DropdownItem key={year.id} year={year}></DropdownItem>
                    ))}
                </select>
            </div>
            <div>
                <select onChange={handleDropdownSelectRace}>
                    <option value="">Select Race</option>
                    {races.map((race) => (
                        <option key={race.id}>{race.content}</option>
                        // <DropdownItem key={race.id} race={race}></DropdownItem>
                    ))}
                </select>
            </div>
        </div>
    )
}
