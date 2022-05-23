import Background from "../images/tex.jpeg"

export const TelemetryFooter = () => {
    return (
        <div
            style={{
                // fontFamily: "Montserrat",
                backgroundImage: `url(${Background})`,
                // height: "200vh",
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
                Inspired from{" "}
                <a
                    style={{
                        color: "orange",
                        fontSize: "15px",
                        textDecoration: "none",
                    }}
                    href="http://f1-tempo.com"
                >
                    <span>F1 Tempo</span>
                </a>
                <br></br>
                <br></br>
                Data from Fast{" "}
                <a
                    style={{
                        color: "orange",
                        fontSize: "15px",
                        textDecoration: "none",
                    }}
                    href="https://theoehrly.github.io/Fast-F1/"
                >
                    <span>Fast F1</span>
                </a>
            </p>
        </div>
    )
}
