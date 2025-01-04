import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Veriyi yükleme
data_file_path = "../data/Fitness_Exercise_Data.csv"
df = pd.read_csv(data_file_path)

# Kategorik sütunları belirleme
categorical_columns = ["FitnessLevel", "Goal", "TargetArea", "Exercise"]

# Kategorik sütunları sayısal değerlere dönüştürme
label_encoders = {}
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Eğitim ve test setlerine ayırma
feature_columns = ["FitnessLevel", "Goal", "TargetArea"]
target_columns = ["Exercise", "Sets", "Reps"]

X = df[feature_columns]
y = df[target_columns]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Eğitim ve test verilerini birleştirip dosya olarak kaydetme
train_df = pd.concat([X_train, y_train], axis=1)
test_df = pd.concat([X_test, y_test], axis=1)

train_file_path = "../data/train_data.csv"
test_file_path = "../data/test_data.csv"

train_df.to_csv(train_file_path, index=False)
test_df.to_csv(test_file_path, index=False)

print(f"Eğitim verileri '{train_file_path}' dosyasına kaydedildi.")
print(f"Test verileri '{test_file_path}' dosyasına kaydedildi.")
