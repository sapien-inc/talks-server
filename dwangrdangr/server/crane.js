Articles = new Mongo.Collection('articles');
Current = new Mongo.Collection('current');


Meteor.methods({

  getAllArticles: function(){
    var articles = Articles.find().fetch();
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
        console.log("asfds")
        if (error) console.log('a '+error);
        if (stdout) console.log('b '+stdout);
        if (stderr) console.log('c '+stderr);
      });
    }).run();
  }


})