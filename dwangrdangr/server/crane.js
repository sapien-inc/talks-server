//Articles = new Mongo.Collection('articles');
Current = new Mongo.Collection('current');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("current", function () {
    return Current.find();
  });
}

Meteor.methods({

  notifyUserLogin:function(){
      //var topKeyWords = [key2,key1,key4];
      //var topAuthors = [name5, name1];
      //var topSources = [site1,site4];
      //var prefID = initUserPrefsWithTops(Meteor.userId(), topKeyWords, topSources, topAuthors);
      //console.log("pref id: " + prefID );
  },

  getAllArticles: function(){
    var articles = Articles.find().fetch();
    return articles;
  },

  getSortedArticles: function(){
    var articles = Articles.find().fetch();
    sortArticles(Meteor.userId(), articles);
    return articles;
  },

  getCurrentArticle: function(){
    var article = Current.findOne();
    return article;
  },

  callPy: function(url){
    var childProcess = Npm.require("child_process");
    var Fiber = Npm.require('fibers');
    new Fiber(function() {
      var file_path = "/Users/harrisonwang/Desktop/6.184/paper-crane/python/get-article.py " + url;
      childProcess.exec("python3 " + file_path, function(error, stdout, stderr) {
        if (error) console.log('a '+error);
        if (stdout) console.log('b '+stdout);
        if (stderr) console.log('c '+stderr);
      });
    }).run();
  }


});