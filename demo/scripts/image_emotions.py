# import pymongo
import requests
import os
import time

images_dir = "images/"
url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion'
headers = {
	'Content-Type': 'application/octet-stream',
	'Ocp-Apim-Subscription-Key':'e58d8c595daf4cdc949d411007e8d43f'
}
emotions = []
for image in os.listdir(images_dir):
	print(images_dir + image)
	with open(images_dir + image, 'rb') as file:
		data = file.read()
		os.remove(images_dir + image)
	response = requests.post(url, headers = headers, data = data)
	emotion = response.json()[0]["faceAttributes"]["emotion"]
	emotion["timestamp"] = image[6:-4]
	emotions.append(emotion)
	print(emotion)
	time.sleep(3)