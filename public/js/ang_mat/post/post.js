'use strict';

window.prerenderReady = false;

angular.module('mainApp.post', [])

.controller('PostCtrl', ['$routeParams', '$location', '$scope', 'Post', 'ngMeta', '$mdDialog', '$sce', function($routeParams, $location, $scope, Post, ngMeta, $mdDialog, $sce) {
  var self = this;

  $scope.go = function ( path ) {
    $location.path( path );
  };

  Post.get({slug: $routeParams.slug}, function(post) {
    self.post = post;
    self.post.full_url = 'https://www.slna.mx/post/' + self.post.slug
    self.post.present_url = 'https://www.facebook.com/plugins/share_button.php?href='+ self.post.full_url
    +'&layout=button&size=small&mobile_iframe=true&appId=233655680539998&width=59&height=20';
    self.post.present_url = $sce.trustAsResourceUrl(self.post.present_url);
    $location.search('page', null)
    var html = self.post.content.brief;
    var div = document.createElement("div");
    div.innerHTML = html;
    self.post.content.brief = div.innerText;
    ngMeta.setTitle(self.post.title,''); //Title = Eluvium
    ngMeta.setTag('description', String(self.post.content.brief));
    document.querySelector("meta[property='og:type']").setAttribute('content', 'article');
    document.querySelector("meta[property='og:image']").setAttribute('content', self.post.image.secure_url);
    self.addMetaTag('image', self.post.image.secure_url);
    self.addMetaTag('og:description', self.post.content.brief );
    self.addMetaTag('og:image:width', self.post.image.width);
    self.addMetaTag('og:image:height', self.post.image.height);

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

    self.addMetaTag = function(string, content){
      var elem = document.querySelectorAll("meta[name='"+string+"']");
      if(elem.length == 0){
        var z = document.createElement('meta');
        z.name = string
        z.content = content
        document.getElementsByTagName('head')[0].appendChild(z);
      } else{
        elem[0].content = content
      }
    }


// $scope.$on('$viewContentLoaded', function() {
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId            : '233655680539998',
//       autoLogAppEvents : true,
//       xfbml            : true,
//       version          : 'v3.1'
//     });
//   };

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=233655680539998&autoLogAppEvents=1';
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// window.twttr = (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0],
//     t = window.twttr || {};
//   if (d.getElementById(id)) return t;
//   js = d.createElement(s);
//   js.id = id;
//   js.src = "https://platform.twitter.com/widgets.js";
//   fjs.parentNode.insertBefore(js, fjs);

//   t._e = [];
//   t.ready = function(f) {
//     t._e.push(f);
//   };

//   return t;
// }(document, "script", "twitter-wjs"));
// });


}]);



