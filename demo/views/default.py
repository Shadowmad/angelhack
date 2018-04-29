from flask import Flask
from demo import app

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/home')
def home():
    return app.send_static_file('html/index.html')

@app.route('/static/<path:path>')
def static_file(path):
    return app.send_static_file(path)