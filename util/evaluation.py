from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score


def evaluate_classification_model(y_test, y_pred):
    return classification_report(y_test, y_pred)


def evaluate_regression_model(y_test, y_pred):
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    regression_report = {
        'Mean Squared Error': mse, 
        'R^2 Score': r2
    }
    return regression_report
