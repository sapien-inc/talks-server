UserPrefs = new Mongo.Collection('user_prefs');

initUserPrefs = function (userId) {
    var prefs = {};
    prefs.userId = userId;
    prefs.topKeywords = [];
    prefs.topSources = [];
    prefs.topAuthors = [];

    var prefId = UserPrefs.insert(prefs);
    return prefId;
};

//Set the user top lists
setUserTops = function (userId, topKeywords, topSources, topAuthors) {
    var result = UserPrefs.update({userId: userId}, {
        $set: {
            topKeywords: topKeywords,
            topSources: topSources,
            topAuthors: topAuthors
        }
    });
    var updated = UserPrefs.findOne({userId: userId});
    return updated;
};

initUserPrefsWithTops = function (userId, topKeywords, topSources, topAuthors) {
    var prefs = {};
    prefs.userIdl = userId;
    prefs.topKeywords = topKeywords;
    prefs.topSources = topSources;
    prefs.topAuthors = topAuthors;
    var prefId = UserPrefs.insert(prefs);
    return prefId;
};

getUserTopKeywords = function (userId) {
    var prefs = UserPrefs.findOne({userId:userId});
    return pref.topKeywords;
}
