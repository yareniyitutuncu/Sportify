import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
import random

# Model ve etiket kodlayıcıları yükleme
model_file_path = "../models/exercise_model1.pkl"
data_file_path = "../data/Fitness_Exercise_Data.csv"
with open(model_file_path, "rb") as model_file:
    model = pickle.load(model_file)

# Veri kümesinden etiket kodlayıcıları hazırlama
df = pd.read_csv(data_file_path)
categorical_columns = ["FitnessLevel", "Goal", "TargetArea", "Exercise"]

label_encoders = {}
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Fitness Level'a göre set ve tekrar sayısını ayarlamak için yapılandırma
fitness_level_config = {
    "Beginner": {"sets": (1, 3), "reps": (5, 10)},       # Yeni başlayanlar için set ve tekrar aralıkları
    "Intermediate": {"sets": (3, 4), "reps": (7, 12)},  # Orta düzey için set ve tekrar aralıkları
    "Advanced": {"sets": (4, 5), "reps": (10, 15)}       # İleri düzey için set ve tekrar aralıkları
}

# Kullanıcı girdilerini alıyoruz
user_input = {
    "FitnessLevel": input("Fitness Level (Beginner, Intermediate, Advanced): ").strip().capitalize(),
    "Goal": input("Goal (Strength Building, Flexibility Enhancement, etc.): ").strip().title(),
    "TargetArea": input("Target Area (Arms, Legs, Back, etc.): ").strip().capitalize()
}

# Kullanıcı Fitness Level doğrulama
if user_input["FitnessLevel"] not in fitness_level_config:
    print("Hata: Geçersiz Fitness Level girdiniz.")
    exit()

# Fitness Level'a uygun yapılandırmayı alıyoruz
selected_config = fitness_level_config[user_input["FitnessLevel"]]

# Kullanıcı girdilerini sayısal değerlere dönüştürme
try:
    encoded_input = [
        label_encoders["FitnessLevel"].transform([user_input["FitnessLevel"]])[0],
        label_encoders["Goal"].transform([user_input["Goal"]])[0],
        label_encoders["TargetArea"].transform([user_input["TargetArea"]])[0]
    ]
except ValueError as e:
    print("Hata: Geçersiz giriş yaptınız. Lütfen aşağıdaki seçeneklerden birini girin:")
    print("FitnessLevel:", list(label_encoders["FitnessLevel"].classes_))
    print("Goal:", list(label_encoders["Goal"].classes_))
    print("TargetArea:", list(label_encoders["TargetArea"].classes_))
    exit()

# Sütun isimleriyle tahmin verisini oluşturma
encoded_input_df = pd.DataFrame([encoded_input], columns=["FitnessLevel", "Goal", "TargetArea"])

# Egzersiz olasılıklarını alma
exercise_proba = model.estimators_[0].predict_proba(encoded_input_df)

# Olasılık skorlarına göre en iyi 4 egzersizi sıralama
top_4_indices = exercise_proba[0].argsort()[-4:][::-1]

# En iyi 4 egzersiz için sonuçları saklamak
top_4_results = []
for exercise_encoded in top_4_indices:
    # Egzersiz adını alıyoruz
    exercise_name = label_encoders["Exercise"].inverse_transform([exercise_encoded])[0]

    # Plank için özel değerler atıyoruz
    if exercise_name.lower() == "plank":
        sets = 1  # Plank için özel set sayısı
        reps = 1  # Plank için süreyi tekrarlar olarak alıyoruz (örneğin, saniye cinsinden)

    else:
        # Fitness Level'a göre rastgele set ve tekrar sayısı oluşturuyoruz
        sets = random.randint(*selected_config["sets"])
        reps = random.randint(*selected_config["reps"])

    # Sonuçları ekliyoruz
    top_4_results.append({
        "Exercise": exercise_name,
        "Sets": sets,
        "Reps": reps
    })
# Önerileri yazdırma
print("\nEn Uygun 4 Egzersiz:")
for i, result in enumerate(top_4_results, 1):
    print(f"{i}. Egzersiz: {result['Exercise']}, Setler: {result['Sets']}, Tekrarlar: {result['Reps']}")
