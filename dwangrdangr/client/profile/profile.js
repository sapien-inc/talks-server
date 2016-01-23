/**
 * Created by abe707 on 1/23/16.
 */
if(Meteor.isClient){
    var getArticleId = function(){
        var location =  Iron.Location.get().path;
        return location.split("/")[2];
    };



    Tracker.autorun(function () {
    });

    Template.profile.helpers({
        liked_articles:function(){

        }
    });

    (function () {
        // Add slideDown animation to dropdown
        $(document).on('click', '#button-more-author', function (e) {
            var authors = Session.get(ARTICLE_AUTHOR);
            var search_val = "";
            authors.forEach(function (author) {
                search_val += author + " ";
            });
            Meteor.call('searchArticles', search_val, function (err, res) {
                if (err) throw  err;
                else{
                    Session.set('searchTerm',"Author(s): " +  search_val);
                    Session.set('searchResults', res);
                    search_val = search_val.replace(" ","-");
                    Router.go('/results/'+search_val);
                }
            });
        });

        $(document).on('click', '#button-more-source', function (e) {
            var source = Session.get(ARTICLE_SOURCE);
            Meteor.call('searchArticles', source, function (err, res) {
                if (err) throw  err;
                else{
                    Session.set('searchTerm',"Source: " +  source);
                    Session.set('searchResults', res);
                    Router.go('/results/'+source);
                }
            });
        });

        $(document).on('click', '#button-more-topic', function (e) {
            var topics = Session.get(ARTICLE_TOPICS);
            var search_val = "";
            topics.forEach(function (topic) {
                search_val += topic + " ";
            });
            Meteor.call('searchArticles', search_val, function (err, res) {
                if (err) throw  err;
                else{
                    Session.set('searchTerm', "Topics: " + search_val);
                    Session.set('searchResults', res);
                    search_val = search_val.replace(" ","-");
                    Router.go('/results/'+search_val);
                }
            });
        });

    })();




}
