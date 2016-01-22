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
        }
    });

    Template.mainArticle.helpers({
        article_body: function () {
            var article = Session.get('currentArticle');
            if (!article) {
                return "";
            }
            return article.html;
        },

        current_title: function () {
            var article = Session.get('currentArticle');
            if (!article) {
                return "";
            }
            return article.title;
        }
    });

    //Template.mainArticle.onCreated(function () {
    //  // Use this.subscribe inside onCreated callback
    //  this.subscribe("current");
    //});

    (function () {
        $(document).on('click', '.btn-like', function (e) {
            var curr = Session.get('currentArticle');
            var articleID = curr._id;
            Meteor.call('likeArticle', articleID, function (err, result) {
                if (err) console.log(err);
                else Session.set('suggestedArticles', result);
            });
        });

        $(document).on('click', '.list-group-item', function (e) {
            // Get rid of any and all other active list-group-items
            $(this).parent().children().removeClass("active");

            // Add the active class to this item
            $(this).addClass("active");

            var id = $(this)[0].id;

            Meteor.call('getArticleById', id, function (err, res) {
                Session.set('currentArticle', res);
            });
            //Meteor.call('callPy', url, function(err,res){
            //  if (err){
            //    throw err
            //  }
            //  Session.set('currentTitle',title);
            //});
        });
    })();

}