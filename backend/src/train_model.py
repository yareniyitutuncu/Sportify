import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import accuracy_score

# Eğitim ve test verilerini yükleme
train_file_path = "../data/train_data.csv"
test_file_path = "../data/test_data.csv"

train_df = pd.read_csv(train_file_path)
test_df = pd.read_csv(test_file_path)

# Özellikler ve hedef değişkenleri ayırma
feature_columns = ["FitnessLevel", "Goal", "TargetArea"]
target_columns = ["Exercise", "Sets", "Reps"]

X_train = train_df[feature_columns]
y_train = train_df[target_columns]

X_test = test_df[feature_columns]
y_test = test_df[target_columns]

# Model oluşturma ve eğitme
base_model = RandomForestClassifier(random_state=42)
model = MultiOutputClassifier(base_model)
model.fit(X_train, y_train)

# Modelin doğruluğunu değerlendirme
y_pred = model.predict(X_test)
accuracy = {}
for i, col in enumerate(target_columns):
    accuracy[col] = accuracy_score(y_test.iloc[:, i], y_pred[:, i])

print("Model doğruluk skorları:")
for col, acc in accuracy.items():
    print(f"{col}: {acc:.2f}")

# Modeli kaydetmek için gerekli klasörü oluşturma
model_file_path = "../models/exercise_model1.pkl"
os.makedirs(os.path.dirname(model_file_path), exist_ok=True)

# Modeli kaydetme
import pickle
with open(model_file_path, "wb") as model_file:
    pickle.dump(model, model_file)

print(f"Model '{model_file_path}' dosyasına kaydedildi.")