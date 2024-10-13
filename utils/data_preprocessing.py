import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer


def load_and_preprocess_data(file_path, target_column, impute_strategy='mean'):
    # Load the CSV file
    data = pd.read_csv(file_path)

    # Check if the target column exists in the dataframe
    if target_column not in data.columns:
        raise ValueError(f"Target column '{target_column}' not found in the dataset.")

    # Separate features and target
    X = data.drop(columns=[target_column])
    y = data[target_column]

    # Encode categorical features if needed
    X = pd.get_dummies(X, drop_first=True)

    # Encode the target variable if it's categorical
    if y.dtype == 'object':
        le = LabelEncoder()
        y = le.fit_transform(y)

    # Handle missing values in the feature set
    imputer = SimpleImputer(strategy=impute_strategy)
    X = imputer.fit_transform(X)

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Standardize the features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test
