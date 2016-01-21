if (Meteor.isClient) {

  (function () {

    $(document).on('click', '#search-button', function (e) {
      var searchVal = $('#search-text')[0].value;
      Meteor.call('searchArticles', searchVal, function(err,res){
        console.log(err)
        console.log(res);
      })
    })

  })();

}

