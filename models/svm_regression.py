from sklearn.svm import SVR
from ..utils.data_preprocessing import load_and_preprocess_data
from ..utils.model_evaluation import evaluate_regression_model


def svm_regression_from_csv(file_path, target_column, impute_strategy='mean', kernel='linear',
                            C=1.0, degree=3, gamma='scale', epsilon=0.1):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    # Initialize and train the SVM Regressor model
    model = SVR(kernel=kernel, C=C, degree=degree, gamma=gamma, epsilon=epsilon)
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    evaluate_regression_model(y_test, y_pred)

    return model
