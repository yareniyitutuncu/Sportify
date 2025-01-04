import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function GoalSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const [goal, setGoal] = useState("");

    const handleSelect = (selectedGoal) => {
        setGoal(selectedGoal);
        navigate("/target-area", {
            state: { fitnessLevel: location.state.fitnessLevel, goal: selectedGoal },
        });
    };

    return (
        <div style={styles.goalContainer}>
            <h2 style={styles.title}>Select Your Goal</h2>
            <div style={styles.goalOptions}>
                {["Strength Building", "Muscle Gain", "Flexibility Enhancement", "Endurance Improvement"].map((goal) => (
                    <button
                        key={goal}
                        style={{
                            ...styles.goalBtn,
                            ...(goal === goal ? styles.selectedBtn : {})
                        }}
                        onClick={() => handleSelect(goal)}
                    >
                        {goal}
                    </button>
                ))}
            </div>
        </div>
    );
}

const styles = {
    goalContainer: {
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
    goalOptions: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "600px",
    },
    goalBtn: {
        backgroundColor: "#333",
        color: "#white",
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
    selectedBtn: {
        backgroundColor: "#3a3834",
        color: "#fff",
    },
    goalBtnHover: {
        backgroundColor: "#f39c12",
        color: "#333",
    },
    // Responsive Design
    "@media (max-width: 768px)": {
        goalOptions: {
            flexDirection: "column",
            gap: "15px",
        },
        goalBtn: {
            fontSize: "1rem",
            padding: "10px 25px",
        },
    }
};

export default GoalSelection;
