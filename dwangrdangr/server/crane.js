//Articles = new Mongo.Collection('articles');
Current = new Mongo.Collection('current');
ObjectId = Npm.require('mongodb').ObjectID;


if (Meteor.isServer) {
  // This code only runs on the server
  //Meteor.publish("current", function () {
  //  return Current.find();
  //});
}

Meteor.methods({

  likeArticle: function(articleID){
    console.log(articleID)
    console.log(Meteor.userId());
    addLike(Meteor.userId(),articleID);
  },

  getAllArticles: function(){
    var articles = Articles.find().fetch();
    return articles;
  },

  getCurrentArticle: function(){
    var article = Current.findOne();
    return article;
  },

  getArticleById: function(id){
    objId = new ObjectId(id);
    var article = Articles.findOne({_id:objId});
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


})