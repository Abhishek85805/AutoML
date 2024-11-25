from sklearn.linear_model import LogisticRegression

from util.evaluation import evaluate_classification_model
from util.preprocessing import load_and_preprocess_data


def logistic_regression(file_path, target_column, impute_strategy, C=1.0, penalty='l2', solver='lbfgs', max_iter=100):

    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    model = LogisticRegression(C=C, penalty=penalty, solver=solver, max_iter=max_iter)
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    report = evaluate_classification_model(y_test, y_pred)

    return model, report
