/**
 * Created by abe707 on 1/22/16.
 */
if(Meteor.isClient){


    Template.article.rendered = function(){
        var currentID = Router.current().params.id
        Meteor.call('getArticleById',currentID,function(err,res){
            if (err){
                throw err
            }
            Session.set('mainArticle',res);
        })
    }

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
        }
    });

    (function () {
        // Add slideDown animation to dropdown
        $(document).on('click', '#button-more-author', function (e) {
            var authors = Session.get('mainArticle').authors;
            var search_val = "";
            authors.forEach(function (author) {
                search_val += author + " ";
            });
            Meteor.call('searchArticles', search_val, function (err, res) {
                if (err) throw  err;
                else{
                    Session.set('searchTerm',"Author(s): " +  search_val);
                    Session.set('searchResults', res);
                    search_val = search_val.replace(" ","-");
                    Router.go('/results/'+search_val);
                }
            });
        });

        $(document).on('click', '#button-more-source', function (e) {
            var source = Session.get('mainArticle').source;
            Meteor.call('searchArticles', source, function (err, res) {
                if (err) throw  err;
                else{
                    Session.set('searchTerm',"Source: " +  source);
                    Session.set('searchResults', res);
                    Router.go('/results/'+source);
                }
            });
        });

        $(document).on('click', '#button-more-topic', function (e) {
            var topics = Session.get('mainArticle').keywords;
            var search_val = "";
            topics.forEach(function (topic) {
                search_val += topic + " ";
            });
            Meteor.call('searchArticles', search_val, function (err, res) {
                if (err) throw  err;
                else{
                    Session.set('searchTerm', "Topics: " + search_val);
                    Session.set('searchResults', res);
                    search_val = search_val.replace(" ","-");
                    Router.go('/results/'+search_val);
                }
            });
        });

    })();




}

