Articles = new Mongo.Collection('articles');

getArticlesByTerm = function (term) {
    term = term.toLowerCase();
    var words = term.split();

    var matchArrays = [];

    words.forEach(function (word) {
        var regex = "(.?)" + word + "(.?)";
        var options = "ims";
        var titleMatches = Articles.find({title: {$regex: regex, $options:options}}).fetch();
        var authorMatches = Articles.find({authors: {$regex: regex, $options:options}}).fetch();
        var keyWordMatches = Articles.find({keywords: {$regex: regex, $options:options}}).fetch();
        var sourceMatches = Articles.find({source: {$regex: regex, $options:options}}).fetch();

        matchArrays.push(titleMatches);
        matchArrays.push(authorMatches);
        matchArrays.push(keyWordMatches);
        matchArrays.push(sourceMatches);

        console.log(regex);
        console.log(matchArrays);
    });

    var articles = []

    matchArrays.forEach(function(matches){
        appendMatchesToArray(articles, matches);
    });

    return articles;
};

var appendMatchesToArray = function (articles, matches) {
    matches.forEach(function (match) {
        articles.push(match);
    });
};

//TODO ask harry to save everything in lower case

name1 = 'joe';
name2 = 'tim';
name3 = 'zak';
name4 = 'des';
name5 = 'harry';
name6 = 'mau';

key1 = 'watch';
key2 = 'close';
key3 = 'obama';
key4 = 'trump';

site1 = "cnn";
site2 = 'fox';
site3 = 'times';
site4 = 'nbc';

//var doc1 = {};
//doc1.authors = [name1, name2];
//doc1.keywords = [key1, key2];
//doc1.title = key1;
//doc1.source = site1;
//
//var doc2 = {};
//doc2.authors = [name3, name2];
//doc2.keywords = [key4, key2];
//doc2.title = key3;
//doc2.source = site2;
//
//var doc3 = {};
//doc3.authors = [name4, name5];
//doc3.keywords = [key3, key4];
//doc3.title = key4;
//doc3.source = site4;
//
//var doc4 = {};
//doc4.authors = [name6, name4];
//doc4.keywords = [key2, key3];
//doc4.title = key2;
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



