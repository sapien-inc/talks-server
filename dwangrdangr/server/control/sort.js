/**
 * Created by abe707 on 1/15/16.
 */
var calculateArticleScore= function (prefs, article) {

    if(typeof article.keywords == 'undefined')
        article.keywords = [];



  var score = 0;
  score += getDeltaScore(article.keywords, prefs.topKeywords, KEYWORD_PREF_MULTIPLIER);
  score += getDeltaScore(article.authors, prefs.topAuthors, AUTHOR_PREF_MULTIPLIER);
  score += getDeltaScore([article.source], prefs.topSources, SOURCE_PREF_MULTIPLIER);
  score += getDeltaScore(article.keywords, getHotKeyWords(), KEYWORD_HOT_MULTIPLIER);
  score += getDeltaScore([article.source], getHotSites(), SOURCE_HOT_MULTIPLIER);

  return score;
};

var getDistanceFromEnd = function(word, array){
  var index = array.indexOf(word);
  if(index < 0) return 0;
  return array.length - index;
};

var getDeltaScore = function (articleList, prefsList, multiplier) {
  var delta = 0;
  articleList.forEach(function(word){
    var distance = getDistanceFromEnd(word, prefsList);
    delta += multiplier * distance;
  });
  return delta;
};

sortArticles = function(userId, articles){
  var score = {};
  var prefs = UserPrefs.findOne({userId:userId});

  articles.forEach(function (article) {
    score[article._id] = calculateArticleScore(prefs, article);
  });



  articles.sort(function(articleA, articleB){
    return score[articleB._id] - score[articleA._id];
  });

    return articles;
};