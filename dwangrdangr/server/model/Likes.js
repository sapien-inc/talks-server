Likes = new Mongo.Collection('likes');

addLike = function (userId, articleId) {
    //var mongoId = new Mongo.ObjectID(articleId);

    Likes.remove({articleId:articleId, userId:userId});
    var like = {};
    like.userId = userId;
    like.articleId = articleId;
    var likedId = Likes.insert(like);
    return likedId;
};

getUserLikedArticles = function (userId) {
    var likes = Likes.find({userId: userId}).fetch();
    var articles = [];
    likes.forEach(function (like) {
        var article = Articles.findOne({_id: like.articleId});
        articles.push(article);
    });
    return articles;
};

removeLike = function(userId, articleId){
    Likes.remove({articleId:articleId, userId:userId});
};

appendLikes = function(articles, userId){
    //console.log(articles);
    articles.forEach(function(article){
        var likes = Likes.find({articleId:article._id, userId:userId}).fetch();
        article.liked = false;
        likes.forEach(function(like){article.liked = true})
    });
    return articles;
};
