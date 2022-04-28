import React, { useEffect, useState } from "react"
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"

export const DropdownPage = () => {
    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()

    const [races, setRaces] = useState([])
    const [selectedRace, setSelectedRace] = useState()

    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState()

    const [drivers, setDrivers] = useState([])
    const [selectedDriver, setSelectedDriver] = useState()

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
        fetch("http://127.0.0.1:5000/api/getdriver", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDrivers(data)
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
                .then((data) => {
                    getLatestDriver()
                })
                .catch(console.error)
        }
    }, [selectedEvent])

    useEffect(() => {
        if (selectedDriver) {
            fetch("http://127.0.0.1:5000/api/selectdriver", {
                method: "POST",
                body: JSON.stringify(selectedDriver),
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res)
                    return res.json()
                })
                // .then((data) => {})
                .catch(console.error)
        }
    }, [selectedDriver])

    const handleDropdownSelectYear = (e) => {
        setSelectedYear(e.target.value)
    }
    const handleDropdownSelectRace = (e) => {
        setSelectedRace(e.target.value)
    }
    const handleDropdownSelectEvent = (e) => {
        setSelectedEvent(e.target.value)
    }
    const handleDropdownSelectDriver = (e) => {
        const values = [...e.target.selectedOptions].map((opt) => opt.value)
        console.log(values)
        setSelectedDriver(values)
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
    const getLatestDriver = () => {
        fetch("http://127.0.0.1:5000/api/getdriver")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setDrivers(response))
    }

    return (
        <div>
            <Box sx={{ marginTop: 5 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedYear || ""}
                        label="Year"
                        onChange={handleDropdownSelectYear}
                    >
                        {years.map((year) => (
                            <MenuItem value={year.content} key={year.id}>
                                {year.content}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* <FormHelperText>Year</FormHelperText> */}
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                        Circuit
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedRace || ""}
                        label="Circuit"
                        onChange={handleDropdownSelectRace}
                    >
                        {races.map((race) => (
                            <MenuItem value={race.content} key={race.id}>
                                {race.content}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* <FormHelperText>Circuit</FormHelperText> */}
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                        Session
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedEvent || ""}
                        label="Session"
                        onChange={handleDropdownSelectEvent}
                    >
                        {events.map((event) => (
                            <MenuItem value={event.content} key={event.id}>
                                {event.content}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* <FormHelperText>Session</FormHelperText> */}
                </FormControl>
                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel
                // id="demo-simple-select-label"
                >
                    Driver
                </InputLabel>
                <Select
                    multiple={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={handleDropdownSelectDriver}
                >
                    {drivers.map((driver) => (
                        <MenuItem value={driver.content} key={driver.id}>
                            {driver.content}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Driver</FormHelperText>
            </FormControl> */}
                <div>
                    <select onChange={handleDropdownSelectDriver} multiple>
                        <option value="">Select Drivers</option>
                        {drivers.map((event) => (
                            <option key={event.id}>{event.content}</option>
                        ))}
                    </select>
                </div>
            </Box>
        </div>
    )
}
