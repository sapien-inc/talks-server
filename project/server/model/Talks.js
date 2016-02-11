Talks = new Mongo.Collection('talks');

initTalk = function(talkerID, title, description, start, end){
	var talk = {talker:talkerID, start_time:start, end_time:end, learning_assistants:[]};
	var talkId = Talks.insert(talk);
	return talkId;

addLA = function(talkID, laID){
	var talk = Talks.findOne({_id:talkID})
	var result = Talks.update(talkID, {$push:{learning_assistants:laID}});
	if(result) return true;
	return false;

}