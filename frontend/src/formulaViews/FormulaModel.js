import React from "react"
import Background from "../images/tex.jpeg"

export const FormulaModel = () => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundImage: `url(${Background})`,
                    // height: "30vh",
                    backgroundSize: "150px 150px",
                }}
            >
                <p
                    style={{
                        color: "#8a9c9b",
                        width: "60%",
                    }}
                >
                    Check out the Machine Learning model I built using historic
                    race data.
                    <br></br>
                    <p style={{ padding: "10px" }}>
                        Unfortunately, F1 does not give the public access to
                        data on tires, fuel, aerodynamics, live speed and other
                        changes. So, the model I built uses historical race
                        data. I combined data on weather, track, driver and
                        constructors creating "scores" for each race and its
                        correlation with each driver and constructor.
                    </p>
                    <p style={{}}>
                        I performed extensive data analysis and feature
                        engineering to find which variables are important in
                        determining a race win and assigned weights to drivers,
                        tracks and constructors accordingly.
                    </p>
                    <p style={{}}>
                        Furthemore, I used the lap times of all drivers in each
                        race and the best qualifying times in each session as
                        well. This data is relatively sparse since we only have
                        data from 2008 for this section.
                    </p>
                    <p style={{}}>
                        Following this, I used tested several models including
                        Linear Regression, Support Vector Machines, Random
                        Forests, Gradient Boosting and Deep Neural Networks.
                        Since we are predicting final race positions, it could
                        also be considered a classification problem. So, I
                        considered the above models as a classification problem
                        as well.
                    </p>
                </p>
            </div>

            <div
                style={{
                    backgroundImage: `url(${Background})`,
                    height: "28vh",
                    backgroundSize: "150px 150px",
                }}
            >
                <p
                    style={{
                        color: "#8a9c9b",
                        height: "10vh",
                        fontSize: "15px",
                    }}
                >
                    Data from{" "}
                    <a
                        style={{
                            color: "orange",
                            fontSize: "15px",
                            textDecoration: "none",
                        }}
                        href="http://ergast.com/mrd/"
                    >
                        <span>Ergast API</span>
                    </a>
                </p>
            </div>
        </>
    )
}
