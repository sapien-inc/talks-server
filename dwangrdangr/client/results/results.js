if (Meteor.isClient) {

  Tracker.autorun(function () {

  });

  Template.results.rendered = function(){

    var currentSearch = Router.current().params.search;
    var searchType = Router.current().params.type;

    currentSearch = currentSearch.replace("-", " ");

    if (searchType == 'any') {
      Meteor.call('searchArticles', currentSearch, function (err, res) {
        if (err) throw  err;
          Session.set('searchTerm', "Search: " + currentSearch);
          Session.set('searchResults', res);
      });
    }

    else if (searchType == 'source') {
      Meteor.call('searchBySource', currentSearch, function (err, res) {
        if (err) throw  err;
        Session.set('searchResults', res);
        Session.set('searchTerm',"Source: "+ currentSearch);
      })
    }

    else if (searchType == 'authors') {
      Meteor.call('searchByAuthors', currentSearch, function (err, res) {
        if (err) throw  err;
        Session.set('searchResults', res);
        Session.set('searchTerm',"Author(s): "+ currentSearch);
      })
    }

    else if (searchType == 'topic') {
      Meteor.call('searchByKeywords', currentSearch, function (err, res) {
        if (err) throw  err;
        Session.set('searchResults', res);
        Session.set('searchTerm',"Topics: "+ currentSearch);
      })
    }
  };

  Template.results.helpers({
    search_results: function () {
      var articles = Session.get('searchResults');
      if (!articles) {
        articles = [];
      }
      return articles;
    },
    search_term: function () {
      return Session.get('searchTerm');
    }
  });

  Template.articlePanel.helpers({
    buttonStyle: function (articleId) {
      var articles = Session.get('searchResults');
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

  (function () {

    $(document).on('click', '.search-heart', function (e) {
      //var curr = Session.get('currentArticle');
      var articleID = e.target.attributes[0].nodeValue;
      var style = e.target.attributes[2].nodeValue;
      if (style.indexOf('grey') >= 0) {
        Meteor.call('likeArticle', articleID, Session.get('searchResults'), false, function (err, result) {
          if (err) {
            throw err;
          }
          else {
            Session.set('searchResults', result.slice(0, 25));
          }
        });
      } else {
        Meteor.call('unlikeArticle', articleID, Session.get('searchResults'), false, function (err, result) {
          if (err) console.log(err);
          else Session.set('searchResults', result.slice(0, 25));
        });
      }
    });

    $(document).on('click', '#read-more-button', function (e) {
      var articleId = e.target.parentNode.id;
      Meteor.call('getArticleById', articleId, function(err,res){
        if (err){
          throw err
        }
        Session.set('mainArticle',res)
      });
      Router.go('/article/'+articleId, {articleId:articleId});
    });

  })();

}