if (Meteor.isClient) {

  Tracker.autorun(function () {

  });

  Template.results.helpers({
    search_results: function () {
      var articles = Session.get('searchResults');
      if (!articles) {
        articles = [];
      }
      return articles;
    }

  });

  Template.articlePanel.helpers({
    buttonStyle: function(articleId){
      var articles = Session.get('searchResults');
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

  (function () {

    $(document).on('click', '.search-heart', function (e) {
      //var curr = Session.get('currentArticle');
      var articleID = e.target.attributes[0].nodeValue;
      var style = e.target.attributes[2].nodeValue;
      if(style.indexOf('grey') >=0){
        Meteor.call('likeArticle', articleID, Session.get('searchResults'), function (err, result) {
          if (err) {
            throw err;
          }
          else {
            Session.set('searchResults',  result);
          }
        });
      }else{
        Meteor.call('unlikeArticle', articleID, Session.get('searchResults'), function (err, result) {
          if (err) console.log(err);
          else Session.set('searchResults',  result);
        });
      }
    });

  })();

}