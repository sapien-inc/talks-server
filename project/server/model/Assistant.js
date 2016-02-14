Assistants = new Mongo.Collection('assistants');

initLA = function (userID) {
    var la = {user: userID};
    var laID = Assistants.insert(la);
};