import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor

cbs_paper = newspaper.build('http://cbs.com', memoize_articles=False)
article = cbs_paper.articles[10]
article.download()
article.parse()
print(article.text)

hot = newspaper.hot()
popular = newspaper.popular_urls()

# print(hot)
# print(popular)