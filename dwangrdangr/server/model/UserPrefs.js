UserPrefs = new Mongo.Collection('user_prefs');

initUserPrefs = function(userId){
  var prefs = {};
  prefs.userId = userId;

  prefs.topKeywords = [];
  prefs.topSources = [];
  prefs.topAuthors = [];

  var prefId = UserPrefs.insert(prefs);
  return prefId;
};

//Set the user top lists
setUserTops = function(userId, topKeywords, topSources, topAuthors){
  UserPrefs.update(userId,{$set:{
    topKeywords:topKeywords,
    topSources:topSources,
    topAuthors:topAuthors
  }});
};