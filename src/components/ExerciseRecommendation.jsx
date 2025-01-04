import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs-core";
import "./ExerciseRecommendation.css";

// Açı Hesaplama Fonksiyonu (3 Nokta ile)
const calculateAngle = (A, B, C) => {
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) {
        angle = 360 - angle;
    }
    return angle;
};

function ExerciseRecommendation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { fitnessLevel, goal, targetArea } = location.state;
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState("");
    const [countdown, setCountdown] = useState(10); // Plank gibi hareketler için geri sayım
    const [countdownActive, setCountdownActive] = useState(false);
    const videoRef = useRef(null);
    const [cameraError, setCameraError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/predict", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ FitnessLevel: fitnessLevel, Goal: goal, TargetArea: targetArea }),
                });
                const data = await response.json();
                setExercises(data.predictions || []);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
    }, [fitnessLevel, goal, targetArea]);

    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults((results) => {
            if (results.poseLandmarks) {
                checkExerciseCompletion(results.poseLandmarks);
            }
        }
    );

        function checkExerciseCompletion(landmarks) {
            if (currentExerciseIndex >= exercises.length) return;
        
            const currentExercise = exercises[currentExerciseIndex].Exercise;
            let isExerciseCorrect = false;
            let errorMessage = "Hatalı Form! ❌";
            
            console.log(`📌 Doğrulama Başladı: ${currentExercise}`);
            console.log("📌 Tespit Edilen Landmark Noktaları:", landmarks);
        
            // **Squat Doğrulaması**
            if (currentExercise === "Squat") {
                const kneeAngle = calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
                const hipAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);
                
                if (kneeAngle >= 90 && kneeAngle <= 110 && hipAngle >= 80 && hipAngle <= 100) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Diz Açısı: ${kneeAngle.toFixed(2)}° (90° - 110°) | Kalça Açısı: ${hipAngle.toFixed(2)}° (80° - 100°)`;
                }
            }
        
            // **Push-Up Doğrulaması**
            if (currentExercise === "Push-Up") {
                const elbowAngle = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
                if (elbowAngle >= 90 && elbowAngle <= 120) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Dirsek Açısı: ${elbowAngle.toFixed(2)}° (90° - 120° olmalı)`;
                }
            }
        
            // **Plank Doğrulaması**
            if (currentExercise === "Plank") {
                const hipAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);
                if (hipAngle >= 170 && hipAngle <= 180) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Kalça Açısı: ${hipAngle.toFixed(2)}° (170° - 180° olmalı)`;
                }
            }
        
            // **Leg Raise (Bacak Kaldırma) Doğrulaması**
            if (currentExercise === "Leg Raise") {
                const hipAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);
                if (hipAngle >= 30 && hipAngle <= 90) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Kalça Açısı: ${hipAngle.toFixed(2)}° (30° - 90° olmalı)`;
                }
            }
        
            // **Side Lunge (Yan Lunge) Doğrulaması**
            if (currentExercise === "Side Lunge") {
                const kneeAngle = calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
                const hipAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);
        
                if (kneeAngle >= 90 && hipAngle >= 80 && hipAngle <= 100) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Diz Açısı: ${kneeAngle.toFixed(2)}° (90° olmalı) | Kalça Açısı: ${hipAngle.toFixed(2)}° (80° - 100° olmalı)`;
                }
            }
        
            // **Standing Toe Touch (Ayakta Parmak Ucu Dokunuşu) Doğrulaması**
            if (currentExercise === "Standing Toe Touch") {
                const hipAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);
                if (hipAngle >= 0 && hipAngle <= 90) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Kalça Açısı: ${hipAngle.toFixed(2)}° (0° - 90° olmalı)`;
                }
            }
        
            // **Triceps Dip Doğrulaması**
            if (currentExercise === "Triceps Dip") {
                const elbowAngle = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
                if (elbowAngle >= 90 && elbowAngle <= 120) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Dirsek Açısı: ${elbowAngle.toFixed(2)}° (90° - 120° olmalı)`;
                }
            }
        
            // **Shoulder Press (Omuz Press) Doğrulaması**
            if (currentExercise === "Shoulder Press") {
                const elbowAngle = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
                if (elbowAngle >= 90 && elbowAngle <= 180) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Dirsek Açısı: ${elbowAngle.toFixed(2)}° (90° - 180° olmalı)`;
                }
            }
        
            // **Calf Raise (Baldır Kaldırma) Doğrulaması**
            if (currentExercise === "Calf Raise") {
                const ankleAngle = calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
                if (ankleAngle >= 0 && ankleAngle <= 45) {
                    isExerciseCorrect = true;
                } else {
                    errorMessage = `Ayak Bileği Açısı: ${ankleAngle.toFixed(2)}° (0° - 45° olmalı)`;
                }
            }
        
            if (isExerciseCorrect) {
                setExerciseStatus("✅ Doğru Yapıldı!");
                if (currentExercise === "Plank" || currentExercise === "Side Plank") {
                    startCountdown(); // **Plank gibi egzersizler için zamanlayıcı başlatır**
                }
            } else {
                setExerciseStatus(errorMessage);
            }
        }
        

        function startCountdown() {
            setCountdownActive(true);
            let timer = 10;
            setCountdown(timer);
            const interval = setInterval(() => {
                timer -= 1;
                setCountdown(timer);
                if (timer <= 0) {
                    clearInterval(interval);
                    setCountdownActive(false);
                }
            }, 1000);
        }

        async function detectPose() {
            if (!videoRef.current) return;
            const video = videoRef.current;

            const camera = new cam.Camera(video, {
                onFrame: async () => {
                    await pose.send({ image: video });
                },
                width: 640,
                height: 480,
            });

            camera.start();
        }

        detectPose();
    }, [currentExerciseIndex]);

    const handleNextExercise = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
            setExerciseStatus("");
            setCountdownActive(false);
        } else {
            navigate("/completed");
        }
    };

    if (exercises.length === 0) {
        return <h2>Loading exercises...</h2>;
    }

    const currentExercise = exercises[currentExerciseIndex];

    return (
        <div className="exercise-container">
            <h2>Exercise {currentExerciseIndex + 1} / {exercises.length}</h2>
            <div className="exercise-info">
                <h3>{currentExercise.Exercise}</h3>
                <p><strong>Sets:</strong> {currentExercise.Sets}</p>
                <p><strong>Reps:</strong> {currentExercise.Reps}</p>
            </div>

            {/* Doğrulama Sonucu */}
            <p className={exerciseStatus.includes("Doğru") ? "correct" : "incorrect"}>
                {exerciseStatus}
            </p>

            {/* Plank için geri sayım */}
            {countdownActive && (
                <p className="countdown">Zaman: {countdown} saniye</p>
            )}

            <div className="exercise-display">
                <video ref={videoRef} autoPlay playsInline className="media-box"></video>
                <img src={currentExercise.Image} alt={currentExercise.Exercise} className="media-box" />
            </div>

            <button onClick={handleNextExercise} className="exercise-btn">
                Exercise Completed
            </button>
        </div>
    );
}

export default ExerciseRecommendation;
