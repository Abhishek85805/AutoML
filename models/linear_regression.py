from sklearn.linear_model import LinearRegression, Ridge, Lasso, LassoCV
from ..utils.data_preprocessing import load_and_preprocess_data
from ..utils.model_evaluation import evaluate_regression_model


def linear_regression_from_csv(file_path, target_column, impute_strategy='mean', model_type='linear',
                               fit_intercept=True, copy_X=True, alpha=1.0, selection='cyclic', cv=None):
    X_train, X_test, y_train, y_test = load_and_preprocess_data(file_path, target_column, impute_strategy)

    # Initialize the model based on user choice
    if model_type == 'linear':
        model = LinearRegression(fit_intercept=fit_intercept, copy_X=copy_X)
    elif model_type == 'ridge':
        model = Ridge(alpha=alpha, fit_intercept=fit_intercept, copy_X=copy_X)
    elif model_type == 'lasso':
        if cv is not None:
            model = LassoCV(alphas=[alpha], fit_intercept=fit_intercept, copy_X=copy_X, cv=cv, selection=selection)
        else:
            model = Lasso(alpha=alpha, fit_intercept=fit_intercept, copy_X=copy_X, selection=selection)
    else:
        raise ValueError(f"Invalid model_type '{model_type}'. Choose 'linear', 'ridge', or 'lasso'.")

    # Train the model
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the model
    evaluate_regression_model(y_test, y_pred)

    return model
