if (Meteor.isClient) {

    (function () {

        $(document).on('submit', '#searchForm', function (e) {
            // e.preventDefault()
//             var searchVal = $('#search')[0].value;
//             Meteor.call('searchArticles', searchVal, function (err, res) {
//                 if (err) throw  err;
//                 Session.set('searchTerm',"Search: "+ searchVal);
//                 Session.set('searchResults', res);
//                 $('#search')[0].value = "";
//                 Router.go('/results/any/'+searchVal, {searchVal:searchVal});
//             })
        })
    })();

}

