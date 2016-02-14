if (Meteor.isClient) {

    Template.login.helpers({
        home_route: function () {
            console.log("home route");
            Router.go('/');//TODO figure out what home screen should be
        }
    });
    
     (function () {

        $(document).on('click', '#new-account', function (e) {
            document.getElementById("login-container").style.visibility = "hidden";
            document.getElementById("signup-container").style.visibility = "visible";
        });

        $(document).on('click', '#already-have-account', function (e) {
            document.getElementById("login-container").style.visibility = "visible";
            document.getElementById("signup-container").style.visibility = "hidden";
        });

        $(document).on('submit', '#form-login', function (e) {
            e.preventDefault();
            var name = $("#signin-username")[0].value;
            var pass = $("#signin-password")[0].value;
            Meteor.loginWithPassword(name, pass, function (err) {
                if (err) {
                    alert("Login failed. Username password combination did not match.")
                }
                else {
                    document.getElementById("login-container").style.visibility = "hidden";
                    Router.go('/')
                }
            });

        });

        $(document).on('submit', '#form-register', function (e) {
            e.preventDefault();
            var name = $("#register-username")[0].value;
            var pass = $("#register-password")[0].value;
            var repeatPassword = $("#repeat-password")[0].value;
            if (pass != repeatPassword) {
                alert("Your repeated password did not match your original.")
            }
            else if (pass.length < 6){
                alert("Your password must be at least six characters long.")
            }
            else {
                var rad_learner = document.getElementById("type-learner");
                var rad_assit = document.getElementById("type-assistant");
                var rad_talker = document.getElementById("type-talker");

                var type = 'learner';
                if(rad_assit.checked) type = 'assistant';
                if(rad_talker.checked) type = 'talker';
                if(rad_learner.checked) type = 'learner';
                Accounts.createUser({
                    username: name,
                    password: pass,
                    profile: {type:type}
                }, function (err) {
                    if (err) {
                        if (err.error == 403) {
                            alert("Username already exists.");
                        }
                        else {
                            alert("An unknown error occurred.")
                        }
                    }
                    else {
                        document.getElementById("signup-container").style.visibility = "hidden";

                        
                        //Meteor.call('createAccountModel',type, function (err) {
                        //    if (err) throw err;
                        //})
                        Router.go('/') //TODO descide what home page will be
                    }
                })
            }
        });

    })();
}