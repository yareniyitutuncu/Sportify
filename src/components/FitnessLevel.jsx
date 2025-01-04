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
        <div>
        <h2>Select Your Fitness Level</h2>
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button key={level} onClick={() => handleSelect(level)}>
            {level}
            </button>
        ))}
        </div>
    );
}

export default FitnessLevel;
