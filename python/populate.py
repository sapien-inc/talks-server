import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')

database = client.meteor

cnn_paper = newspaper.build('http://cnn.com', memoize_articles=False)

articles = cnn_paper.articles[0:10]

def scrapeArticle(article):
	article.download()
	article.parse()
	mongoHash = {
		"url" : article.url,
		"authors": article.authors,
		"title": article.title
	}
	database.articles.insert(mongoHash)

for article in articles:
	scrapeArticle(article)


