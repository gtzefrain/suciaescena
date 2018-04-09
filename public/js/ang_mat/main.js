  'use strict';

// Declare app level module which depends on views, and components
angular.module('mainApp', [
  'ngRoute',
  'ngMaterial',
  'ngSanitize',
  'mainApp.blog',
  'mainApp.post',
  'mainApp.gallery',
  'mainApp.contact',
  'postServices',
  'ngMeta']).
config(['$routeProvider','$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
  $routeProvider.otherwise({redirectTo: '/blog'});
  // theme
    // '300': 'A4E1F8', //azul claro
    // '300': 'EB7B7C', //rojo raro
    // '400': 'F19AC0', //rosa mexicano
    // F8BBD0 rosa shade menu
    var neonRedMap = $mdThemingProvider.extendPalette('red', {
      '500': '#000000',
      'contrastDefaultColor': 'light'
    });
    $mdThemingProvider.definePalette('neonRed', neonRedMap);
    $mdThemingProvider.theme('default')
      .primaryPalette('neonRed');

}]).config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}])
// .run(['$location',
//     function ($location) {
//         $location.path('/blog');
//     }])
.run(['ngMeta', function(ngMeta) {
  ngMeta.init();
}])
.controller('MainCtrl', ['$scope', '$interpolate', '$location', '$window', function($scope, $interpolate, $location, $window) {
  var tabs = [
    { title: 'Blog', path: 'blog', idx: 0},
    // { title: 'Galeria', path: 'gallery', idx: 1}  ,
    { title: 'Nosotros', path: 'contact', idx: 2}
  ];

  $scope.tabs = tabs;
  $scope.predicate = "title";
  $scope.reversed = true;
  $scope.selectedIndex = 0;
  $scope.allowDisable = true;

  $scope.onTabSelected = onTabSelected;
  $scope.announceSelected = announceSelected;
  $scope.announceDeselected = announceDeselected;

  //check if mobile


  $scope.go = function ( tab, path ) {
    onTabSelected(tab);
    $location.path(path);
  };

  function onTabSelected(tab) {
    $scope.selectedIndex = tab.idx;
    // console.log('Selected tab: ' + this.$index);

    $scope.announceSelected(tab);
  }

  function announceDeselected(tab) {
    $scope.farewell = $interpolate("Goodbye {{title}}!")(tab);
  }

  function announceSelected(tab) {
    $scope.greeting = $interpolate("Hello {{title}}!")(tab);
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1428305917226576',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };
  var w = window.innerWidth;
  $scope.isMobile;
  if (w <= 600)
    $scope.isMobile = true;
  else
    $scope.isMobile = false;

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}]);

angular.module('mainApp').filter('trustAs', ['$sce',
    function($sce) {
        return function (input, type) {
            if (typeof input === "string") {
                return $sce.trustAs(type || 'html', input);
            }
            return "";
        };
    }
]);
