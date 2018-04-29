from pymongo import MongoClient
from demo import app

MONGO_URI = 'mongodb://localhost:27017/'

def test_connection(client):
	db = client.test_db
	coll = db.test_coll
	id = coll.insert_one({"Asd": "asd"}).inserted_id
	app.logger.info(id)
	app.logger.info(coll.find_one())

def connectDb():
	client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10)
	try:
		client.server_info()
	except:
		app.logger.error("Can't connect to db")
		return
	app.logger.info("Connected to db on URI: %s", MONGO_URI)
	return client