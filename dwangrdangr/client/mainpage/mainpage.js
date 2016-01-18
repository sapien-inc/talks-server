if (Meteor.isClient) {

  Tracker.autorun(function() {
    Meteor.call('getAllArticles',function(err,res){
      if (err){
        throw err
      }
      Session.set('suggestedArticles', res)
    })

    Meteor.call('getCurrentArticle',function(err,res){
      if (err){
        throw err
      }
      Session.set('currentArticle', res)
    })
  })

  Template.suggestedArticles.helpers({
    suggested_articles: function () {
      var articles = Session.get('suggestedArticles');
      if (!articles){
        articles = [];
      }
      return articles;
    }
  });

  Template.mainArticle.helpers({
    article_body: function () {
      var article = Session.get('currentArticle');
      if (!article){
        return "";
      }
      return article.html;
    },

    current_title: function() {
      return Session.get('currentTitle');
    }

  });

  (function() {

    $(document).on('click','.list-group-item', function(e){
      var title = e.target.innerHTML;
      Session.set('currentTitle',title);

      var url = e.target.id;
      Session.set('currentArticle', "");
      Meteor.call('callPy', url, function(err,res){
        if (err){
          throw err
        }
      })
    });

  })();

}