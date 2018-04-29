from flask import Flask

app = Flask(__name__)

from demo.scripts.mongo import *

UPLOAD_FOLDER = 'demo/static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MONGO'] = connectDb()

import demo.views.images
import demo.views.default