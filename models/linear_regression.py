from sklearn.linear_model import LinearRegression

from util.evaluation import evaluate_regression_model
from util.preprocessing import load_and_preprocess_data


def linear_regression(file_path, target_column, impute_strategy='mean',
                      fit_intercept=True, copy_X=True):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    model = LinearRegression(fit_intercept=fit_intercept, copy_X=copy_X)

    # Train the model
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    report = evaluate_regression_model(y_test, y_pred)

    return model, report
