'use strict';

angular.module('mainApp.blog', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog/:key', {
    templateUrl: '/blog',
    controller: 'HomeCtrl',
    reloadOnSearch: false
  });

  $routeProvider.when('/blog', {
    templateUrl: '/blog',
    controller: 'HomeCtrl',
    reloadOnSearch: false
  });
}])

.controller('HomeCtrl', ['Post', 'PostByCategory', 'PostCategory', '$routeParams', '$scope', '$location', '$mdSidenav', function(Post, PostByCategory, PostCategory, $routeParams, $scope, $location, $mdSidenav, $media, $mdUtil) {
  var blog = this;

  console.log($scope.isMobile);

  blog.posts = [];

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


  if ($routeParams.key != null)
    blog.posts = PostByCategory.query({key:$routeParams.key});
  else
    blog.posts = Post.query();

  blog.categories = [{key:'list', name:'All'}];

  blog.categories = PostCategory.query(function(){
    blog.categories.unshift({key:'list', name:'All'});
  });

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

  $scope.closeRight = function() {
    $mdSidenav('right').close();
  };

}]);
