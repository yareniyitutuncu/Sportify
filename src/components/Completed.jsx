import { useNavigate } from "react-router-dom";

function Completed() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Congratulations! 🎉</h2>
            <p>You have completed all exercises for today.</p>
            <button onClick={() => navigate("/home")} className="exercise-btn">
                Go Back to Home
            </button>
        </div>
    );
}

export default Completed;
