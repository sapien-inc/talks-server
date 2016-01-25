import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor

popular = newspaper.popular_urls()
print(popular)
brands = []

# for url in popular:
# 	paper = newspaper.build(url, memoize_articles=False)
# 	brand = paper.brand
# 	database.hotSites.insert({"brand":brand, "url":url})



# print(hot)
# print(popular)