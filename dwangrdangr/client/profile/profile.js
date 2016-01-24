/**
 * Created by abe707 on 1/23/16.
 */
if (Meteor.isClient) {

    Template.profile.rendered = function () {
        Meteor.call('getLikedArticles', function (err, res) {
            if (err) throw err;
            else {
                console.log(res);
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
        liked_articles: function () {
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

    var appendToList = function(listA, listB){
        listB.forEach(function(item){
            listA.push(item);
        })
    };

    Template.profile.helpers({
        top_sites: function () {
            return Session.get('userPrefs').topSources.slice(0,5);
        },
        top_authors: function () {
            return Session.get('userPrefs').topAuthors.slice(0,5);
        },
        top_keywords: function () {
            return Session.get('userPrefs').topKeywords.slice(0,5);
        },
    });

    (function () {
        $(document).on('click', '.panel-top', function (e) {
            var target = e.target;
            var child = target.firstChild;
            var head = child.nextSibling;
            var search = head.innerText;
            Session.set('searchTerm', search)
            Router.go('/results/' + search);
        });

        $(document).on('click', '.feed-heart', function (e) {
            var articleID = e.target.attributes[0].nodeValue;
            var style = e.target.attributes[2].nodeValue;
            if (style.indexOf('grey') >= 0) {
                Meteor.call('likeArticle', articleID, function (err, result) {
                    if (err) throw err;
                    var articles = Session.get('likedArticles');
                    articles.forEach(function(article){
                        if(article._id.valueOf() == articleID)
                            article.liked = true;
                    });
                    Session.set('likedArticles', articles);
                });
            } else {
                Meteor.call('unlikeArticle', articleID, function (err, result) {
                    if (err) throw err;
                    var articles = Session.get('likedArticles');
                    articles.forEach(function(article){
                        if(article._id.valueOf() == articleID)
                            article.liked = false;
                    });
                    Session.set('likedArticles', articles);
                });
            }
        });


        $(document).on('click', '.list-group-item', function (e) {
            // Get rid of any and all other active list-group-items
            $('.list-group .active').removeClass('active');

            // Add the active class to this item
            $(this).addClass("active");

            var id = $(this)[0].id;

            Meteor.call('getArticleById', id, function (err, res) {
                Session.set('currentArticle', res);
            });
        });
    })();


}
