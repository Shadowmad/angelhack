# import pymongo
import requests
import os
import time
import mongo

images_dir = "../storage/images/"
face_recognition_api_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion'
headers = {
	'Content-Type': 'application/octet-stream',
	'Ocp-Apim-Subscription-Key':'82654e4421ec4270baedb5ecdbfd5c5e'
}

conn = mongo.connectDb()
while True:
	for image in os.listdir(images_dir):
		emotions = []
		print(images_dir + image)
		with open(images_dir + image, 'rb') as file:
			data = file.read()
			os.remove(images_dir + image)
		response = requests.post(face_recognition_api_url, headers = headers, data = data)
		if response.ok:
			faces = response.json()
			for face in faces:
				face = face["faceAttributes"]["emotion"]
				face["timestamp"] = image[6:-4]
				emotions.append(face)
				print(face)
			if emotions:
				mongo.save_emotion(conn, data = emotions)
	time.sleep(1)

conn.close()