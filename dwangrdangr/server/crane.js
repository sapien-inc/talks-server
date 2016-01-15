Articles = new Mongo.Collection('articles');

Meteor.methods({

  getArticle: function(){
    var article = Articles.find().fetch();
    return article;
  }



})