'use strict';

window.prerenderReady = false;
console.log(window.prerenderReady);

angular.module('mainApp.blog', [])
.controller('HomeCtrl', ['Post', 'PostByCategory', 'PostCategory', 'ngMeta' ,'$routeParams', '$scope', '$location', '$mdSidenav', '$mdUtil', '$route', '$timeout',function(Post, PostByCategory, PostCategory, ngMeta ,$routeParams, $scope, $location, $mdSidenav, $mdUtil, $route, $timeout,) {
  var blog = this;
  
    blog.addMetaTag = function(string, content){
      if(document.querySelectorAll("meta[property='"+string+"']").length == 0){
        var z = document.createElement('meta');
        z.name = string
        z.content = content
        document.getElementsByTagName('head')[0].appendChild(z);
      }
    }
  
  ngMeta.setTitle(self.title ,''); //Title = Eluvium
    ngMeta.setTag('description', 'Medio musical mexicano');
    document.querySelector("meta[property='og:type']").setAttribute('content', 'news.publishes');
    document.querySelector("meta[property='og:image']").setAttribute('content', 'https://i.imgur.com/dhqFJHC.jpg');
    blog.addMetaTag('image', 'https://i.imgur.com/dhqFJHC.jpg');

  blog.response = {};
  blog.posts = {};
  blog.currentPage = {}
  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        },300);

    return debounceFn;


  }

  function initScope() {
      if ($routeParams.key != null){
        if ($routeParams.key == 'all') {
          blog.posts = Post.query(function (response) {
            var posts = []
            angular.forEach(response, function (item) {
                posts.push(item)
            });
            blog.response = posts[0]
            blog.posts = blog.response.results;
          });
        }else {
          blog.posts = PostByCategory.query({key:$routeParams.key});
        }
      }
      else if ($routeParams.page != null) {
        blog.posts = Post.query({page:$routeParams.page},function (response) {
          var posts = []
          angular.forEach(response, function (item) {
              posts.push(item)
          });
          blog.response = posts[0]
          blog.posts = blog.response.results;
        })
      }
      else{
        blog.posts = Post.query(function (response) {
          var posts = []
          angular.forEach(response, function (item) {
              posts.push(item)
          });
          blog.response = posts[0]
          blog.posts = blog.response.results;
        });
      }

      blog.categories = [{key:'', name:'Todos'}];

      blog.categories = PostCategory.query(function(){
        blog.categories.unshift({key:'', name:'Todos'});
      });
  }

  $scope.go = function ( path ) {
    $location.path( path );
  };

  blog.toggleRight = function() {
    $mdSidenav('right').toggle();
    $scope.goToSideNav();
  };


  $scope.refreshPosts = function(the_key) {
    if (the_key == 'list'){
      blog.posts = Post.query();
      $mdSidenav('right').toggle();
      console.log($('.back'));
    }else{
      blog.posts = PostByCategory.query({key:the_key});
      $mdSidenav('right').toggle();
      console.log($('.back'));
    }
  };

  $scope.getPage = function(page){
    blog.posts = Post.query(2, function (response) {
      var posts = []
      angular.forEach(response, function (item) {
          posts.push(item)
      });
      blog.response = posts[0]
      console.log(blog.response);
      blog.posts = blog.response.results;
    })
  }
  $scope.closeRight = function() {
    $mdSidenav('right').close();
  };


  initScope();


}]);
