import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function TargetArea() {
    const location = useLocation();
    const navigate = useNavigate();
    const [targetArea, setTargetArea] = useState("");

    const handleSelect = (area) => {
        setTargetArea(area);
        navigate("/recommendation", {
            state: {
                fitnessLevel: location.state.fitnessLevel,
                goal: location.state.goal,
                targetArea: area,
            },
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Select Your Target Area</h2>
            <div style={styles.buttonsContainer}>
                {["Legs", "Abs", "Arms", "Back"].map((area) => (
                    <button
                        key={area}
                        style={{
                            ...styles.button,
                            ...(targetArea === area ? styles.selectedButton : {}),
                        }}
                        onClick={() => handleSelect(area)}
                    >
                        {area}
                    </button>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        height: "70vh",
        padding: "20px",
        color: "#f39c12",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "30px",
        textAlign: "center",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "600px",
    },
    button: {
        backgroundColor: "#333",
        color: "#fff",
        padding: "15px 40px",
        fontSize: "1.1rem",
        border: "2px solid #f39c12",
        borderRadius: "50px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: "100%",
        textAlign: "center",
        maxWidth: "300px",
    },
    selectedButton: {
        backgroundColor: "#f39c12",
        color: "#333",
    },
    // Responsive Design
    "@media (max-width: 768px)": {
        buttonsContainer: {
            flexDirection: "column",
            gap: "15px",
        },
        button: {
            fontSize: "1rem",
            padding: "10px 25px",
        },
    },
};

export default TargetArea;
