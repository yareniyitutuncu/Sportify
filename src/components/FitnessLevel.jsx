import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FitnessLevel() {
    const [fitnessLevel, setFitnessLevel] = useState("");
    const navigate = useNavigate();

    const handleSelect = (level) => {
        setFitnessLevel(level);
        navigate("/goal", { state: { fitnessLevel: level } });
    };

    return (
        <div style={styles.fitnessContainer}>
            <h2 style={styles.fitnessTitle}>Select Your Fitness Level</h2>
            <div style={styles.fitnessOptions}>
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button 
                        key={level} 
                        style={{
                            ...styles.fitnessBtn,
                            ...(fitnessLevel === level ? styles.selectedBtn : {})
                        }}
                        onClick={() => handleSelect(level)}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
}

const styles = {
    fitnessContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        height: "60vh",
        padding: "20px",
    },
    fitnessTitle: {
        color: "#f39c12",
        fontSize: "2rem",
        marginBottom: "30px",
        textAlign: "center",
    },
    fitnessOptions: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        maxWidth: "600px",
        gap: "20px",
    },
    fitnessBtn: {
        backgroundColor: "#333",
        color: "white",
        padding: "15px 30px",
        fontSize: "1.1rem",
        border: "2px solid #f39c12",
        borderRadius: "50px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: "100%",
        textAlign: "center",
    },
    fitnessBtnHover: {
        backgroundColor: "#f39c12",
        color: "#333",
    },
    selectedBtn: {
        backgroundColor: "#f39c12",
        color: "#fff",
    },
    // Responsive Design
    "@media (max-width: 768px)": {
        fitnessOptions: {
            flexDirection: "column",
            gap: "15px",
        },
        fitnessBtn: {
            fontSize: "1rem",
            padding: "10px 25px",
        },
    }
};

export default FitnessLevel;
