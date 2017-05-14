'use strict';

angular.module('mainApp.blog', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog/:key', {
    templateUrl: '/blog',
    controller: 'HomeCtrl',
  });

  $routeProvider.when('/blog/:key:page', {
    templateUrl: '/blog',
    controller: 'HomeCtrl',
  });

  $routeProvider.when('/blog', {
    templateUrl: '/blog',
    controller: 'HomeCtrl',
  });

  $routeProvider.when('/blog:page', {
    templateUrl: '/blog',
    controller: 'HomeCtrl',
  });
}])

.controller('HomeCtrl', ['Post', 'PostByCategory', 'PostCategory', '$routeParams', '$scope', '$location', '$mdSidenav', '$route', function(Post, PostByCategory, PostCategory, $routeParams, $scope, $location, $mdSidenav, $media, $mdUtil, $route) {
  var blog = this;

  console.log($scope.isMobile);

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
            console.log(blog.response);
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
