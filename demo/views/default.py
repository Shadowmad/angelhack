from flask import Flask, jsonify
from demo import app
from demo.scripts import mongo

@app.route('/')
def home():
	return app.send_static_file('html/index.html')

@app.route('/event/info')
def eventInfo():
	client = mongo.connectDb()
	emotions = client.demo.emotions
	result = emotions.aggregate(
		[
			{
				#`'anger': 0.0, 'contempt': 0.001, 'disgust': 0.0, 'fear': 0.0, 'happiness': 0.0, 'neutral': 0.997, 'sadness': 0.001, 'surprise': 0.0` (edited)
				"$group":
				{
					"_id": "$item",
					"Anger": { "$avg": "$anger" },
					"Contempt": { "$avg": "$contempt" },
					"Disgust": { "$avg": "$disgust" },
					"Fear": { "$avg": "$fear" },
					"Happiness": { "$avg": "$happiness" },
					"Neutral": { "$avg": "$neutral" },
					"Sadness": { "$avg": "$sadness" },
					"Surprise": { "$avg": "$surprise" },
				}
			}
		]
	)
	client.close()
	return jsonify(list(result)[0])

@app.route('/static/<path:path>')
def static_file(path):
	return app.send_static_file(path)