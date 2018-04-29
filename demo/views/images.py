import os
import hashlib
from demo	import app
from flask import Flask, request, redirect, url_for, send_from_directory

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def get_extention(filename):
	return filename.rsplit('.', 1)[1].lower() 

def allowed_file(filename):
	return '.' in filename and get_extention(filename) in ALLOWED_EXTENSIONS

@app.route('/images/upload', methods=['POST', 'GET'])
def	uploadImage():
	if request.method == 'POST':
		for file in request.files.keys():
			print(file)
		if 'file' not in request.files:
			# flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			# flash('No selected file')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			hash = hashlib.md5(file.filename.encode())
			newName = str(hash.hexdigest()) + '.' + get_extention(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], newName))
			# file.save(file.filename)
			return 'Uploaded'
		return 'LOL'
	return send_from_directory('static', 'html/upload.html')