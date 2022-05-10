import React from "react"
import { Row } from "react-bootstrap"

export const MatchItem = (row) => {
    const data = row.row
    return (
        <div
            className="matchComponent"
            style={{
                position: "relative",
                color: "black",
            }}
        >
            <Row>
                <div
                    style={{
                        position: "absolute",
                        width: "450px",
                        left: "50px",
                    }}
                >
                    <div
                        style={{
                            float: "left",
                            width: "100px",
                            fontSize: "12px",
                            marginLeft: "17px",
                            // fontWeight: "bold",
                            fontColor: "#808080",
                        }}
                    >
                        {`${data.date}`.substring(5, 11)}
                    </div>
                    <div
                        style={{
                            float: "left",
                            width: "50px",
                            marginLeft: "50px",
                            fontSize: "10px",
                            fontColor: "#808080",
                        }}
                    >
                        WIN %
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        left: "265px",
                        top: "25px",
                        width: "70px",
                        marginLeft: "60px",
                        fontSize: "10px",
                        fontColor: "#808080",
                    }}
                >
                    DRAW %
                </div>
            </Row>
            <Row>
                <div
                    style={{ float: "left", width: "400px", marginTop: "15px" }}
                >
                    <div
                        style={{
                            paddingTop: "5px",
                            paddingLeft: "15px",
                            width: "300px",
                            height: "35px",
                            lineHeight: "35px",
                            textAlign: "left",
                        }}
                    >
                        <Row>
                            <div
                                style={{
                                    float: "left",
                                    width: "220px",
                                    height: "35px",
                                    background: "#dcdbd3",
                                    borderTopLeftRadius: "13px",
                                    borderBottomLeftRadius: "13px",
                                }}
                            >
                                {data.team1}
                            </div>

                            <div
                                style={{
                                    float: "right",
                                    width: "80px",
                                    height: "35px",
                                    background: "#f6edc3",
                                    borderTopRightRadius: "13px",
                                    borderBottomRightRadius: "13px",
                                }}
                            >
                                {`${data.prob1}`.substring(2, 4)}%
                            </div>
                        </Row>
                    </div>
                    <br></br>
                    <div
                        style={{
                            paddingTop: "5px",
                            paddingLeft: "15px",
                            width: "300px",
                            height: "35px",
                            lineHeight: "35px",
                            textAlign: "left",
                        }}
                    >
                        <Row>
                            <div
                                style={{
                                    float: "left",
                                    width: "220px",
                                    height: "35px",
                                    background: "#dcdbd3",
                                    borderTopLeftRadius: "13px",
                                    borderBottomLeftRadius: "13px",
                                }}
                            >
                                {data.team2}
                            </div>

                            <div
                                style={{
                                    float: "right",
                                    width: "80px",
                                    height: "35px",
                                    background: "#f6edc3",
                                    borderTopRightRadius: "13px",
                                    borderBottomRightRadius: "13px",
                                }}
                            >
                                {`${data.prob2}`.substring(2, 4)}%
                            </div>
                        </Row>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: "12px",
                        background: "#f6edc3",
                        borderRadius: "13px",
                        border: "2px solid",
                        borderColor: "#f6edc3",
                        width: "80px",
                        // height: "35px",
                        float: "right",
                        left: "320px",
                        top: "40px",
                        position: "absolute",
                    }}
                >
                    {`${data.probd}`.substring(2, 4)}%
                </div>
            </Row>
        </div>
    )
}
