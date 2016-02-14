Talks = new Mongo.Collection('talks');

initTalk = function(talker, title, description, start, end){
	var talk = {talker:talker.user, start_time:start, end_time:end, learning_assistants:[]};
	var talkId = Talks.insert(talk);
	return talkId;

addLA = function(talkID, la){
	var talk = Talks.findOne({_id:talkID})
	var result = Talks.update(talkID, {$push:{learning_assistants:la.user}});
	if(result) return true;
	return false;

}