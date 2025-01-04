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
        <div>
        <h2>Select Your Target Area</h2>
        {["Legs", "Abs", "Arms", "Back"].map((area) => (
            <button key={area} onClick={() => handleSelect(area)}>
            {area}
            </button>
        ))}
        </div>
    );
}

export default TargetArea;
