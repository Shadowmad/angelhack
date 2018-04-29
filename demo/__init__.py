from flask import Flask

app = Flask(__name__)

UPLOAD_FOLDER = 'demo/static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

import demo.views.images
import demo.views.default