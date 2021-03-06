from flask import Flask, jsonify
from demo import app
from demo.scripts import mongo
import random
import json

@app.route('/')
def home():
	return app.send_static_file('html/index.html')

@app.route('/event/info')
def eventInfo():
	client = mongo.connectDb()
	print(client)
	emotions = client.demo.emotions
	result = emotions.aggregate(
		[
			{
				#`'anger': 0.0, 'contempt': 0.001, 'disgust': 0.0, 'fear': 0.0, 'happiness': 0.0, 'neutral': 0.997, 'sadness': 0.001, 'surprise': 0.0` (edited)
				"$group":
				{
					"_id": "$item",
					"Anger": { "$avg": "$anger" },
					# "Contempt": { "$avg": "$contempt" },
					# "Disgust": { "$avg": "$disgust" },
					"Fear": { "$avg": "$fear" },
					"Happiness": { "$avg": "$happiness" },
					# "Neutral": { "$avg": "$neutral" },
					"Sadness": { "$avg": "$sadness" },
					"Surprise": { "$avg": "$surprise" },
				}
			}
		]
	)
	client.close()
	result = list(result)
	if result:
		return jsonify(list(result)[0])
	else:
		return jsonify({'No data': 1})

@app.route('/event/infofake')
def eventInfoFake():
	fake = {
		"Anger": random.uniform(0.1, 0.3),
		"Contempt": random.uniform(0.1, 0.3),
		"Disgust": random.uniform(0.1, 0.3),
		"Fear": random.uniform(0.1, 0.3),
		"Happiness": random.uniform(0.1, 0.3),
		"Neutral": random.uniform(0.1, 0.3),
		"Sadness": random.uniform(0.1, 0.3),
		"Surprise": random.uniform(0.1, 0.3),
		"_id": "asd"
	}
	return jsonify(fake)

@app.route('/event/twitter')
def getTwitterData():
	with open("demo/storage/scores.json", "r") as file:
		data = json.load(file)

	if (data):
		average_score = sum(data) / len(data)
	if average_score:
		return jsonify({'twitter': int(average_score * 100)})
	else:
		return jsonify({'No data': 1})

@app.route('/static/<path:path>')
def static_file(path):
	return app.send_static_file(path)
