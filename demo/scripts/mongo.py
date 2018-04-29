from pymongo import MongoClient
import time;

MONGO_URI = 'mongodb://localhost:27017/'

def save_emotion(conn, data, event='default'):
	db = conn.demo
	coll = db.emotions
	for el in data:
		el['tiemstamp'] =  time.time()*1000.0
	result = coll.insert_many(data)

def connectDb():
	client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10)
	try:
		client.server_info()
	except:
		print("Can't connect to db")
		return
	print("Connected to db on URI: %s", MONGO_URI)
	return client