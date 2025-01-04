from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import pandas as pd
import pickle 

# Verileri yükleme
train_file_path = "../data/train_data.csv"
train_df = pd.read_csv(train_file_path)

# Özellikler ve hedef değişkenleri ayırma
X_train = train_df[["FitnessLevel", "Goal", "TargetArea"]]
y_train = train_df[["Exercise", "Sets", "Reps"]]

# Hiperparametre arama
param_grid = {
    "estimator__n_estimators": [100, 200, 300],
    "estimator__max_depth": [10, 20, None],
    "estimator__min_samples_split": [2, 5, 10],
}

base_model = RandomForestClassifier(random_state=42)
model = MultiOutputClassifier(base_model)
grid_search = GridSearchCV(model, param_grid, scoring="accuracy", cv=3)

# Modeli eğitme
grid_search.fit(X_train, y_train)
print("En iyi parametreler:", grid_search.best_params_)

# Optimize edilmiş modeli kaydetme
optimized_model = grid_search.best_estimator_
model_file_path = "../models/exercise_model.pkl"
with open(model_file_path, "wb") as model_file:
    pickle.dump(optimized_model, model_file)

print(f"Optimize edilmiş model '{model_file_path}' dosyasına kaydedildi.")
