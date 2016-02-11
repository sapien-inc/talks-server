Talkers = new Mongo.Collection('talkers');

/**
 *
 * @param name - non null string
 * @param callback
 *
 * calls the callback with the err on saving as the first param, and the saved talker as the second param
 */
initTalker = function(userID){
    var talker = {user:userID};
    var talkerId = Talkers.insert(talker);
    return talkerId;
};
