import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

export default function SelectOtherProps() {
    const [age, setAge] = React.useState("")

    const handleChange = (event) => {
        setAge(event.target.value)
    }

    return (
        <div>
            <FormControl sx={{ input: { color: "#fff" }, m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    sx={{ input: { color: "#fff" } }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Disabled</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="emo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="emo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Error</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select">Age</InputLabel>
                <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    // onChange={handleChange}
                    inputProps={{ readOnly: true }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Read only</FormHelperText>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select">Age</InputLabel>
                <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
        </div>
    )
}

// import * as React from "react"
// import { styled } from "@mui/material/styles"
// import Grid from "@mui/material/Grid"
// import Paper from "@mui/material/Paper"
// import Box from "@mui/material/Box"
// import { CardHeader } from "@mui/material"
// // MuiCardHeader

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === theme.palette.primary.main,
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
// }))

// export default function Header() {
//     return (
//         <Box sx={{ width: "100%" }}>
//             <Grid
//                 container
//                 rowSpacing={1}
//                 columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//             >
//                 <Grid item xs={6}>
//                     <Item>1</Item>
//                 </Grid>
//                 <Grid item xs={6}>
//                     <Item>2</Item>
//                 </Grid>
//                 <Grid item xs={6}>
//                     <Item>3</Item>
//                 </Grid>
//                 <Grid item xs={6}>
//                     <Item>4</Item>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }
// #################
// #################// #################// #################// #################//
// #################// #################// #################// #################
// #################
// #################// #################// #################
// import React from "react"
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     CardTitle,
//     Row,
//     Col,
// } from "reactstrap"

// export const Header = () => {
//     return (
//         <>
//             <div className="content">
//                 <Row>
//                     <Col lg="3" md="6" sm="6">
//                         <Card className="card-stats">
//                             <CardBody>
//                                 <Row>
//                                     <Col md="4" xs="5">
//                                         <div className="icon-big text-center icon-warning">
//                                             <i className="nc-icon nc-globe text-warning" />
//                                         </div>
//                                     </Col>
//                                     <Col md="8" xs="7">
//                                         <div className="numbers">
//                                             <p className="card-category">
//                                                 Capacity
//                                             </p>
//                                             <CardTitle tag="p">150GB</CardTitle>
//                                             <p />
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </CardBody>
//                             <CardFooter>
//                                 <hr />
//                                 <div className="stats">
//                                     <i className="fas fa-sync-alt" /> Update Now
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                     <Col lg="3" md="6" sm="6">
//                         <Card className="card-stats">
//                             <CardBody>
//                                 <Row>
//                                     <Col md="4" xs="5">
//                                         <div className="icon-big text-center icon-warning">
//                                             <i className="nc-icon nc-money-coins text-success" />
//                                         </div>
//                                     </Col>
//                                     <Col md="8" xs="7">
//                                         <div className="numbers">
//                                             <p className="card-category">
//                                                 Revenue
//                                             </p>
//                                             <CardTitle tag="p">
//                                                 $ 1,345
//                                             </CardTitle>
//                                             <p />
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </CardBody>
//                             <CardFooter>
//                                 <hr />
//                                 <div className="stats">
//                                     <i className="far fa-calendar" /> Last day
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                     <Col lg="3" md="6" sm="6">
//                         <Card className="card-stats">
//                             <CardBody>
//                                 <Row>
//                                     <Col md="4" xs="5">
//                                         <div className="icon-big text-center icon-warning">
//                                             <i className="nc-icon nc-vector text-danger" />
//                                         </div>
//                                     </Col>
//                                     <Col md="8" xs="7">
//                                         <div className="numbers">
//                                             <p className="card-category">
//                                                 Errors
//                                             </p>
//                                             <CardTitle tag="p">23</CardTitle>
//                                             <p />
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </CardBody>
//                             <CardFooter>
//                                 <hr />
//                                 <div className="stats">
//                                     <i className="far fa-clock" /> In the last
//                                     hour
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                     <Col lg="3" md="6" sm="6">
//                         <Card className="card-stats">
//                             <CardBody>
//                                 <Row>
//                                     <Col md="4" xs="5">
//                                         <div className="icon-big text-center icon-warning">
//                                             <i className="nc-icon nc-favourite-28 text-primary" />
//                                         </div>
//                                     </Col>
//                                     <Col md="8" xs="7">
//                                         <div className="numbers">
//                                             <p className="card-category">
//                                                 Followers
//                                             </p>
//                                             <CardTitle tag="p">+45K</CardTitle>
//                                             <p />
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </CardBody>
//                             <CardFooter>
//                                 <hr />
//                                 <div className="stats">
//                                     <i className="fas fa-sync-alt" /> Update now
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md="12">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle tag="h5">Users Behavior</CardTitle>
//                                 <p className="card-category">
//                                     24 Hours performance
//                                 </p>
//                             </CardHeader>
//                             {/* <CardBody>
//                 <Line
//                   data={dashboard24HoursPerformanceChart.data}
//                   options={dashboard24HoursPerformanceChart.options}
//                   width={400}
//                   height={100}
//                 />
//               </CardBody> */}
//                             <CardFooter>
//                                 <hr />
//                                 <div className="stats">
//                                     <i className="fa fa-history" /> Updated 3
//                                     minutes ago
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md="4">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle tag="h5">Email Statistics</CardTitle>
//                                 <p className="card-category">
//                                     Last Campaign Performance
//                                 </p>
//                             </CardHeader>
//                             {/* <CardBody style={{ height: "266px" }}>
//                 <Pie
//                   data={dashboardEmailStatisticsChart.data}
//                   options={dashboardEmailStatisticsChart.options}
//                 />
//               </CardBody> */}
//                             <CardFooter>
//                                 <div className="legend">
//                                     <i className="fa fa-circle text-primary" />{" "}
//                                     Opened{" "}
//                                     <i className="fa fa-circle text-warning" />{" "}
//                                     Read{" "}
//                                     <i className="fa fa-circle text-danger" />{" "}
//                                     Deleted{" "}
//                                     <i className="fa fa-circle text-gray" />{" "}
//                                     Unopened
//                                 </div>
//                                 <hr />
//                                 <div className="stats">
//                                     <i className="fa fa-calendar" /> Number of
//                                     emails sent
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                     <Col md="8">
//                         <Card className="card-chart">
//                             <CardHeader>
//                                 <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
//                                 <p className="card-category">
//                                     Line Chart with Points
//                                 </p>
//                             </CardHeader>
//                             {/* <CardBody>
//                 <Line
//                   data={dashboardNASDAQChart.data}
//                   options={dashboardNASDAQChart.options}
//                   width={400}
//                   height={100}
//                 />
//               </CardBody> */}
//                             <CardFooter>
//                                 <div className="chart-legend">
//                                     <i className="fa fa-circle text-info" />{" "}
//                                     Tesla Model S{" "}
//                                     <i className="fa fa-circle text-warning" />{" "}
//                                     BMW 5 Series
//                                 </div>
//                                 <hr />
//                                 <div className="card-stats">
//                                     <i className="fa fa-check" /> Data
//                                     information certified
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     </Col>
//                 </Row>
//             </div>
//         </>
//     )
// }
