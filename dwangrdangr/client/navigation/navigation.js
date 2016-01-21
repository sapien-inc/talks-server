if (Meteor.isClient) {
    (function () {
        // Add slideDown animation to dropdown
        $(document).on('show.bs.dropdown', '.dropdown', function (e) {
            console.log("fsdfds")
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        });

// Add slideUp animation to dropdown
        $(document).on('hide.bs.dropdown', '.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        });

        $(document).on('click', '.logout-button', function (e) {
            e.preventDefault();
            Meteor.logout();
            Router.go('/')
            document.getElementById("login-container").style.visibility = "visible";
        });

    })();
}


