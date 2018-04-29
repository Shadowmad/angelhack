import twitter
import requests
import json


api = twitter.Api(consumer_key = "VVd2vJBNXOzbc8CgttEjCHcil",
                  consumer_secret = "jERxFHuoUTxBqBFLQ1i0gZPZfv0IqlcIQOtrZ8ykwUtfnZ7j4I",
                  application_only_auth = True)

data = api.GetSearch(term = "#ah2018",
					include_entities = False,
					count = 100,
					result_type = "recent",
					return_json = True)


tweets = [{"language" : "en", "id": i, "text": tweet["text"]}  for (i, tweet) in enumerate(data["statuses"])]
#print(tweets)

text_recognition_api_url = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment"
headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'ac50b1b05f9a4bc680e843951d0ef474',
}
data = json.dumps({"documents": tweets})
response = requests.post(text_recognition_api_url, headers = headers, data = data)
if response.ok:
	data = response.json()
	scores = [sentiment["score"] for sentiment in data["documents"]]
with open("demo/storage/scores.json", "w") as file:
	json.dump(scores, file)
