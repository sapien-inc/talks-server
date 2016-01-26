import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor

popular = newspaper.popular_urls()

hot = ['bieber','isis','trump','cruz','blizzard','hilary','patriots','snow', 'election','bowie']

brands = []

for hot_topic in hot:
	database.trending.insert({'topic':hot_topic})

for url in popular[0:10]:
	paper = newspaper.build(url, memoize_articles=False)
	brand = paper.brand
	database.hotSites.insert({"brand":brand, "url":url})



# print(hot)
# print(popular)