if (Meteor.isClient) {


    var isUserLearner = function(){
        console.log("isLearner");
        var user = Meteor.user();
        var type = user.profile.type;
        if(type.indexOf('learner') >= 0) return true;
        return false;
    };

    var isUserAssistant = function(){
        console.log("isAssist");
        var user = Meteor.user();
        var type = user.profile.type;
        if(type.indexOf('assist') >= 0) return true;
        return false;
    };

    var isUserTalker = function () {
        console.log("isTalker");
        var user = Meteor.user();
        var type = user.profile.type;
        if(type.indexOf('talk') >= 0) return true;
        return false;
    };

    Template.home.rendered = function(){
        Meteor.call('getGlobalTalks', function (err, result) {
            if(err) throw err;
            else Session.set('global_talks', result);
            console.log(result);
        });

        Meteor.call('getPersonalTalks', Meteor.user(), function (err, result) {
            if(err) throw err;
            else Session.set('personal_talks', result);
            console.log(result);
        });
    };


    Template.home.helpers({
        login_route: function () {
            console.log('login route');
            Router.go('/login');
        },

        isLearner:function(){
            return isUserLearner();
        },

        isAssist:function(){
            return isUserAssistant();
        },

        isTalker:function(){
            return isUserTalker();
        }
    });

    Template.global_talks.helpers({
        talk_list:function(){
            return Session.get('global_talks');
        },

        button_text:function(){
            return 'Add To Personal List';
        }
    });

    Template.personal_talks.helpers({
        talk_list:function(){
            return Session.get('personal_talks');
        },

        button_text:function(){
            return 'Watch';
        }
    });

    (function (){
        $(document).on('click', '.global-talk-button', function (e) {
            e.preventDefault();
            var id = $(this)[0].id;
            console.log(id);
            Meteor.call('addToPersonalTalks', id,Meteor.user(), function(err, result){
                if(err) console.log(err);
                else Session.set('personal_talks', result);
                console.log(result);

            });
        });
    })();



}