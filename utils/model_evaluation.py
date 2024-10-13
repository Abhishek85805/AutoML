from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score


def evaluate_classification_model(y_test, y_pred):
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Classification Report:")
    print(classification_report(y_test, y_pred))


def evaluate_regression_model(y_test, y_pred):
    print("Mean Squared Error (MSE):", mean_squared_error(y_test, y_pred))
    print("R^2 Score:", r2_score(y_test, y_pred))
