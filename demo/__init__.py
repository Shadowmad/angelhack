from flask import Flask

app = Flask(__name__)

UPLOAD_FOLDER = '/static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

import demo.views.images
import demo.views.default