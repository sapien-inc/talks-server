if (Meteor.isClient) {

  Tracker.autorun(function() {
    Meteor.call('getArticle',function(err,res){
      if (err){
        throw err
      }
      console.log(res);
      Session.set('articles', res)
    })
  })
}