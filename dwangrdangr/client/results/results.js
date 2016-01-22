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

  (function () {


  })();

}