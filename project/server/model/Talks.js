Talks = new Mongo.Collection('talks');

initTalk = function (talkerID, title, description, start, end) {
    var talk = {talker: talkerID,title:title, description:description, start_time: start, end_time: end,learners:[], assistants: []};
    var talkId = Talks.insert(talk);
    return talkId;
};

//addLA = function (talkID, la) {
//    var talk = Talks.findOne({_id: talkID})
//    var result = Talks.update(talkID, {$push: {assistants: la.user}});
//    if (result) return true;
//    return false;
//
//};


/**
 *
 * @param user
 * @returns if user is a Talker returns all the talks that the talker is giving
 * if user is a learner it returns the talks that the learner has subscribed to watch
 * if user is an assistant it returns the talks that the assistant has signed up to help with
 */
getTalksByUser = function(user){
    var type = user.profile.type;
    console.log("getting talks by user: " + type);
    if(type.indexOf('talk') >=0) return Talks.find({talker:user._id}).fetch();
    if(type.indexOf('assit') >= 0)return Talks.find({assistants:user._id}).fetch();
    if(type.indexOf('learn') >= 0)return Talks.find({learners:user._id}).fetch();
    console.log('type not found when getting talks');
    return [];
};

addUserToTalk = function(talkID, user){
    var type = user.profile.type;
    console.log("adding user to talk: " + type);
    if(type.indexOf('assit') >= 0){
        var result = Talks.update(talkID, {$push:{assistants:user._id}});
        console.log("result: " + result);
    }
    if(type.indexOf('learn') >= 0){
        var result = Talks.update(talkID, {$push:{learners:user._id}})
        console.log("result: " +result);
    }
    var personal = getTalksByUser(user);
    console.log("user talks: "+ personal.length);
    return personal;
}



var talks = Talks.find().fetch();
if(talks.length == 0){
    var count = 0;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
    initTalk("talker" + count, "title", "description", "start", "end");
    count += 1;
}


