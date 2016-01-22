Likes = new Mongo.Collection('likes');

addLike = function (userId, articleId) {
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

unlikeArticle = function(userId, articleId){
    var likes = Likes.find({articleId:articleId}).fetch();
    likes.forEach(function(like){

    })

};
