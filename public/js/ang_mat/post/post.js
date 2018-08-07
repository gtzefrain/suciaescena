'use strict';

window.prerenderReady = false;

angular.module('mainApp.post', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, ngMetaProvider) {
  $routeProvider.when('/post/:slug', {
    templateUrl: '/ang_mat/post',
    controller: 'PostCtrl',
    data: {
      meta: {
        'title': 'Post',
        'description': 'Descripcion',
        'image':'Image'
      }
    }
  })
}])

.controller('PostCtrl', ['$routeParams', '$location', '$scope', 'Post', 'ngMeta', '$mdDialog', function($routeParams, $location, $scope, Post, ngMeta, $mdDialog) {
  var self = this;

  $scope.go = function ( path ) {
    $location.path( path );
  };


  Post.get({slug: $routeParams.slug}, function(post) {
    self.post = post;
    $location.search('page', null)
    var html = self.post.content.brief;
    var div = document.createElement("div");
    div.innerHTML = html;
    self.post.content.brief = div.innerText;
    ngMeta.setTitle(self.post.title,''); //Title = Eluvium
    ngMeta.setTag('description', String(self.post.content.brief));
    ngMeta.setTag('og:description', String(self.post.content.brief));
    ngMeta.setTag('og:image', String(self.post.image.secure_url));
    ngMeta.setTag('image', String(self.post.image.secure_url));
    window.prerenderReady = true;
  });

  $scope.showDialog = function($event, image){
      $mdDialog.show({
        targetEvent: $event,
        clickOutsideToClose: true,
        template:
          '<md-dialog>' +
          '  <md-content> ' +
          ' <img class="modalImg" ng-src={{modal.image.url}}>' +
          '  </md-content>' +
          // '  <div class="md-actions">' +
          // '    <md-button ng-click="closeDialog()">' +
          // '      Close Greeting' +
          // '    </md-button>' +
          // '  </div>' +
          '</md-dialog>',
          controller: function DialogController($scope, $mdDialog, image) {
            var vm = this;
            vm.image = image
            console.log(vm.image.url);
            $scope.closeDialog = function() {
              $mdDialog.hide();
            }
          },
        controllerAs: 'modal',
        onComplete: afterShowAnimation,
        locals: {
          image: image
        }
      });
    }
      // When the 'enter' animation finishes...

      function afterShowAnimation(scope, element, options) {
        console.log("done");
         // post-show code here: DOM element focus, etc.
      }

      function GreetingController($scope, $mdDialog) {
    // Assigned from construction <code>locals</code> options...

      $scope.closeDialog = function() {
        // Easily hides most recent dialog shown...
        // no specific instance reference is needed.
        $mdDialog.hide();
      };
    }



}]);
