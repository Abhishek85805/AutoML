from sklearn.ensemble import RandomForestClassifier
from ..utils.data_preprocessing import load_and_preprocess_data
from ..utils.model_evaluation import evaluate_classification_model


def random_forest_classification_from_csv(file_path, target_column, impute_strategy='mean', n_estimators=100,
                                          max_depth=None, min_samples_split=2, min_samples_leaf=1, random_state=42):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    # Initialize and train the Random Forest Classifier model
    model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth,
                                   min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf,
                                   random_state=random_state)
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    evaluate_classification_model(y_test, y_pred)

    return model
