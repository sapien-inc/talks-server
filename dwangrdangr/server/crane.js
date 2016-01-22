//Articles = new Mongo.Collection('articles');
Current = new Mongo.Collection('current');
//ObjectId = Npm.require('mongodb').ObjectID;


if (Meteor.isServer) {
    // This code only runs on the server
    //Meteor.publish("current", function () {
    //  return Current.find();
    //});
}

Meteor.methods({

    likeArticle: function (articleID) {
        var like = addLike(Meteor.userId(), articleID);
        var prefs = calculateTops(Meteor.userId());
        var articles = sortArticles(Meteor.userId(), Articles.find().fetch());
        var article = appendLikes(articles,Meteor.userId());
        return articles;
    },

    unlikeArticle: function (articleID) {
        var like = removeLike(Meteor.userId(), articleID);
        var prefs = calculateTops(Meteor.userId());
        var articles = sortArticles(Meteor.userId(), Articles.find().fetch());
        var article = appendLikes(articles,Meteor.userId());
        return articles;
    },

    notifyUserRegister: function () {
        var userId = Meteor.userId();
        return initUserPrefsWithTops(userId, [], [], []);
    },


    getAllArticles: function () {
        var articles = Articles.find().fetch();
        return articles;
    },

    getSortedArticles: function () {
        var articles = Articles.find().fetch();
        sortArticles(Meteor.userId(), articles);
        appendLikes(articles,Meteor.userId());
        return articles;
    },

    getArticleById: function (articleId) {
        console.log("ID:" + articleId);
        //objId = new ObjectId(id);
        //var objId = new Mongo.ObjectID(articleId);
        //var article = Articles.findOne({_id:objId});
        var article = Articles.findOne({_id: articleId});
        return article;
    },

    searchArticles: function (term) {
        var articles = getArticlesByTerm(term);
        return articles;
    },

    callPy: function (url) {
        var childProcess = Npm.require("child_process");
        var Fiber = Npm.require('fibers');
        new Fiber(function () {
            var file_path = "/Users/harrisonwang/Desktop/6.184/paper-crane/python/get-article.py " + url;
            childProcess.exec("python3 " + file_path, function (error, stdout, stderr) {
                if (error) console.log('a ' + error);
                if (stdout) console.log('b ' + stdout);
                if (stderr) console.log('c ' + stderr);
            });
        }).run();
    }


});