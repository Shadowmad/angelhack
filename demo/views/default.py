from flask import Flask
from demo import app

@app.route('/')
def hello_world():
    return 'Hello, World!'