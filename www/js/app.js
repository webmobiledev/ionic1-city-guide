'use strict';
angular.module('underscore', []) .factory('_', function() { return window._; });
var app;
app = angular.module('starter', ['ionic', 'ngCordova', 'ngStorage', 'underscore', 'ngPassword', 'ionic-cache-src', 'ui.swiper'])

.run(function($rootScope, $ionicPlatform, $http, $state, $ionicPopup, config, strings) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit(config.onesignalId)
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    document.addEventListener("backbutton",CallbackFunction, false);
    }
    function CallbackFunction() {
   
    }

    var defaultHTTPHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    };

    $http.defaults.headers.post = defaultHTTPHeaders;

});
    
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider){

$ionicConfigProvider.tabs.position("bottom");
$ionicConfigProvider.navBar.alignTitle("center");

$stateProvider

     .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tab.html',
      controller: 'TabCtrl'
    })

     .state('tab.nointernet', {
        url: '/nointernet',
        cache: false,
        views: {
          'tab-nointernet': {
            templateUrl: 'nointernet.html',
            controller: 'NoInternetCtrl'
          }
        }
      })

     .state('tab.login', {
        url: '/login',
        cache: false,
        views: {
          'tab-login': {
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
          }
        }
      })

     .state('tab.signup', {
        url: '/signup',
        cache: false,
        views: {
          'tab-signup': {
            templateUrl: 'signup.html',
            controller: 'SignupCtrl'
          }
        }
      })

     .state('tab.forget', {
        url: '/forget',
        cache: false,
        views: {
          'tab-forget': {
            templateUrl: 'forget.html',
            controller: 'ForgetCtrl'
          }
        }
      })

     .state('tab.home', {
        url: '/home',
        cache: false,
        views: {
          'tab-home': {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
          }
        }
      })

     .state('tab.categories', {
        url: '/categories',
        cache: false,
        views: {
          'tab-categories': {
            templateUrl: 'categories.html',
            controller: 'CategoriesCtrl'
          }
        }
      })

     .state('tab.types', {
        url: '/types/:id',
        cache: false,
        views: {
          'tab-types': {
            templateUrl: 'types.html',
            controller: 'TypesCtrl'
          }
        }
      })

     .state('tab.ncategories', {
        url: '/ncategories',
        cache: false,
        views: {
          'tab-ncategories': {
            templateUrl: 'ncategories.html',
            controller: 'NCategoriesCtrl'
          }
        }
      })
     
     .state('tab.ocategories', {
        url: '/ocategories',
        cache: false,
        views: {
          'tab-ocategories': {
            templateUrl: 'ocategories.html',
            controller: 'OCategoriesCtrl'
          }
        }
      })

     .state('tab.search', {
        url: '/search',
        cache: false,
        views: {
          'tab-search': {
            templateUrl: 'search.html',
            controller: 'SearchCtrl'
          }
        }
      })

     .state('tab.osearch', {
        url: '/osearch',
        cache: false,
        views: {
          'tab-osearch': {
            templateUrl: 'osearch.html',
            controller: 'OSearchCtrl'
          }
        }
      })

     .state('tab.nsearch', {
        url: '/nsearch',
        cache: false,
        views: {
          'tab-nsearch': {
            templateUrl: 'nsearch.html',
            controller: 'NSearchCtrl'
          }
        }
      })

      .state('tab.pcategory', {
        url: '/pcategory/:id',
        cache: false,
        views: {
          'tab-pcategory': {
            templateUrl: 'pcategory.html',
            controller: 'CategoryPlaceCtrl'
          }
        }
      })

      .state('tab.ocategory', {
        url: '/ocategory/:id',
        cache: false,
        views: {
          'tab-ocategory': {
            templateUrl: 'ocategory.html',
            controller: 'CategoryOfferCtrl'
          }
        }
      })

      .state('tab.ncategory', {
        url: '/ncategory/:id',
        cache: false,
        views: {
          'tab-ncategory': {
            templateUrl: 'ncategory.html',
            controller: 'CategoryNewsCtrl'
          }
        }
      })

      .state('tab.place', {
        url: '/place/:id',
        cache: false,
        views: {
          'tab-place': {
            templateUrl: 'place.html',
            controller: 'PlaceCtrl'
          }
        }
      })

      .state('tab.post', {
        url: '/post/:id',
        cache: false,
        views: {
          'tab-post': {
            templateUrl: 'post.html',
            controller: 'PostCtrl'
          }
        }
      })

      .state('tab.offer', {
        url: '/offer/:id',
        cache: false,
        views: {
          'tab-offer': {
            templateUrl: 'offer.html',
            controller: 'OfferCtrl'
          }
        }
      })

      .state('tab.about', {
        url: '/about',
        cache: false,
        views: {
          'tab-about': {
            templateUrl: 'about.html',
            controller: 'AboutCtrl'
          }
        }
      })

      .state('tab.terms', {
        url: '/terms',
        cache: false,
        views: {
          'tab-terms': {
            templateUrl: 'terms.html',
            controller: 'TermsCtrl'
          }
        }
      })

      .state('tab.privacy', {
        url: '/privacy',
        cache: false,
        views: {
          'tab-privacy': {
            templateUrl: 'privacy.html',
            controller: 'PrivacyCtrl'
          }
        }
      })

      .state('tab.favorites', {
        url: '/favorites',
        cache: false,
        views: {
          'tab-favorites': {
            templateUrl: 'favorites.html',
            controller: 'FavoritesCtrl'
          }
        }
      })

      .state('tab.purchases', {
        url: '/purchases',
        cache: false,
        views: {
          'tab-purchases': {
            templateUrl: 'purchases.html',
            controller: 'PurchasesCtrl'
          }
        }
      })

      .state('tab.contact', {
        url: '/contact',
        cache: false,
        views: {
          'tab-contact': {
            templateUrl: 'contact.html',
            controller: 'ContactCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'account.html',
            controller: 'AccountCtrl'
          }
        }
      })


    // $urlRouterProvider.otherwise('/tab/home');

    var estachequeado = localStorage.getItem("chequeado");

      if(estachequeado == 'true'){

      if (localStorage.getItem("id_user") === null) {

        return $urlRouterProvider.otherwise('/tab/login');

      }else{

        return $urlRouterProvider.otherwise('/tab/home');
      }
        
      }else{
        return $urlRouterProvider.otherwise('/tab/login');
      }

})

.filter('unique', function() {

   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key); 
              output.push(item);
          }
      });
      return output;
   };
})


.filter('limitext', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })


.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
})


.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})

/*.directive('uiShowPassword', [
  function () {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      var btnShowPass = angular.element('<button class="button button-clear"><i class="ion-eye"></i></button>'),
        elemType = elem.attr('type');

      // this hack is needed because Ionic prevents browser click event 
      // from elements inside label with input
      btnShowPass.on('mousedown', function (evt) {
        (elem.attr('type') === elemType) ?
          elem.attr('type', 'text') : elem.attr('type', elemType);
        btnShowPass.toggleClass('button-positive');
        //prevent input field focus
        evt.stopPropagation();
      });

      btnShowPass.on('touchend', function (evt) {
        var syntheticClick = new Event('mousedown');
        evt.currentTarget.dispatchEvent(syntheticClick);

        //stop to block ionic default event
        evt.stopPropagation();
      });

      if (elem.attr('type') === 'password') {
        elem.after(btnShowPass);
      }
    }
  };
  }]);*/