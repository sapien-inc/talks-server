import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor

urls = newspaper.popular_urls()[0:15]

articles = []

for url in urls:
	try:
		paper = newspaper.build(url, memoize_articles=False)
		for a in paper.articles[0:15]:
			article = Article(a.url, keep_article_html=True)
			article.source = url
			articles.append(article)
	except:
		print(url);
	



def scrapeArticle(article):
	try:
		article.download()
		article.parse()
		html = article.article_html
		mongoHash = {
			"source" : article.source,
			"url" : article.url,
			"authors": article.authors,
			"title": article.title,
			"html": html
			#"keywords": keywords
		}
		database.articles.insert(mongoHash)
	except:
		print('unexpected error')

for article in articles:
	scrapeArticle(article)


