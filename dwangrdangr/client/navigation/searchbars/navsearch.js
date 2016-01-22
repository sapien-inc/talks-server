if (Meteor.isClient) {

    (function () {
        //$(document).on('click', '#search-button', function (e) {
        //    var searchVal = $('#search-text')[0].value;
        //    Meteor.call('searchArticles', searchVal, function (err, res) {
        //        if (err) throw  err;
        //        Session.set('searchResults', res);
        //        Router.go('/results/'+searchVal);
        //    })
        //})

        $(document).on('submit', '#searchForm', function (e) {
            e.preventDefault()
            var searchVal = $('#search')[0].value;
            console.log(searchVal);
            Meteor.call('searchArticles', searchVal, function (err, res) {
                if (err) throw  err;
                Session.set('searchResults', res);
                Router.go('/results/'+searchVal);
            })
        })
    })();

}

