if (Meteor.isClient) {

    Template.register.events({
        'submit form': function (event) {
            event.preventDefault();
            var name = event.target.registerUsername.value;
            var passwordVar = event.target.registerPassword.value;
            Accounts.createUser({
                username: name,
                password: passwordVar
            }, function (err) {
                console.log("okay")
                if (err) {
                    if (err.error == 403) {
                        alert("Username already exists.");
                    }
                    else {
                        alert("An unknown error occurred.")
                    }
                }
                else {
                    $("#modal-signup").modal('hide');
                    Router.go('/mainpage')
                }
            });
        }
    });


    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            var username = event.target.loginUsername.value;
            var passwordVar = event.target.loginPassword.value;
            Meteor.loginWithPassword(username, passwordVar, function (err) {
                if (err) {
                    alert("Login failed. Username password combination did not match.")
                }
                else {
                    $("#modal-login").modal('hide');
                }
            });
        }
    });

    Template.dashboard.events({
        'click .logout': function (event) {
            event.preventDefault();
            $("#modal-logged-in").modal('hide');
            Meteor.logout();
            Router.go('/')
        }
    });
}


