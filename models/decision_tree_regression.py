from sklearn.tree import DecisionTreeRegressor

from util.evaluation import evaluate_regression_model
from util.preprocessing import load_and_preprocess_data


def decision_tree_regression(file_path, target_column, impute_strategy='mean', criterion='mse',
                             max_depth=None, min_samples_split=2, min_samples_leaf=1):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    # Initialize and train the Decision Tree Regressor model
    model = DecisionTreeRegressor(criterion=criterion, max_depth=max_depth,
                                  min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf)

    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    report = evaluate_regression_model(y_test, y_pred)

    return model, report
