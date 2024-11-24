import sys

from flask import Flask, request, jsonify, send_file
import pickle
import time
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

print("Importing model functions")
from model_files import linear_regression_from_csv, logistic_regression_from_csv, random_forest_classification_from_csv, \
    random_forest_regression_from_csv, decision_tree_classification_from_csv, decision_tree_regression_from_csv, \
    svm_classification_from_csv, svm_regression_from_csv

app = Flask(__name__)
CORS(app)

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Define the allowed file extensions
ALLOWED_EXTENSIONS = {'csv'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def train_model(model_type, file_path, target_column, params):
    model_mapping = {
        'logistic_regression': logistic_regression_from_csv,
        'linear_regression': linear_regression_from_csv,
        'random_forest_classification': random_forest_classification_from_csv,
        'random_forest_regression': random_forest_regression_from_csv,
        'decision_tree_classification': decision_tree_classification_from_csv,
        'decision_tree_regression': decision_tree_regression_from_csv,
        'svm_classification': svm_classification_from_csv,
        'svm_regression': svm_regression_from_csv,
    }

    if model_type not in model_mapping:
        raise ValueError(f"Model type {model_type} is not supported.")

    return model_mapping[model_type](file_path, target_column, **params)


@app.route('/train', methods=['POST'])
def train_model_endpoint():
    try:
        if 'file' not in request.files:
            return jsonify({
                'status': 'error',
                'message': 'No file uploaded'
            }), 400

        file = request.files['file']

        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({
                'status': 'error',
                'message': 'Invalid file type'
            }), 400

        # save uploaded file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # extract model details
        model_type = request.form['model_type']
        target_column = request.form['target_column']

        # Collect model parameters
        params = {}

        # Add parameters based on model type
        if model_type == 'logistic_regression':
            params = {
                'C': float(request.form['C']),
                'penalty': request.form['penalty'],
                'solver': request.form['solver'],
                'max_iter': int(request.form['max_iter']),
            }
        elif model_type == 'random_forest_classification':
            params = {
                'n_estimators': int(request.form['n_estimators']),
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf']),
            }
        elif model_type == 'random_forest_regression':
            params = {
                'n_estimators': int(request.form['n_estimators']),
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf']),

            }

        elif model_type == 'decision_tree_classification':
            params = {
                'criterion': request.form['criterion'],
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf'])
            }

        elif model_type == 'decision_tree_regression':
            params = {
                'criterion': request.form['criterion'],
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf'])
            }

        elif model_type == 'svm_classification':
            params = {
                'kernel': request.form['kernel'],
                'C': float(request.form['C']),
                'degree': int(request.form['degree']),
                'gamma': request.form['gamma'],
                'probability': request.form['probability'] == 'True',
            }

        elif model_type == 'svm_regression':
            params = {
                'kernel': request.form['kernel'],
                'C': float(request.form['C']),
                'degree': int(request.form['degree']),
                'gamma': request.form['gamma'],
                'epsilon': float(request.form['epsilon']),
            }
            #             elif model_type == 'linear_regression':
        #                 model_type = request.form['model_type']
        #                 fit_intercept = request.form['fit_intercept'] == 'True'
        #                 copy_X = request.form['copy_X'] == 'True'
        #                 if model_type == 'ridge':
        #                     alpha = float(request.form['alpha'])
        #                     model = linear_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
        #                                                        target_column, model_type='ridge', alpha=alpha,
        #                                                        fit_intercept=fit_intercept, copy_X=copy_X)
        #                 elif model_type == 'lasso':
        #                     alpha = float(request.form['alpha'])
        #                     selection = request.form['selection']
        #                     model = linear_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
        #                                                        target_column, model_type='lasso', alpha=alpha,
        #                                                        fit_intercept=fit_intercept, copy_X=copy_X, selection=selection)
        #                 else:
        #                     model = linear_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
        #                                                        target_column, model_type='linear', fit_intercept=fit_intercept,
        #                                                        copy_X=copy_X)
        else:
            return jsonify({
                'status': 'error',
                'message': 'Model type is not supported.'
            }), 400

        try:
            model = train_model(model_type, file_path, target_column, params)
            model_filename = f"{model_type}_{target_column}_{int(time.time())}.pkl"
            model_save_path = os.path.join(app.config['UPLOAD_FOLDER'], model_filename)

            # save the model
            with open(model_save_path, 'wb') as f:
                pickle.dump(model, f)

            response_data = {
                'status': 'success',
                'model_filename': model_filename,
                'model_type': model_type,
                'target_column': target_column,
            }

            return send_file(
                model_save_path,
                mimetype='application/octet-stream',
                as_attachment=True,
                download_name=model_filename
            )
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400


if __name__ == '__main__':
    app.run(debug=True)
