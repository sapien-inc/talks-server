/**
 * Created by abe707 on 1/23/16.
 */
if(Meteor.isClient){

    Template.profile.rendered = function(){
        Meteor.call('getLikedArticles', function (err, res) {
            if (err) throw err;
            else {
                Session.set('likedArticles', res);
                Meteor.call('getUserPrefs', function (err, res) {
                    if (err) throw err;
                    else {
                        console.log(res);
                        Session.set('userPrefs', res);
                    }
                })
            }
        });
    };

    Template.likedArticles.helpers({
        liked_articles:function(){
            return Session.get('likedArticles');
        },
        buttonStyle: function (articleId) {
            var articles = Session.get('likedArticles');
            var color = "grey";
            articles.forEach(function (article) {

                if (article._id.valueOf() === articleId) {
                    if (article.liked) {
                        color = "orangered";
                    }
                }
            });
            return color;
        }
    });

    Template.profile.helpers({
        top_sites:function(){
            return Session.get('userPrefs').topSources;
        },
        top_authors:function(){
            return Session.get('userPrefs').topAuthors;
        },
        top_keywords:function(){
            return Session.get('userPrefs').topKeywords;
        },
    });

    (function () {

    })();




}
