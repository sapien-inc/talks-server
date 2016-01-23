import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor

popular = newspaper.popular_urls()[0:5]
hot = newspaper.hot();
brands = []

for url in popular:
	paper = newspaper.build(url, memoize_articles=False)
	brand = paper.brand
	brands.append(brand)

print(brands)

# print(hot)
# print(popular)