from pymongo import MongoClient

MONGO_URI = 'mongodb://localhost:27017/'

def save_emotion(conn, data, event='default'):
	db = conn.demo
	coll = db.emotions
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