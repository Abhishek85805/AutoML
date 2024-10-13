from sklearn.linear_model import LogisticRegression
from ..utils.data_preprocessing import load_and_preprocess_data
from ..utils.model_evaluation import evaluate_classification_model


def logistic_regression_from_csv(file_path, target_column, impute_strategy='mean', C=1.0, penalty='l2', solver='lbfgs',
                                 max_iter=100, class_weight=None, intercept_scaling=1, dual=False):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    # Initialize and train the Logistic Regression model with hyperparameters
    model = LogisticRegression(C=C, penalty=penalty, solver=solver, max_iter=max_iter, class_weight=class_weight,
                               intercept_scaling=intercept_scaling, dual=dual)
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    evaluate_classification_model(y_test, y_pred)

    return model
