import pandas as pd
import random

# Veriyi yükleme
file_path = "../data/exercise_data.csv"
df = pd.read_csv(file_path)

# Sentetik veri üretme fonksiyonu
def generate_synthetic_data(num_samples):
    fitness_levels = ["Beginner", "Intermediate", "Advanced"]
    goals = ["Strength Building", "Muscle Gain", "Flexibility Enhancement", "Endurance Improvement"]
    target_areas = ["Legs", "Abs", "Arms", "Back"]
    exercises = ["Squat Push-Up", "Plank", "Bridge", "Side Plank", "Arm Raise", "Leg Raise", "Side Lunge", "Standing Toe Touch", "Deadlift", "Triceps Dip", "Shoulder Press", "Calf Raise"]

    synthetic_data = []
    for _ in range(num_samples):
        synthetic_data.append({
            "FitnessLevel": random.choice(fitness_levels),
            "Goal": random.choice(goals),
            "TargetArea": random.choice(target_areas),
            "Exercise": random.choice(exercises),
            "Sets": random.randint(2, 5),
            "Reps": random.randint(10, 20),
        })
    return synthetic_data

# 50 sentetik veri oluştur ve ekle
synthetic_data = generate_synthetic_data(150)
synthetic_df = pd.DataFrame(synthetic_data)

# Veriyi güncelleme
df = pd.concat([df, synthetic_df], ignore_index=True)

# Güncellenmiş veri setini kaydetme
updated_file_path = "../data/exercise_data_updated.csv"
df.to_csv(updated_file_path, index=False)
print(f"Sentetik veri ile güncellenmiş veri seti '{updated_file_path}' olarak kaydedildi.")
