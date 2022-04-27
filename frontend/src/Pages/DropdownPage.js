import React, { useEffect, useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"

export const DropdownPage = () => {
    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()

    const [races, setRaces] = useState([])
    const [selectedRace, setSelectedRace] = useState()

    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState()

    const [currentChartData, setCurrentChartData] = useState([])

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
        fetch("http://127.0.0.1:5000/api/getevent", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setEvents(data)
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
                .then((data) => {
                    getLatestEvent()
                })
                .catch(console.error)
        }
    }, [selectedRace])

    useEffect(() => {
        if (selectedEvent) {
            fetch("http://127.0.0.1:5000/api/selectevent", {
                method: "POST",
                body: JSON.stringify(selectedEvent),
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res)
                    return res.json()
                })
                // .then((data) => {})
                .catch(console.error)
        }
    }, [selectedEvent])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/lap_number_time")
            .then((res) => res.json())
            .then((data) => {
                console.log("first chart data is", data)
                setCurrentChartData(data)
            })
    }, [])

    const handleDropdownSelectYear = (e) => {
        setSelectedYear(e.target.value)
    }
    const handleDropdownSelectRace = (e) => {
        setSelectedRace(e.target.value)
    }
    const handleDropdownSelectEvent = (e) => {
        setSelectedEvent(e.target.value)
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
    const getLatestEvent = () => {
        fetch("http://127.0.0.1:5000/api/getevent")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setEvents(response))
    }

    return (
        <div>
            <div className="row">
                <div>
                    <select onChange={handleDropdownSelectYear}>
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year.id}>{year.content}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={handleDropdownSelectRace}>
                        <option value="">Select Race</option>
                        {races.map((race) => (
                            <option key={race.id}>{race.content}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={handleDropdownSelectEvent}>
                        <option value="">Select Event</option>
                        {events.map((event) => (
                            <option key={event.id}>{event.content}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <LineChart width={400} height={400} data={currentChartData}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    )
}
