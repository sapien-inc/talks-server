/**
 * Created by abe707 on 1/22/16.
 */
if(Meteor.isClient){


    Template.article.rendered = function(){
        var currentID = Router.current().params.id;
        Meteor.call('getArticleById',currentID,function(err,article){
            if (err) throw err;
            else{
                Session.set('mainArticle',article);
                Meteor.call('searchByAuthors', article.authors, function (err, moreByAuthor) {
                    if (err) throw  err;
                    else Session.set('moreByAuthor', moreByAuthor);
                });

                Meteor.call('searchBySource', article.source, function (err, moreBySource) {
                    if (err) throw  err;
                    else Session.set('moreBySource', moreBySource);
                });
                Meteor.call('searchByKeywords', article.keywords, function (err, moreByKeyWord) {
                    if (err) throw  err;
                    else Session.set('moreByKeyword', moreByKeyWord);
                });
            }
        });

    };

    Template.article.helpers({
        more_author_list: function(){
            return Session.get('moreByAuthor').slice(0,3);
        },
        more_source_list: function(){
            return Session.get('moreBySource').slice(0,3);
        },
        more_topic_list: function(){
            return Session.get('moreByKeyword').slice(0,3);
        }
    });

    Template.display.helpers({
        body: function (){
            return Session.get('mainArticle').html;
        },
        title: function(){
            return Session.get('mainArticle').title;
        },
        source: function(){
            return Session.get('mainArticle').source;
        },
        author: function(){
            var returnString = ""
            var authors = Session.get('mainArticle').authors;
            authors.forEach(function(author){
                returnString += author;
                returnString += ", ";
            })
            return returnString.substring(0, returnString.length - 2);
        },
        buttonStyle: function(articleId){
            var color = "grey";
            var article = Session.get('mainArticle');
            if(article.liked)
                color = "red";
            return color;
        }
    });

    (function () {
        $(document).on('click', '.article-heart', function (e) {
            //var curr = Session.get('currentArticle');
            e.stopPropagation();
            var article = Session.get('mainArticle');
            if(!article.liked){
                Meteor.call('likeMainArticle', article._id.valueOf(), function (err,article) {
                    if (err) throw err;
                    else Session.set('mainArticle', article);
                });
            }else{
                Meteor.call('unlikeMainArticle', article._id.valueOf(), function (err, article) {
                    if (err) console.log(err);
                    else Session.set('mainArticle', article);
                });
            }
        });

        $(document).on('click', '.panel-more', function (e) {
            var id = e.target.id;
            console.log(e.target);
            Meteor.call('getArticleById',id,function(err,article){
                if (err) throw err;
                else{
                    Session.set('mainArticle',article);
                    Meteor.call('searchByAuthors', article.authors, function (err, moreByAuthor) {
                        if (err) throw  err;
                        else Session.set('moreByAuthor', moreByAuthor);
                    });

                    Meteor.call('searchBySource', article.source, function (err, moreBySource) {
                        if (err) throw  err;
                        else Session.set('moreBySource', moreBySource);
                    });
                    Meteor.call('searchByKeywords', article.keywords, function (err, moreByKeyWord) {
                        if (err) throw  err;
                        else Session.set('moreByKeyword', moreByKeyWord);
                    });
                }
                Router.go('/article/' +id);
            });


        });

        $(document).on('click', '#view-more-author', function (e) {
            var authors = "";
            Session.get('mainArticle').authors.forEach(function(author){
                authors += author + " ";
            });
            Session.set('searchTerm',"Author(s): " +  authors);
            Session.set('searchResults',Session.get('moreByAuthor'));
            var search_val = authors.replace(" ", "-");
            Router.go('/results/'+search_val);
        });

        $(document).on('click', '#view-more-topic', function (e) {
            var topics = "";
            Session.get('mainArticle').keywords.forEach(function(word){
                topics += word + " ";
            });
            Session.set('searchTerm',"Topic(s): " +  topics);
            Session.set('searchResults',Session.get('moreByKeyword'));
            var search_val = topics.replace(" ", "-");
            Router.go('/results/'+search_val);
        });

        $(document).on('click', '#view-more-source', function (e) {
            var source = Session.get('mainArticle').source;
            Session.set('searchTerm',"Source: " +  source);
            Session.set('searchResults',Session.get('moreBySource'));
            Router.go('/results/'+source);
        });

    })();




}

