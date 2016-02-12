Assistants = new Mongo.collection('assistants');

initLA = function(userID){
	var la = {user:userID};
	var laID = Assistants.insert(la);
}