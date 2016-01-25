Articles = new Mongo.Collection('articles');

getArticlesByAuthors = function(authors){
    var matches = [];
    authors.forEach(function (author) {
        var authorMatches = Articles.find({authors: author}).fetch();
        authorMatches.forEach(function (article) {
            matches.push(article)
        });
    });
    return cleanDuplicates(matches);
};

getArticlesBySource = function(source){
    //var regex = "(.?)" + source + "(.?)";
    //var options = "ims";
    //var sourceMatches = Articles.find({source: {$regex: regex, $options: options}}).fetch();
    var sourceMatches = Articles.find({source:source}).fetch();
    return cleanDuplicates(sourceMatches);
};

getArticlesByKeywords = function (keywords) {
    var matches = [];
    keywords.forEach(function (keyword) {
        var regex = "(.?)" + keyword + "(.?)";
        var options = "ims";
        var keywordMatches = Articles.find({keywords: {$regex: regex, $options: options}}).fetch();
        keywordMatches.forEach(function (article) {
            matches.push(article)
        });
    });
    return cleanDuplicates(matches);
};

getArticlesByTerm = function (term) {
    term = term.toLowerCase();

    var words = term.split(" ");


    var matchArrays = [];

    words.forEach(function (word) {
        var regex = "(.?)" + word + "(.?)";
        var options = "ims";
        var titleMatches = Articles.find({title: {$regex: regex, $options: options}}).fetch();
        var authorMatches = Articles.find({authors: {$regex: regex, $options: options}}).fetch();
        var keyWordMatches = Articles.find({keywords: {$regex: regex, $options: options}}).fetch();
        var sourceMatches = Articles.find({source: {$regex: regex, $options: options}}).fetch();
        var htmlMatches = Articles.find({html: {$regex: regex, $options: options}}).fetch();

        matchArrays.push(titleMatches);
        matchArrays.push(authorMatches);
        matchArrays.push(keyWordMatches);
        matchArrays.push(sourceMatches);
        matchArrays.push(htmlMatches);


    });

    var articles = [];
    var ids = [];

    matchArrays.forEach(function (matches) {
        appendMatchesToArray(ids, articles, matches);
    });

    return cleanDuplicates(articles);
};

cleanDuplicates = function(articles) {
    var uniqueIds = [];
    var cleanedArticles = [];
    articles.forEach(function(article){
        var id = article._id.valueOf();
        if (!(uniqueIds.indexOf(id) >= 0)){
            uniqueIds.push(id);
            cleanedArticles.push(article)
        }
    });
    return cleanedArticles;
};


var appendMatchesToArray = function (ids, articles, matches) {
    matches.forEach(function (match) {
        if(ids.indexOf(match._id) < 0){
            articles.push(match);
            ids.push(match._id);
        }
    });
};

//
//name1 = 'joe';
//name2 = 'tim';
//name3 = 'zak';
//name4 = 'des';
//name5 = 'harry';
//name6 = 'mau';
//
//key1 = 'watch';
//key2 = 'close';
//key3 = 'obama';
//key4 = 'trump';
//
//site1 = "cnn";
//site2 = 'fox';
//site3 = 'times';
//site4 = 'nbc';
//
//var doc1 = {};
//doc1.authors = [name1, name2];
//doc1.keywords = [key1, key2];
//doc1.title = key1;
//doc1.summary = "summary";
//doc1.source = site1;
//
//var doc2 = {};
//doc2.authors = [name3, name2];
//doc2.keywords = [key4, key2];
//doc2.title = key3;
//doc2.summary = "summary";
//doc2.source = site2;
//
//var doc3 = {};
//doc3.authors = [name4, name5];
//doc3.keywords = [key3, key4];
//doc3.title = key4;
//doc3.summary = "summary";
//doc3.source = site4;
//
//var doc4 = {};
//doc4.authors = [name6, name4];
//doc4.keywords = [key2, key3];
//doc4.title = key2;
//doc4.summary = "summary";
//doc4.source = site3;
//
//Articles.insert(doc1);
//Articles.insert(doc2);
//Articles.insert(doc3);
//Articles.insert(doc4);
//Articles.insert(doc1);
//Articles.insert(doc2);
//Articles.insert(doc3);
//Articles.insert(doc4);
//Articles.insert(doc1);
//Articles.insert(doc2);
//Articles.insert(doc3);
//Articles.insert(doc4);





