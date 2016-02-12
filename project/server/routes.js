if (Meteor.isServer) {
    // This code only runs on the server
    //Meteor.publish("current", function () {
    //  return Current.find();
    //});
}

Meteor.methods({
    
	createAccountModel:function(type){
		var userID = Meteor.userId();
		if(type.indexOf('learner') >= 0) initLearner(userID);
		else if(type.indexOf('assistant') >= 0) initLA(userID);
		else if(type.indexOf('learner') >= 0) initTalker(userID);
		else throw {msg: 'invalid user type'};
	}

});