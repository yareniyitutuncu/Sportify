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
        <div>
        <h2>Select Your Goal</h2>
        {["Strength Building", "Muscle Gain", "Flexibility Enhancement", "Endurance Improvement"].map((goal) => (
            <button key={goal} onClick={() => handleSelect(goal)}>
            {goal}
            </button>
        ))}
        </div>
    );
    }

export default GoalSelection;
