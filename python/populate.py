from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

import newspaper
from newspaper import Article
from pymongo import MongoClient

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words


LANGUAGE = "english"
SENTENCES_COUNT = 3

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor

urls = newspaper.popular_urls()[0:30]

articles = []

for url in urls:
	try:
		paper = newspaper.build(url)
		for a in paper.articles[0:30]:
			article = Article(a.url, keep_article_html=True)
			article.source = paper.brand
			articles.append(article)
	except:
		print(url);
	
def badArticle(article):
	html = article.html
	title = article.title
	return len(html) < 500 or title == "" or title == "Error" or title == "404 Not Found"

def scrapeArticle(article):
	try:
		article.download()
		article.parse()
		article.nlp()
		summary = article.summary
		keywords = article.keywords
		if not badArticle(article):
			mongoHash = {
				"source" : article.source,
				"url" : article.url,
				"authors": article.authors,
				"title": article.title,
				"html": article.article_html,
				"summary": summary,
				"keywords": keywords
			}
			database.articles.insert(mongoHash)
	except:
		print('unexpected error')

for article in articles:
	scrapeArticle(article)


