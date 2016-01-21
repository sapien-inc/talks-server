Router.configure({
  layoutTemplate:'layout'
});

Router.map(function(){
  this.route('about',{path:'/about'})
  this.route('home',{path:'/'})
  this.route('mainpage',{path:'/mainpage'})
})

