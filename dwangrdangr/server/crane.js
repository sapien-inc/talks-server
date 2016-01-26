//Articles = new Mongo.Collection('articles');
//ObjectId = Npm.require('mongodb').ObjectID;

HotSites = new Mongo.Collection('hotSites');
Trending = new Mongo.Collection('trending');


if (Meteor.isServer) {
    // This code only runs on the server
    //Meteor.publish("current", function () {
    //  return Current.find();
    //});
}

Meteor.methods({
    getLikedArticles: function () {
        var userId = Meteor.userId();
        var articles = getUserLikedArticles(userId);
        articles = appendLikes(articles, userId);
        return articles;
    },

    getHotSites: function (){
        var hotSites = HotSites.find({}).fetch();
        if (!hotSites){
            return []
        }
        return hotSites;
    },

    getHotTopics: function(){
        var trending = Trending.find({}).fetch();
        if (!trending){
            return [];
        }
        return trending;
    },

    getUserPrefs:function(){
        var userId = Meteor.userId();
        return calculateTops(userId);
    },

    likeMainArticle: function(articleID){
        //harry
        //var mongoId = new Mongo.ObjectID(articleID)
        //var like = addLike(Meteor.userId(), mongoId);
        //var article = Articles.findOne({_id: mongoId});

        //drew
        var like = addLike(Meteor.userId(), articleID);
        var article = Articles.findOne({_id: articleID});

        var articles = [article];
        articles = appendLikes(articles, Meteor.userId());
        return articles[0];
    },

    unlikeMainArticle:function(articleID){
        //harry
        //var mongoId = new Mongo.ObjectID(articleID)
        //var like = removeLike(Meteor.userId(), mongoId);
        //var article = Articles.findOne({_id: mongoId})

        //drew
        var like = removeLike(Meteor.userId(), articleID);
        var article = Articles.findOne({_id: articleID});

        var articles = [article];
        articles = appendLikes(articles, Meteor.userId());
        return articles[0];
    },

    likeArticle: function (articleID, selection, calculate) {
        //harry
        //var mongoId = new Mongo.ObjectID(articleID)
        //var like = addLike(Meteor.userId(), mongoId);

        //drew
        var like = addLike(Meteor.userId(), articleID);

        if (calculate)
            var prefs = calculateTops(Meteor.userId());
        var articles;
        if (selection) {
            articles = selection;
        }
        else {
            articles = sortArticles(Meteor.userId(), Articles.find().fetch());
        }
        var article = appendLikes(articles, Meteor.userId());
        return articles;
    },

    unlikeArticle: function (articleID, selection, calculate) {
        //harry
        //var mongoId = new Mongo.ObjectID(articleID);
        //var like = removeLike(Meteor.userId(), mongoId);

        //drew
        var like = removeLike(Meteor.userId(), articleID);

        if (calculate)
            var prefs = calculateTops(Meteor.userId());
        var articles;
        if (selection) {
            articles = selection;
        }
        else {
            articles = sortArticles(Meteor.userId(), Articles.find().fetch());
        }
        var article = appendLikes(articles, Meteor.userId());
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
        var prefs = calculateTops(Meteor.userId());
        articles = sortArticles(Meteor.userId(), articles);
        articles = appendLikes(articles, Meteor.userId());
        return articles.slice(0, 25);
    },

    getArticleById: function (articleId) {

        // drew
        var article = Articles.findOne({_id: articleId});

        //harry
        //var objId = new Mongo.ObjectID(articleId);
        //var article = Articles.findOne({_id: objId});

        var articles = [article];
        if(Meteor.userId())
            articles = appendLikes(articles, Meteor.userId());
        return articles[0];
    },


    searchArticles: function (term) {
        var articles = getArticlesByTerm(term);
        var article = appendLikes(articles, Meteor.userId());
        articles = sortArticles(Meteor.userId(), articles);
        return articles.slice(0,100);
    },

    searchByAuthors: function (authors) {
        return getArticlesByAuthors(authors);
    },

    searchByKeywords:function(keywords){
        return getArticlesByKeywords(keywords);
    },

    searchBySource:function(source){
        return getArticlesBySource(source);
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