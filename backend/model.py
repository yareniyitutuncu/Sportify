import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
import random

# Modeli yükle
model_file_path = "models/exercise_model1.pkl"
data_file_path = "data/Fitness_Exercise_Data.csv"

with open(model_file_path, "rb") as model_file:
    model = pickle.load(model_file)

# Etiket kodlayıcıları hazırla
df = pd.read_csv(data_file_path)
categorical_columns = ["FitnessLevel", "Goal", "TargetArea", "Exercise"]

label_encoders = {}
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

fitness_level_config = {
    "Beginner": {"sets": (1, 3), "reps": (5, 10)},
    "Intermediate": {"sets": (3, 4), "reps": (7, 12)},
    "Advanced": {"sets": (4, 5), "reps": (10, 15)},
}

def predict_exercises(user_input):
    # Kullanıcı girdilerini dönüştür
    encoded_input = [
        label_encoders["FitnessLevel"].transform([user_input["FitnessLevel"]])[0],
        label_encoders["Goal"].transform([user_input["Goal"]])[0],
        label_encoders["TargetArea"].transform([user_input["TargetArea"]])[0]
    ]

    # Tahmin yap
    encoded_input_df = pd.DataFrame([encoded_input], columns=["FitnessLevel", "Goal", "TargetArea"])
    exercise_proba = model.estimators_[0].predict_proba(encoded_input_df)

    # En iyi 4 egzersizi belirle
    top_4_indices = exercise_proba[0].argsort()[-4:][::-1]
    top_4_results = []
    for exercise_encoded in top_4_indices:
        exercise_name = label_encoders["Exercise"].inverse_transform([exercise_encoded])[0]
        selected_config = fitness_level_config[user_input["FitnessLevel"]]
        sets = 1 if exercise_name.lower() == "plank" else random.randint(*selected_config["sets"])
        reps = 1 if exercise_name.lower() == "plank" else random.randint(*selected_config["reps"])
        top_4_results.append({"Exercise": exercise_name, "Sets": sets, "Reps": reps})

    return top_4_results
