import newspaper
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')

database = client.meteor

cnn_paper = newspaper.build('http://cnn.com', memoize_articles=False)

first = cnn_paper.articles[0]
second = cnn_paper.articles[1]
third = cnn_paper.articles[2]


def scrapeArticle(article):
	article.download()
	article.parse()

	mongoHash = {
		"authors": article.authors,
		"content": article.text,
		"title": article.title
	}

	database.articles.insert(mongoHash)

scrapeArticle(first)
scrapeArticle(second)
scrapeArticle(third)


