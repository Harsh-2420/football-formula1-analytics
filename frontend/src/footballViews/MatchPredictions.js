import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

export const MatchPredictions = () => {
    const [rows, setRows] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getpredictions")
            .then((res) => res.json())
            .then((data) => {
                console.log("football global ranks:", data)
                setRows(data)
            })
    }, [])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={2} sm={4} md={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                                Match
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
