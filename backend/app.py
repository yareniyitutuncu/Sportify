from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from model import predict_exercises

app = Flask(__name__)
CORS(app)

# Görsellerin saklandığı klasör
IMAGE_FOLDER = os.path.join(os.getcwd(), "images")

# Egzersizlere karşılık gelen .webp uzantılı görseller
exercise_images = {
    "Squat": "squat.webp",
    "Push-Up": "push_up.webp",
    "Plank": "plank.webp",
    "Bridge": "bridge.webp",
    "Side Plank": "side_plank.webp",
    "Arm Raise": "arm_raise.webp",
    "Leg Raise": "leg_raise.webp",
    "Side Lunge": "side_lunge.webp",
    "Standing Toe Touch": "standing_toe_touch.webp",
    "Deadlift": "deadlift.webp",
    "Triceps Dip": "triceps_dip.webp",
    "Shoulder Press": "shoulder_press.webp",
    "Calf Raise": "calf_raise.webp",
}

@app.route('/api/predict', methods=['POST'])
def predict_route():
    try:
        user_input = request.json
        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        results = predict_exercises(user_input)

        # Tahmin edilen her egzersiz için .webp uzantılı görsel URL'sini ekleyelim
        for exercise in results:
            exercise_name = exercise["Exercise"]
            image_filename = exercise_images.get(exercise_name, "default.webp")
            exercise["Image"] = f"http://127.0.0.1:5000/api/exercise_images/{image_filename}"

        print("Prediction results:", results)  # Tahmin sonuçlarını kontrol edin

        return jsonify({"predictions": results})
    except Exception as e:
        print("Error:", str(e))  # Hata mesajını yazdırın
        return jsonify({"error": str(e)}), 500

# Görselleri frontend'e servis eden endpoint
@app.route('/api/exercise_images/<filename>')
def get_exercise_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
