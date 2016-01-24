if (Meteor.isClient) {

    //Current = new Meteor.Collection('current');


    Tracker.autorun(function () {
        //Meteor.subscribe('current');

        Meteor.call('getSortedArticles', function (err, res) {
            if (err) {
                throw err
            }
            Session.set('suggestedArticles', res)
        })
    });

    Template.suggestedArticles.helpers({
        suggested_articles: function () {
            var articles = Session.get('suggestedArticles');
            if (!articles) {
                articles = [];
            }
            return articles;
        },

        buttonStyle: function(articleId){
            var articles = Session.get('suggestedArticles');
            var color = "grey";
            articles.forEach(function(article){

                if(article._id.valueOf() === articleId){
                    if(article.liked) {
                        color = "orangered";
                    }
                }
            });
            return color;
        },
    });

    //Template.mainArticle.onCreated(function () {
    //  // Use this.subscribe inside onCreated callback
    //  this.subscribe("current");
    //});

    (function () {
        $(document).on('click', '.feed-heart', function (e) {
            //var curr = Session.get('currentArticle');
            e.stopPropagation();
            var articleID = e.target.attributes[0].nodeValue;
            var style = e.target.attributes[2].nodeValue;
            console.log(articleID)
            console.log(style)
            if(style.indexOf('grey') >=0){
                Meteor.call('likeArticle', articleID, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        Session.set('suggestedArticles', result.slice(0,25));
                    }
                });
            }else{
                Meteor.call('unlikeArticle', articleID, function (err, result) {
                    if (err) console.log(err);
                    else Session.set('suggestedArticles', result.slice(0,25));
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
                if (err){
                    throw err
                }
                Session.set('mainArticle', res);
            });
            Router.go('/article/'+id, {articleId:id});
        });


        Template.suggestedArticles.events({
            "mouseenter .list-group-item": function (event) {
                var id = event.target.id;
            },
            "mouseleave .list-group-item": function (event) {
                var id = event.target.id;
            }
        })

        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });

    })();

}