if (Meteor.isServer) {
    // This code only runs on the server
    //Meteor.publish("current", function () {
    //  return Current.find();
    //});
    Accounts.onCreateUser(function (options, user) {
        user.profile = options.profile;
        console.log(user);
        return user;
    });
}

Meteor.methods({

    getGlobalTalks: function(){
        var talks = Talks.find().fetch();
        return talks;
    },

    getPersonalTalks:function(user){
        return getTalksByUser(user);
    },

    addToPersonalTalks:function(talkID, user){
        return addUserToTalk(talkID, user);
    }

});