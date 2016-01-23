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

urls = newspaper.popular_urls()[0:15]

articles = []

for url in urls:
	try:
		paper = newspaper.build(url)
		for a in paper.articles[0:15]:
			article = Article(a.url, keep_article_html=True)
			article.source = url
			articles.append(article)
	except:
		print(url);

def sumy(article):
	try:
		parser = HtmlParser.from_url(article.url, Tokenizer(LANGUAGE))
		stemmer = Stemmer(LANGUAGE)
		summarizer = Summarizer(stemmer)
		summarizer.stop_words = get_stop_words(LANGUAGE)
		returnString = ""
		for sentence in summarizer(parser.document, SENTENCES_COUNT):
			sentenceString = str(sentence);
			returnString += " ";
			returnString += (sentenceString);
		return returnString
	except:
		return "No summary available for this article."
	
def badArticle(article):
	html = article.html
	title = article.title
	return html == "" or title == "" or title == "Error" or title == "404 Not Found"

def scrapeArticle(article):
	try:
		article.download()
		article.parse()
		if badArticle(article):
			print("error")
			pass
		summary = sumy(article)
		mongoHash = {
			"source" : article.source,
			"url" : article.url,
			"authors": article.authors,
			"title": article.title,
			"html": article.article_html,
			"summary": summary
		}
		database.articles.insert(mongoHash)
	except:
		print('unexpected error')

for article in articles:
	scrapeArticle(article)


