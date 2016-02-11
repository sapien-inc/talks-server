Learners  = new Mongo.collection('learners');

initLearner = function(userID){
	var learner = {user:userID}
	var learnedID = Learners.insert(learner);
	return learnedID;
}
