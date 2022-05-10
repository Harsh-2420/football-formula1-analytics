import React, { useState, useEffect } from "react"
import moment from "moment"

export const MatchPredictionsLeague = (league) => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2)
            date = [date.getFullYear(), mnth, day].join("-")
            return moment(date, "YYYY-MM-DD").toDate()
        }

        function isGreater(x) {
            return convert(x.date) > moment()
        }
        fetch("http://127.0.0.1:5000/football/getleaguepredictions")
            .then((res) => res.json())
            .then((data) => {
                const selectedLeague = league.league
                const leaguedata = data
                    .filter((item) => item.league === selectedLeague)
                    .filter(isGreater)
                leaguedata.reverse()
                console.log("football league predictions:", leaguedata)
                setRows(leaguedata)
            })
    }, [])

    // console.log(league)
    return <div>Upcoming Matches</div>
}
