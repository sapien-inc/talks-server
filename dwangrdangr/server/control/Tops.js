/**
 * Created by abe707 on 1/15/16.
 */
calculateTops = function(userId){
  var likes = Likes.find({userId:userId}).fetch();
  var keywordCounts = {};
  var sourceCounts = {};
  var authorCounts = {};
  likes.forEach(function (like) {
    var article = Articles.findOne({_id:like.articleId});
    if(typeof  article.keywords == 'undefined')  article.keywords = [];
    article.keywords.forEach(function(word){
      if(keywordCounts.hasOwnProperty(word)) keywordCounts[word] = keywordCounts[word] + 1;
      else keywordCounts[word] = 1;
    });

    var source = article.source;
    if(sourceCounts.hasOwnProperty(source)) sourceCounts[source] = sourceCounts[source] + 1;
    else sourceCounts[source] = 1;

    var author = article.author;
    if(authorCounts.hasOwnProperty(author)) authorCounts[author] = authorCounts[author] + 1
    else authorCounts[author] = 1;
  });


  var countKeywords = getReverseMap(keywordCounts);
  var countSources = getReverseMap(sourceCounts);
  var countAuthors = getReverseMap(authorCounts);


  var topKeywords = getTop(countKeywords);
  var topSources = getTop(countSources);
  var topAuthors = getTop(countAuthors);

  var updated = setUserTops(userId, topKeywords, topSources, topAuthors);

};

var getReverseMap = function(aToB){
  var bToA = {}
  Object.keys(aToB).forEach(function (a) {
    var b = aToB[a];
    bToA[b] = a;
  });
  return bToA
};

var getTop = function(countMap){
  var counts = Object.keys(countMap);
  counts.sort(function(a, b){return b-a}); //sort counts in descending order

  var top = [];

  for(var i = 0; i < counts.length; i ++){
    var count = counts[i];
    var result = countMap[count];
    top.push(result);
  }

  return top;
};