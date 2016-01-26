if (Meteor.isClient) {

    //Current = new Meteor.Collection('current');


    Template.mainpage.rendered = function () {
        //Meteor.subscribe('current');

        Meteor.call('getSortedArticles', function (err, res) {
            if (err) {
                throw err
            }
            Session.set('suggestedArticles', res)
        });

        Meteor.call('getHotTopics', function(err,res){
              if (err){
                  throw err
              };
              Session.set('hotTopics', res);
          }
        );

        Meteor.call('getHotSites', function(err,res){
              if (err){
                  throw err
              };
              Session.set('hotSites', res);
          }
        );
    };

    Template.trending.helpers({
        trending_topics: function(){
            return Session.get('hotTopics').splice(0,5);
        }
    });

    Template.hotSites.helpers({
        hot_sites: function(){
            return Session.get('hotSites').splice(0,5);
        }
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
        }
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
            if(style.indexOf('grey') >=0){
                $('#'+ articleID +'.feed-heart').css({'color':'red'});
                Meteor.call('likeArticle', articleID, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        Session.set('suggestedArticles', result.slice(0,25));
                    }
                });
            }else{
                $('#'+ articleID +'.feed-heart').css({'color':'grey'});
                Meteor.call('unlikeArticle', articleID, function (err, result) {
                    if (err) console.log(err);
                    else Session.set('suggestedArticles', result.slice(0,25));
                });
            }
        });

        $(document).on('click', '.suggested-article', function (e) {
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
        });

        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });

        $(document).on('click', '.hot-site', function (e) {
            var searchQuery = e.target.innerText.toLowerCase();

            Meteor.call('searchBySource', searchQuery, function (err, res) {
                if (err) throw  err;
                Session.set('searchResults', res);
                Session.set('searchTerm',"Source: "+ searchQuery);
                Router.go('/results/' + 'source/' + searchQuery, {searchVal:searchQuery});
            })
        });

        $(document).on('click', '.trending-topic', function (e) {
            var searchQuery = e.target.innerText.toLowerCase();
            var len = searchQuery.length;
            searchQuery = searchQuery.slice(1,len);

            Meteor.call('searchByKeywords', [searchQuery], function (err, res) {
                if (err) throw  err;
                Session.set('searchResults', res);
                Session.set('searchTerm',"Topic: "+ searchQuery);
                Router.go('/results/' + 'topic/' + searchQuery, {searchVal:searchQuery});
            })
        });



    })();

}