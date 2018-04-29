# import pymongo
import requests
import os
import time
import mongo

images_dir = "../storage/images/"
url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion'
headers = {
	'Content-Type': 'application/octet-stream',
	'Ocp-Apim-Subscription-Key':'e58d8c595daf4cdc949d411007e8d43f'
}

while True:
	emotions = []
	for image in os.listdir(images_dir):
		print(images_dir + image)
		with open(images_dir + image, 'rb') as file:
			data = file.read()
			os.remove(images_dir + image)
		response = requests.post(url, headers = headers, data = data)
		if response.ok:
			faces = response.json()
			for face in faces:
				face = face["faceAttributes"]["emotion"]
				face["timestamp"] = image[6:-4]
				emotions.append(face)
				print(face)
		time.sleep(3)

	if emotions:
		conn = mongo.connectDb()
		mongo.save_emotion(conn, data = emotions)
		conn.close()
	time.sleep(10)