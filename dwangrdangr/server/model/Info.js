/**
 * Created by abe707 on 1/15/16.
 */
Info = new Mongo.Collection('info');



//this should be done by python on startup so that it updates the info objects


getHotKeyWords = function(){
  var infos = Info.find({}).fetch();
  var hot_keywords = [];
  infos.forEach(function(info){
    hot_keywords = info.hotKeywords;
  });
  return hot_keywords
};

getHotSites = function(){
  var info = Info.findOne({_id: HOT_SITES});
  return info.list;
};

// this needs to be remade, im not sure how this will work with the python but I know we will need to save info somehow
// instead of having multiple objects we could just have one object that holds these two things and just keep replacing the onject, idk