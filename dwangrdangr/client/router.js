Router.configure({
    layoutTemplate: 'layout'
});
Router.map(function () {
    this.route('about', {path: '/about'});
    this.route('home', {path: '/'});
    this.route('mainpage', {path: '/mainpage'});
    this.route('profile', {path: '/profile'});
    this.route('results', {path: '/results/:type/:search', data:function(){
        return this.params
    }});
    this.route('article', {path: '/article/:id?',   data:function(){
        return this.params
    }});
});

