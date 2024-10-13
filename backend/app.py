from flask import Flask, request, render_template, redirect
from werkzeug.utils import secure_filename
import os
from models import logistic_regression_from_csv, linear_regression_from_csv, random_forest_classification_from_csv, \
    random_forest_regression_from_csv, decision_tree_classification_from_csv, decision_tree_regression_from_csv, \
    svm_classification_from_csv, svm_regression_from_csv

app = Flask(__name__)

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define the allowed file extensions
ALLOWED_EXTENSIONS = {'csv'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET', 'POST'])
def index():
    global model
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        # If user does not select file, browser also
        # submits an empty part without filename
        if file.filename == '':
            return redirect(request.url)
        if file and allowed_file(file.filename):
            # Get the uploaded file
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Get the model parameters
            model_type = request.form['model_type']
            target_column = request.form['target_column']

            # Get the hyperparameters
            if model_type == 'logistic_regression':
                C = float(request.form['C'])
                penalty = request.form['penalty']
                solver = request.form['solver']
                max_iter = int(request.form['max_iter'])
                model = logistic_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename), target_column,
                                                     C=C, penalty=penalty, solver=solver, max_iter=max_iter)
            elif model_type == 'linear_regression':
                model_type = request.form['model_type']
                fit_intercept = request.form['fit_intercept'] == 'True'
                copy_X = request.form['copy_X'] == 'True'
                if model_type == 'ridge':
                    alpha = float(request.form['alpha'])
                    model = linear_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                       target_column, model_type='ridge', alpha=alpha,
                                                       fit_intercept=fit_intercept, copy_X=copy_X)
                elif model_type == 'lasso':
                    alpha = float(request.form['alpha'])
                    selection = request.form['selection']
                    model = linear_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                       target_column, model_type='lasso', alpha=alpha,
                                                       fit_intercept=fit_intercept, copy_X=copy_X, selection=selection)
                else:
                    model = linear_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                       target_column, model_type='linear', fit_intercept=fit_intercept,
                                                       copy_X=copy_X)
            elif model_type == 'random_forest_classification':
                n_estimators = int(request.form['n_estimators'])
                max_depth = int(request.form['max_depth'])
                min_samples_split = int(request.form['min_samples_split'])
                min_samples_leaf = int(request.form['min_samples_leaf'])
                model = random_forest_classification_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                              target_column, n_estimators=n_estimators,
                                                              max_depth=max_depth, min_samples_split=min_samples_split,
                                                              min_samples_leaf=min_samples_leaf)
            elif model_type == 'random_forest_regression':
                n_estimators = int(request.form['n_estimators'])
                max_depth = int(request.form['max_depth'])
                min_samples_split = int(request.form['min_samples_split'])
                min_samples_leaf = int(request.form['min_samples_leaf'])
                model = random_forest_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                          target_column, n_estimators=n_estimators,
                                                          max_depth=max_depth, min_samples_split=min_samples_split,
                                                          min_samples_leaf=min_samples_leaf)
            elif model_type == 'decision_tree_classification':
                criterion = request.form['criterion']
                max_depth = int(request.form['max_depth'])
                min_samples_split = int(request.form['min_samples_split'])
                min_samples_leaf = int(request.form['min_samples_leaf'])
                model = decision_tree_classification_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                              target_column, criterion=criterion, max_depth=max_depth,
                                                              min_samples_split=min_samples_split,
                                                              min_samples_leaf=min_samples_leaf)
            elif model_type == 'decision_tree_regression':
                criterion = request.form['criterion']
                max_depth = int(request.form['max_depth'])
                min_samples_split = int(request.form['min_samples_split'])
                min_samples_leaf = int(request.form['min_samples_leaf'])
                model = decision_tree_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename),
                                                          target_column, criterion=criterion, max_depth=max_depth,
                                                          min_samples_split=min_samples_split,
                                                          min_samples_leaf=min_samples_leaf)
            elif model_type == 'svm_classification':
                kernel = request.form['kernel']
                model = svm_classification_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename), target_column,
                                                    kernel=kernel)
            elif model_type == 'svm_regression':
                kernel = request.form['kernel']
                model = svm_regression_from_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename), target_column,
                                                kernel=kernel)

            # Render the results template
            return render_template('results.html', model=model, model_type=model_type)

    # Render the index template
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
