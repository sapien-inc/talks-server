if (Meteor.isClient) {

  Current = new Meteor.Collection('current');


  Tracker.autorun(function() {
    Meteor.subscribe('current');

    Meteor.call('getSortedArticles',function(err,res){
      if (err){
        throw err
      }
      Session.set('suggestedArticles', res)
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
    },

    database_updated:function(){
      var sessionTitle = Session.get('currentTitle');
      //Meteor._sleepForMs(1);
      var article = Current.findOne();
      if (!article){
        article = '';
      }
      var articleTitle = article.title;
      Session.set('currentArticle',article);
      //var articleTitle = Session.get('currentArticle').title;
      return sessionTitle == articleTitle;
    }
  });

  //Template.mainArticle.onCreated(function () {
  //  // Use this.subscribe inside onCreated callback
  //  this.subscribe("current");
  //});

  (function() {

    $(document).on('click','.list-group-item', function(e){
      // Get rid of any and all other active list-group-items
      $(this).parent().children().removeClass("active");

      // Add the active class to this item
      $(this).addClass("active");

      var title = e.target.innerHTML;
      var url = e.target.id;
      Meteor.call('callPy', url, function(err,res){
        if (err){
          throw err
        }
        Session.set('currentTitle',title);
      });
    });
  })();

}