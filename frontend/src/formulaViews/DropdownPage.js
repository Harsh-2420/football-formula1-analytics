import React, { useEffect, useState } from "react"
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import Chip from "@mui/material/Chip"
import { orange } from "@mui/material/colors"
import { SelectionForm } from "../Components/SelectionForm"
import { MultipleSelectionForm } from "../Components/MultipleSelectionForm"
import { LapTime } from "./LapTime"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import SendIcon from "@mui/icons-material/Send"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}
const outerTheme = createTheme({
    palette: {
        secondary: {
            main: orange[500],
        },
    },
})

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export const DropdownPage = () => {
    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()

    const [races, setRaces] = useState([])
    const [selectedRace, setSelectedRace] = useState()

    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState()

    const [drivers, setDrivers] = useState([])
    const [selectedDriver, setSelectedDriver] = useState([])

    const [buttonClick, setButtonClick] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        fetch("http://127.0.0.1:5000/formula/getyear", {
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
        fetch("http://127.0.0.1:5000/formula/getrace", {
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
        fetch("http://127.0.0.1:5000/formula/getevent", {
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
        fetch("http://127.0.0.1:5000/formula/getdriver", {
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
            fetch("http://127.0.0.1:5000/formula/selectyear", {
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
            fetch("http://127.0.0.1:5000/formula/selectrace", {
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
            fetch("http://127.0.0.1:5000/formula/selectevent", {
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

    // const SelectionComplete = ({selectedDriver}) => {
    useEffect(() => {
        if (selectedDriver) {
            fetch("http://127.0.0.1:5000/formula/selectdriver", {
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
    // return selectedDriver}

    const handleDropdownSelectYear = (e) => {
        setSelectedYear(e.target.value)
    }
    const handleDropdownSelectRace = (e) => {
        setSelectedRace(e.target.value)
    }
    const handleDropdownSelectEvent = (e) => {
        setSelectedEvent(e.target.value)
    }
    const handleDropdownSelectDriver = (event) => {
        const {
            target: { value },
        } = event
        console.log(event)
        setSelectedDriver(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        )
    }
    const getLatestRace = () => {
        fetch("http://127.0.0.1:5000/formula/getrace")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setRaces(response))
    }
    const getLatestEvent = () => {
        fetch("http://127.0.0.1:5000/formula/getevent")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setEvents(response))
    }
    const getLatestDriver = () => {
        fetch("http://127.0.0.1:5000/formula/getdriver")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((response) => setDrivers(response))
    }
    const onButtonClick = () => {
        setButtonClick(true)
    }
    return (
        <div>
            <Box
                sx={{
                    paddingBottom: 5,
                }}
            >
                <SelectionForm
                    selection={selectedYear}
                    data={years}
                    handleDropdown={handleDropdownSelectYear}
                    input="Year"
                />
                <SelectionForm
                    selection={selectedRace}
                    data={races}
                    handleDropdown={handleDropdownSelectRace}
                    input="Circuit"
                />
                <SelectionForm
                    selection={selectedEvent}
                    data={events}
                    handleDropdown={handleDropdownSelectEvent}
                    input="Session"
                />
                <MultipleSelectionForm
                    selection={selectedDriver}
                    data={drivers}
                    handleDropdown={handleDropdownSelectDriver}
                    input="Drivers"
                />
                {/* <Button
                    onClick={onButtonClick}
                    variant="contained"
                    endIcon={<SendIcon />}
                >
                    {buttonClick ? <LapTime /> : null}
                    Go
                </Button> */}
                {/* {selectedYear &&
                selectedRace &&
                selectedEvent &&
                selectedDriver.length > 0 ? (
                    <LapTime />
                ) : (
                    console.log("selection not made")
                )} */}
            </Box>
            <p style={{ color: "#8a9c9b" }}>
                Here, you can create F1 lap time and telemetry charts using the
                selection boxes below.
                <br></br>
            </p>
        </div>
    )
}

// export default SelectionComplete
