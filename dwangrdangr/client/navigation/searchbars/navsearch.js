if (Meteor.isClient) {

    (function () {

        $(document).on('click', '#search-button', function (e) {
            var searchVal = $('#search-text')[0].value;
            Meteor.call('searchArticles', searchVal, function (err, res) {
                if (err) throw  err;
                Session.set('suggestedArticles', res);

            })
        })

    })();

}

