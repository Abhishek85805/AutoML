from sklearn.svm import SVC
from ..utils.data_preprocessing import load_and_preprocess_data
from ..utils.model_evaluation import evaluate_classification_model


def svm_classification_from_csv(file_path, target_column, impute_strategy='mean', kernel='linear',
                                C=1.0, degree=3, gamma='scale', probability=False, random_state=42):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    # Initialize and train the SVM Classifier model
    model = SVC(kernel=kernel, C=C, degree=degree, gamma=gamma, probability=probability, random_state=random_state)
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    evaluate_classification_model(y_test, y_pred)

    return model
