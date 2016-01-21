if (Meteor.isClient){

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
      Meteor.loginWithPassword(name, pass, function(err){
        if (err){
          alert("Login failed. Username password combination did not match.")
        }
        else{
          document.getElementById("login-container").style.visibility = "hidden";
        }
      });

    });

    $(document).on('submit', '#form-register', function (e) {
      e.preventDefault();
      var name = $("#register-username")[0].value;
      var pass = $("#register-password")[0].value;
      var repeatPassword = $("#repeat-password")[0].value;
      if (pass != repeatPassword){
        alert("Your repeated password did not match your original.")
      }
      else {
        Accounts.createUser({
          username: name,
          password: pass
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
            Meteor.call('notifyUserRegister', function (err) {
              if(err) throw err;
            })
          }
        })
      }
    });

  })();
}