import os
import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from models.decision_tree_classification import decision_tree_classification
from models.decision_tree_regression import decision_tree_regression
from models.linear_regression import linear_regression
from models.logistic_regression import logistic_regression
from models.random_forest_classification import random_forest_classification
from models.random_forest_regression import random_forest_regression
from models.svm_classification import svm_classification
from models.svm_regression import svm_regression

app = Flask(__name__)
CORS(app)

# Uploads folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# check for allowed file type (only csv supported)
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv'}


# call the respective function for model training
def train_model(model_type, file_path, target_column, impute_strategy, params):
    model_mapping = {
        'linear_regression': linear_regression,
        'logistic_regression': logistic_regression,
        'decision_tree_classification': decision_tree_classification,
        'decision_tree_regression': decision_tree_regression,
        'svm_classification': svm_classification,
        'svm_regression': svm_regression,
        'random_forest_classification': random_forest_classification,
        'random_forest_regression': random_forest_regression,
    }

    return model_mapping[model_type](file_path, target_column, impute_strategy, **params)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/train', methods=['POST'])
def train_model_endpoint():
    try:
        if 'file' not in request.files:
            return jsonify({
                'status': 'error',
                'message': 'No file found'
            }), 400

        file = request.files['file']

        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({
                'status': 'error',
                'message': 'File type not allowed'
            }), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        model_type = request.form['model_type']
        target_column = request.form['target_column']
        impute_strategy = request.form['impute_strategy']
        params = {}

        if model_type == 'logistic_regression':
            params.update({
                'C': float(request.form['C']),
                'penalty': request.form['penalty'],
                'solver': request.form['solver'],
                'max_iter': int(request.form['max_iter']),
            })
        elif model_type == 'linear_regression':
            params.update({
                'fit_intercept': request.form['fit_intercept'],
                'copy_X': request.form['copy_X'],
            })
        elif model_type == 'decision_tree_classification':
            params.update({
                'criterion': request.form['criterion'],
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf'])
            })
        elif model_type == 'decision_tree_regression':
            params.update({
                'criterion': request.form['criterion'],
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf'])
            })
        elif model_type == 'svm_classification':
            params.update({
                'kernel': request.form['kernel'],
                'C': float(request.form['C']),
                'degree': int(request.form['degree']),
                'gamma': request.form['gamma'],
                'probability': request.form['probability'] == 'True',
            })
        elif model_type == 'svm_regression':
            params.update({
                'kernel': request.form['kernel'],
                'C': float(request.form['C']),
                'degree': int(request.form['degree']),
                'gamma': request.form['gamma'],
                'epsilon': float(request.form['epsilon']),
            })
        elif model_type == 'random_forest_classification':
            params.update({
                'n_estimators': int(request.form['n_estimators']),
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf']),
            })
        elif model_type == 'random_forest_regression':
            params.update({
                'n_estimators': int(request.form['n_estimators']),
                'max_depth': int(request.form['max_depth']),
                'min_samples_split': int(request.form['min_samples_split']),
                'min_samples_leaf': int(request.form['min_samples_leaf']),
            })
        else:
            return jsonify({
                'status': 'error',
                'message': 'Model type not supported'
            }), 400

        try:
            model, report = train_model(model_type, file_path, target_column, impute_strategy, params)
            model_filename = 'trained_model.pkl'
            joblib.dump(model, os.path.join(app.config['UPLOAD_FOLDER'], model_filename))
            return jsonify({
                'status': 'ok',
                'model': model_filename,
                'report': report
            }), 200

        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': 'Something went wrong while training the model'
                           'error: {}'.format(e)
            }), 500

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400


if __name__ == '__main__':
    app.run()
