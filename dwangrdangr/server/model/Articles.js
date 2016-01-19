Articles = new Mongo.Collection('articles');

getArticlesByTerm = function (term) {
  term = term.toLowerCase();
  var words = term.split();
  var regex = "/(";
  words.forEach(function(word){
    regex+=word;
    regex+="|";
  });
  regex = regex.slice(0,-1);
  regex+=")/";
  var articles = Articles.find({title:regex, author:regex, keywords:regex, source:regex}).fetch();
};

//TODO ask harry to save everything in lower case