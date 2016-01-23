Router.configure({
    layoutTemplate: 'layout'
});
Router.map(function () {
    this.route('about', {path: '/about'});
    this.route('home', {path: '/'});
    this.route('mainpage', {path: '/mainpage'});
    this.route('results', {path: '/results/:search?'});
    this.route('article', {path: '/article/:id?'});
    this.route('profile', {path: '/profile/:id?'});
})

