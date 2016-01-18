import newspaper
from newspaper import Article
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
database = client.meteor


#print(articles);

def storeHTML(url):
	a = Article(url, keep_article_html = True)
	a.download()
	a.parse()
	html = a.article_html

	mongoHash = {
		"html" : html
	}

	database.current.remove({})
	database.current.insert(mongoHash)

# def scrapeArticle(article):
# 	url = article.url
# 	a = Article(url, keep_article_html = True)
# 	a.download()
# 	a.parse()
# 	mongoHash = {
# 		"url" : article.url,
# 		"authors": article.authors,
# 		"title": article.title
# 	}
# 	#database.articles.insert(mongoHash)

# for article in articles:
# 	scrapeArticle(article)

if __name__ == "__main__":
    import sys
    url = sys.argv[1]
    storeHTML(url)
