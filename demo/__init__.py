from flask import Flask

app = Flask(__name__)

from demo.scripts.mongo import *

UPLOAD_FOLDER = 'demo/storage/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# app.config['MONGO'] = connectDb()

import demo.scripts.twitter_scraper
import demo.views.images
import demo.views.default