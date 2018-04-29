# import pymongo
import requests
import os

dir = '/nfs/2017/m/maghayev/cadet/angelhack/demo/static/images/'
listdir = os.listdir(dir)
url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion'
headers = {
	'Content-Type': 'application/octet-stream',
	'Ocp-Apim-Subscription-Key':'e58d8c595daf4cdc949d411007e8d43f'
}
for value in range (0, len(listdir)):
	print(dir + listdir[value])
	data = open(dir + listdir[value], 'rb').read()
	request = requests.post(url, headers=headers, data=data)
	print request.json()[value][faceAttributes]
