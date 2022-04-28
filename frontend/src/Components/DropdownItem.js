// import React, { useEffect, useState } from "react"

// export const DropdownItem = ({
//     // races,
//     // setRaces,
//     // selectedRace,
//     // setSelectedRace,
//     setEvents,
// }) => {
//     const [races, setRaces] = useState([])
//     const [selectedRace, setSelectedRace] = useState()

//     useEffect(() => {
//         fetch("http://127.0.0.1:5000/api/getrace", {
//             method: "GET",
//             headers: {
//                 "Content-type": "application/json",
//             },
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 setRaces(data)
//             })
//     }, [])
//     useEffect(() => {
//         if (selectedRace) {
//             fetch("http://127.0.0.1:5000/api/selectrace", {
//                 method: "POST",
//                 body: JSON.stringify(selectedRace),
//                 headers: { "content-type": "application/json" },
//             })
//                 .then((res) => {
//                     if (!res.ok) return Promise.reject(res)
//                     return res.json()
//                 })
//                 .then((data) => {
//                     getLatestEvent()
//                 })
//                 .catch(console.error)
//         }
//     }, [selectedRace])
//     const handleDropdownSelectRace = (e) => {
//         setSelectedRace(e.target.value)
//     }
//     const getLatestEvent = () => {
//         fetch("http://127.0.0.1:5000/api/getevent")
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//             })
//             .then((response) => setEvents(response))
//     }
//     return (
//         <select onChange={handleDropdownSelectRace}>
//             <option value="">Select Race</option>
//             {races.map((race) => (
//                 <option key={race.id}>{race.content}</option>
//             ))}
//         </select>
//     )
// }
