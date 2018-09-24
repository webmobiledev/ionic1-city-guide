'use strict';
app
.controller('TabCtrl', ['$scope', '$state', 'strings', function($scope, $state, strings) {

  $scope.titlePlaces = strings.placesTitle;
  $scope.titleHome = strings.homeTitle;

  }])

.controller('LoginCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', 'config', 'strings', '$localStorage', '$sessionStorage', function($scope, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicHistory, config, strings, $localStorage, $sessionStorage) {
    
    $scope.welcome = strings.welcome;
    $scope.remPass = strings.remPass;
    $scope.formEmail = strings.formEmail;
    $scope.formPassword = strings.formPassword;
    $scope.forget = strings.forget;
    $scope.AccCreate = strings.AccCreate;
    $scope.Login = strings.Login;

    $scope.insertinvited = function(user) {
    if(user.isChecked) {
        localStorage.setItem('chequeado', true);
    } else {
        localStorage.setItem('chequeado', false);
          
    }
    }

    $scope.deschequear = function(){
      if($scope.estachequeado == 'true'){
        localStorage.setItem('chequeado', false);
    }
    }

    $scope.username = localStorage.correo;

    if($scope.username == null){
    localStorage.setItem('chequeado', false);
    };

    $scope.loginData={};

    $scope.doLogin=function(){
      var user_email=$scope.loginData.username;
      var user_password=$scope.loginData.password;

      if(user_email && user_password){
          var str = config.urlBase+"controller/data_login.php?username="+user_email+"&password="+user_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;

                sessionStorage.setItem('loggedin_status',true);
                localStorage.setItem('id_user',$scope.admin.user_id);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })


                $state.go('tab.home',{},{location:"replace",reload:true});

            })
            .error(function(){

          $ionicPopup.alert({
          title: strings.passWrongtitle,
          template: '<center>'+strings.passWrongtext+'</center>',
          okType: "button-assertive",
          okText: strings.passWrongbutton,
        })

            });

      }else{

      }

    }

}])


.controller('SignupCtrl', ['$scope', '$http', '$state', '$ionicHistory', 'config', 'strings', '$ionicLoading', function($scope, $http, $state, $ionicHistory, config, strings, $ionicLoading) {
    
    $scope.titleCreate = strings.titleCreate;
    $scope.formFirstName = strings.formFirstName;
    $scope.formLastName = strings.formLastName;
    $scope.formPhone = strings.formPhone;
    $scope.formEmail = strings.formEmail;
    $scope.formPassword = strings.formPassword;
    $scope.formConfirmPassword = strings.formConfirmPassword;
    $scope.Signup = strings.Signup;
    $scope.AccReady = strings.AccReady;

    $scope.user = {
      user_firstname : '',
      user_lastname : '',
      user_email : '',
      user_phone : '',
      user_password : ''
    };

    $scope.saveusers = function (){

    var urlSignup = config.urlBase+'controller/new_user.php';
    $http.post(urlSignup, $scope.user)
    .then(
    function(response){
      $ionicLoading.show({ template: strings.SuccAcc, noBackdrop: true, duration: 2000});
      $state.go('tab.login',{},{location:"replace",reload:true});
    },

    function(response){
      /* if account already exists or database not connected*/
      $ionicLoading.show({ template: strings.ErrAcc, noBackdrop: true, duration: 2000});
    }
      ); 
};

}])

.controller('NoInternetCtrl', ['$scope', '$state', 'strings', '$ionicPlatform', '$ionicHistory', '$ionicPopup', function($scope, $state, strings, $ionicPlatform, $ionicHistory, $ionicPopup) {

  $scope.conMess = strings.conMess;
  $scope.conSubMess = strings.conSubMess;
  $scope.conTry = strings.conTry;

    $ionicPlatform.registerBackButtonAction(function(event) {
      console.log($state.current.name);
      if($state.current.name == "tab.nointernet") {
        $ionicPopup.confirm({
          title: strings.titleExit,
          template: '<center>'+strings.messageExit+'</center>',
          okType: "button-light",
          okText: strings.yesText,
          cancelType: "button-assertive",
          cancelText: strings.noText,
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);

  }])

.controller('HomeCtrl', ['$rootScope', '$scope', '$http', '$state', 'config', 'strings', '$ionicPlatform', '$ionicPopup', '$ionicHistory', '$cordovaToast', '$localStorage', function($rootScope, $scope, $http, $state, config, strings, $ionicPlatform, $ionicPopup, $ionicHistory, $cordovaToast, $localStorage) {

  $scope.goBack = function() {
    $ionicHistory.backView().go();
  }

  $ionicPlatform.registerBackButtonAction(function(event) {
      console.log($state.current.name);
      if($state.current.name == "tab.home") {
        $ionicPopup.confirm({
          title: strings.titleExit,
          template: '<center>'+strings.messageExit+'</center>',
          okType: "button-light",
          okText: strings.yesText,
          cancelType: "button-assertive",
          cancelText: strings.noText,
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);


    var CheckInternetConnection = function() {
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $state.go('tab.nointernet');
          $ionicLoading.hide();
        }
      }
    }

    var id_user = localStorage.getItem("id_user");

    CheckInternetConnection();
 
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){

      if(!id_user) {
        $state.go('tab.login');
      }else{
        $state.go('tab.home');
      }
        
      })

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $state.go('tab.nointernet');
      $ionicLoading.hide();
    })

        $scope.doLogout=function(){

      localStorage.removeItem('chequeado');
      localStorage.removeItem('loggedin_status');
      localStorage.removeItem('id_user');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('tab.login',{},{location:"replace",reload:true});

    }

  $scope.city = strings.cityName;
  $scope.welcomtext = strings.textWel;
  $scope.bestPlacestext = strings.bestPlaces;
  $scope.latestNewstext = strings.latestNews;
  $scope.bestOfferstext = strings.bestOffers;

  $scope.accountTitle = strings.accountTitle;
  $scope.aboutusTitle = strings.aboutusTitle;
  $scope.signoutTitle = strings.signoutTitle;
  $scope.contactTitle = strings.contactTitle;

  $scope.seeAlltext = strings.seeAll;
  $scope.currency = config.currency;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.places = [];
  $http.get(config.urlBase+'json/data_places.php')
  .success(function(data, status, headers,config){
      console.log('Data places success');
      $scope.places = data.places;
  })
  .error(function(data, status, headers,config){
      console.log('Data places error');
  })

  $scope.categories = [];
  $http.get(config.urlBase+'json/data_places_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data categories success');
      $scope.categories = data.categories;    })
    .error(function(data, status, headers,config){
      console.log('Data categories error');
    })

  $scope.news = [];
  $http.get(config.urlBase+'json/data_news.php')
    .success(function(data, status, headers,config){
      console.log('Data news success');
      $scope.news = data.news;    })
    .error(function(data, status, headers,config){
      console.log('Data news error');
    })

  $scope.offers = [];
  $http.get(config.urlBase+'json/data_offers.php')
    .success(function(data, status, headers,config){
      console.log('Data offers success');
      $scope.offers = data.offers;    })
    .error(function(data, status, headers,config){
      console.log('Data offers error');
    })

  }])

.controller('CategoriesCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
  template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
  noBackdrop: true
  });


  $scope.titlecategories = strings.categoriesTitle;
  $scope.selectCategory = strings.selectCategory;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.categories = [];
  $http.get(config.urlBase+'json/data_places_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data categories success');
      $scope.categories = data.categories;
      $ionicLoading.hide();
      })
    .error(function(data, status, headers,config){
      console.log('Data categories error');
    })

  }])

.controller('TypesCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.selectType = strings.typeSelect;

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.categories = [];
  $http.get(config.urlBase+'json/data_places_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data categories success');
      $scope.data = data.categories[$state.params.id];
      $scope.categories = data.categories;
      
    })

    .error(function(data, status, headers,config){
      console.log('Data categories error');
    })

  $scope.types = [];
  $http.get(config.urlBase+'json/data_places_types.php')
  .success(function(data, status, headers,config){
      console.log('Data types success');
      $scope.types = data.types;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data types error');
  })



  }])

.controller('CategoryPlaceCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.types = [];
  $http.get(config.urlBase+'json/data_places_types.php')
    .success(function(data, status, headers,config){
      console.log('Data types success');
      $scope.data = data.types[$state.params.id];
      $scope.types = data.types;
      
    })

    .error(function(data, status, headers,config){
      console.log('Data types error');
    })

  $scope.places = [];
  $http.get(config.urlBase+'json/data_places.php')
  .success(function(data, status, headers,config){
      console.log('Data places success');
      $scope.places = data.places;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data places error');
  })



  }])


.controller('PlaceCtrl', ['$scope', '$http', 'PlacesService', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicModal', '$ionicPlatform', '$cordovaSocialSharing', '$cordovaInAppBrowser', function($scope, $http, PlacesService, $state, config, strings, $ionicLoading, $timeout, $ionicModal, $ionicPlatform, $cordovaSocialSharing, $cordovaInAppBrowser) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.information = strings.infoText;
  $scope.description = strings.descText;
  $scope.placeDetailsTitle = strings.placeDetailsTitle;
  $scope.audience = strings.audiText;
  $scope.address = strings.addrText;
  $scope.schedule = strings.scheText;
  $scope.phone = strings.phonText;
  $scope.website = strings.websText;
  $scope.bestOfferstext = strings.bestOffers;
  $scope.relatedOfferstext = strings.relatedOffers;
  $scope.readmoretext = strings.readMore;
  $scope.nofferstext = strings.noffers;
  $scope.moretext = strings.more;
  $scope.seeAlltext = strings.seeAll;
  $scope.titleShare = strings.titleShare;
  $scope.otherShare = strings.otherShare;
  $scope.currency = config.currency;
  $scope.saved = strings.saved;

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.places = [];
  $http.get(config.urlBase+'json/data_places.php')
    .success(function(data, status, headers,config){
      console.log('Data places success');
      $scope.data = data.places[$state.params.id];
      $scope.places = data.places;
      $scope.idplace = $scope.data.place_id;
      $scope.latitude = $scope.data.place_latitude;
      $scope.longitude = $scope.data.place_longitude;
      $scope.imagePlace = $scope.data.place_image;
      $scope.linkWebsite = $scope.data.place_website;
      $scope.openMap = function(map) {
      var url = 'https://www.google.com/maps/search/?api=1&query='+$scope.latitude+','+$scope.longitude+'&zoom=15';
      window.open(encodeURI(url), '_system');
      }

      $scope.openWebsite = function(website) {
      window.open(encodeURI($scope.linkWebsite), '_system');
      }

    })

    .error(function(data, status, headers,config){
      console.log('Data places error');
    })
    
  $scope.gallery = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_gallery.php')
  .success(function(data, status, headers,config){
      console.log('Data gallery success');
      $scope.gallery = data.gallery;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data gallery error');
  })

  $scope.offers = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_offers.php')
  .success(function(data, status, headers,config){
      console.log('Data offers success');
      $scope.offers = data.offers;
  })
  .error(function(data, status, headers,config){
      console.log('Data offers error');
  })

    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  

    $ionicModal.fromTemplateUrl('share.html', function($ionicModal) {
        $scope.share = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  

  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();

  $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppUrl+config.appstoreAppId;
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl+config.playstoreAppId;
    }
  });

   $scope.shareViaTwitter = function() {
    var twitter = 'https://twitter.com/home?status='+$scope.appUrl;
    window.open(encodeURI(twitter), '_system');
  };

  $scope.shareViaGoogle = function() {
    var google = 'https://plus.google.com/share?url='+$scope.appUrl;
    window.open(encodeURI(google), '_system');
  };

   $scope.shareViaFacebook = function() {
    var facebook = 'https://www.facebook.com/sharer/sharer.php?u='+$scope.appUrl;
    window.open(encodeURI(facebook), '_system');
  };

  $scope.shareViaWhatsApp = function() {
    $cordovaSocialSharing.shareViaWhatsApp(strings.shareMess, $scope.imagesfolder+'/'+$scope.imagePlace, $scope.appUrl);
  };

 $scope.OtherShare=function(){
     window.plugins.socialsharing.share(strings.shareMess, null, null, $scope.appUrl);
  }

 $scope.addTofavorite = function(data){
    $ionicLoading.show({ template: strings.saved, noBackdrop: true, duration: 1000 });
    PlacesService.favorite(data);
  };


  }])


.controller('OCategoriesCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.titleOffers = strings.offersTitle;
  $scope.selectCategory = strings.selectCategory;
  $scope.imagesfolder = config.urlBase+'images';

  $scope.offers_categories = [];
  $http.get(config.urlBase+'json/data_offers_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data offers_categories success');
      $scope.offers_categories = data.offers_categories;
    $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data offers_categories error');
    })

  }])


.controller('CategoryOfferCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$scope.currency = config.currency;

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.offers_categories = [];
  $http.get(config.urlBase+'json/data_offers_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data offers_categories success');
      $scope.data = data.offers_categories[$state.params.id];
      $scope.offers_categories = data.offers_categories;
      
    })

  .error(function(data, status, headers,config){
      console.log('Data offers_categories error');
    })

  $scope.offers = [];
  $http.get(config.urlBase+'json/data_offers.php')
  .success(function(data, status, headers,config){
      console.log('Data offers success');
      $scope.offers = data.offers;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data offers error');
  })

  }])

.controller('OfferCtrl', ['$scope', '$rootScope', 'OffersService', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', '$ionicPopup', '$ionicModal', '$ionicPlatform', '$cordovaSocialSharing', '$cordovaInAppBrowser', '$localStorage',  function($scope, $rootScope, OffersService, $http, $state, config, strings, $ionicLoading, $timeout, $ionicPopup, $ionicModal, $ionicPlatform, $cordovaSocialSharing, $cordovaInAppBrowser, $localStorage) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.Math = window.Math;

  $scope.description = strings.descText;
  $scope.titleoffers = strings.offersTitle;
  $scope.relatedOfferstext = strings.relatedOffers;
  $scope.currency = config.currency;
  $scope.moretext = strings.seeAll;
  $scope.addedtext = strings.addedText;
  $scope.expiretext = strings.expireText;
  $scope.savetext = strings.saveText;
  $scope.detailsofferText = strings.detailsOfferText;
  $scope.howtouseOfferText = strings.howtouseOfferText;
  $scope.offerDetailsTitle = strings.offerDetailsTitle;
  $scope.getofferText = strings.getofferText;
  $scope.OrderDetails = strings.OrderDetails;
  $scope.buynow = strings.buynow;
  $scope.saved = strings.saved;

  $scope.subtotalText = strings.subtotalText;
  $scope.discountText = strings.discountText;
  $scope.totalText = strings.totalText;
  $scope.discountpriceText = strings.discountpriceText;
  $scope.oldpriceText = strings.oldpriceText;
  $scope.confirmText = strings.confirmText;
  $scope.successText = strings.successText;
  $scope.doneText = strings.doneText;
  $scope.errortitle = strings.errortitle;
  $scope.tryagainText = strings.tryagainText;
  $scope.errorText = strings.errorText;
  $scope.skipText = strings.skipText;

  $scope.titleShare = strings.titleShare;
  $scope.otherShare = strings.otherShare;

  $scope.formFirstName = strings.formFirstName;
  $scope.formLastName = strings.formLastName;
  $scope.formPhone = strings.formPhone;
  $scope.formEmail = strings.formEmail;

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.offers = [];
  $http.get(config.urlBase+'json/data_offers.php')
    .success(function(data, status, headers,config){
      console.log('Data offers success');
      $scope.data = data.offers[$state.params.id];
      $scope.offers = data.offers;
      $scope.idoffer = $scope.data.offer_id;
      $scope.imageOffer = $scope.data.offer_image;
      $ionicLoading.hide();
    })

    .error(function(data, status, headers,config){
      console.log('Data offers error');
    })
    
  $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  

      $ionicModal.fromTemplateUrl('success.html', function($ionicModal) {
        $scope.success = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  


      $ionicModal.fromTemplateUrl('error.html', function($ionicModal) {
        $scope.error = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  

        $ionicModal.fromTemplateUrl('share.html', function($ionicModal) {
        $scope.share = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  

    var id_user = localStorage.getItem("id_user");

    var InAppBrowserReference;

    $scope.paypal = function(paymentpaypal) {

      var urlpaypal = config.urlBase+"payment/paypal/index.php?id_user="+id_user+"&id_offer="+$scope.idoffer;
      InAppBrowserReference = window.open(encodeURI(urlpaypal), '_self', 'location=no', 'toolbar=no', 'zoom=no', 'cache=no', 'hardwareback=no');
      InAppBrowserReference.addEventListener('loadstart', closeInAppBrowser);

      function closeInAppBrowser(event) {
      if (event.url.match("/done")) {
        InAppBrowserReference.close();
      }}

    }

    /*$scope.stripe = function(paymentstripe) {

      var urlpaypal = config.urlBase+"payment/stripe/index.php?id_user="+id_user+"&id_offer="+$scope.idoffer;
      InAppBrowserReference = window.open(encodeURI(urlpaypal), '_self', 'location=no', 'toolbar=no', 'zoom=no', 'cache=no', 'hardwareback=no');
      InAppBrowserReference.addEventListener('loadstart', closeInAppBrowser);

      function closeInAppBrowser(event) {
      if (event.url.match("/done")) {
        InAppBrowserReference.close();
      }}

    }*/

    /*$scope.stripe = function(paymentstripe) {
      var url = config.urlBase+"payment/stripe/index.php?id_user="+id_user+"&id_offer="+$scope.idoffer;
      window.open(encodeURI(url), '_blank', 'location=no', 'toolbar=no', 'zoom=no', 'cache=no');
      return false;
      }*/

  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();


  $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppUrl+config.appstoreAppId;
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl+config.playstoreAppId;
    }
  });

   $scope.shareViaTwitter = function() {
    var twitter = 'https://twitter.com/home?status='+$scope.appUrl;
    window.open(encodeURI(twitter), '_system');
  };

  $scope.shareViaGoogle = function() {
    var google = 'https://plus.google.com/share?url='+$scope.appUrl;
    window.open(encodeURI(google), '_system');
  };

   $scope.shareViaFacebook = function() {
    var facebook = 'https://www.facebook.com/sharer/sharer.php?u='+$scope.appUrl;
    window.open(encodeURI(facebook), '_system');
  };

  $scope.shareViaWhatsApp = function() {
    $cordovaSocialSharing.shareViaWhatsApp(strings.shareMess, $scope.imagesfolder+'/'+$scope.imageOffer, $scope.appUrl);
  };

 $scope.OtherShare=function(){
     window.plugins.socialsharing.share(strings.shareMess, null, null, $scope.appUrl);
  }

 $scope.addTofavorite = function(data){
    $ionicLoading.show({ template: strings.saved, noBackdrop: true, duration: 1000 });
    OffersService.favorite(data);
  };

  }])


.controller('SearchCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.titlesearch = strings.searchTitle;
  $scope.searchresults = strings.resultsSearch;
  $scope.inputext = strings.inputSearch;

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.places = [];
  $http.get(config.urlBase+'json/data_places.php')
    .success(function(data, status, headers,config){
      console.log('Data places success');
      $scope.data = data.places[$state.params.id];
      $scope.places = data.places;
      $ionicLoading.hide();
  })

  .error(function(data, status, headers,config){
      console.log('Data places error');
  })


}])

.controller('OSearchCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.titleOfferssearch = strings.searchOffersTitle;
  $scope.searchresults = strings.resultsSearch;
  $scope.inputext = strings.inputSearch;

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.offers = [];
  $http.get(config.urlBase+'json/data_offers.php')
    .success(function(data, status, headers,config){
      console.log('Data offers success');
      $scope.offers = data.offers;
      $ionicLoading.hide();
  })

  .error(function(data, status, headers,config){
      console.log('Data offers error');
  })


}])

.controller('NCategoriesCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $ionicLoading.show({
  template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
  noBackdrop: true
  });

  $scope.titlenews = strings.newsTitle;
  $scope.selectCategory = strings.selectCategory;

  $scope.imagesfolder = config.urlBase+'images';

   $scope.news_categories = [];
  $http.get(config.urlBase+'json/data_news_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data news_categories success');
      $scope.news_categories = data.news_categories;
      $ionicLoading.hide();
      })
    .error(function(data, status, headers,config){
      console.log('Data news_categories error');
    })

  }])


.controller('NSearchCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

  $scope.titleNewssearch = strings.searchnewsTitle;
  $scope.searchresults = strings.resultsSearch;
  $scope.inputext = strings.inputSearch;

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.news = [];
  $http.get(config.urlBase+'json/data_news.php')
    .success(function(data, status, headers,config){
      console.log('Data news success');
      $scope.news = data.news;
      $ionicLoading.hide();
  })

  .error(function(data, status, headers,config){
      console.log('Data news error');
  })


}])

.controller('CategoryNewsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$timeout', function($scope, $http, $state, config, strings, $ionicLoading, $timeout) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.news_categories = [];
  $http.get(config.urlBase+'json/data_news_categories.php')
    .success(function(data, status, headers,config){
      console.log('Data news_categories success');
      $scope.data = data.news_categories[$state.params.id];
      $scope.news_categories = data.news_categories;
    })

    .error(function(data, status, headers,config){
      console.log('Data news_categories error');
    })

  $scope.news = [];
  $http.get(config.urlBase+'json/data_news.php')
  .success(function(data, status, headers,config){
      console.log('Data news success');
      $scope.news = data.news;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data news error');
  })



  }])


.controller('PostCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$ionicModal', '$timeout', '$ionicPlatform', '$cordovaSocialSharing', '$cordovaInAppBrowser', 'NewsService', function($scope, $http, $state, config, strings, $ionicLoading, $ionicModal, $timeout, $ionicPlatform, $cordovaSocialSharing, $cordovaInAppBrowser, NewsService) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.description = strings.descText;
  $scope.titlenews = strings.newsTitle;
  $scope.relatedNewstext = strings.relatedNews;
  $scope.moretext = strings.seeAll;
  $scope.titleShare = strings.titleShare;
  $scope.otherShare = strings.otherShare;

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.news = [];
  $http.get(config.urlBase+'json/data_news.php')
    .success(function(data, status, headers,config){
      console.log('Data news success');
      $scope.data = data.news[$state.params.id];
      $scope.news = data.news;
      $scope.data.news_date = Date.parse($scope.data.news_date);
      $scope.imagePost = $scope.data.news_image;
      $ionicLoading.hide();
    })

    .error(function(data, status, headers,config){
      console.log('Data news error');
    })

  $ionicModal.fromTemplateUrl('share.html', function($ionicModal) {
  $scope.share = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  


  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();


  $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppUrl+config.appstoreAppId;
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl+config.playstoreAppId;
    }
  });

   $scope.shareViaTwitter = function() {
    var twitter = 'https://twitter.com/home?status='+$scope.appUrl;
    window.open(encodeURI(twitter), '_system');
  };

  $scope.shareViaGoogle = function() {
    var google = 'https://plus.google.com/share?url='+$scope.appUrl;
    window.open(encodeURI(google), '_system');
  };

   $scope.shareViaFacebook = function() {
    var facebook = 'https://www.facebook.com/sharer/sharer.php?u='+$scope.appUrl;
    window.open(encodeURI(facebook), '_system');
  };

  $scope.shareViaWhatsApp = function() {
    $cordovaSocialSharing.shareViaWhatsApp(strings.shareMess, $scope.imagesfolder+'/'+$scope.imagePost, $scope.appUrl);
  };

 $scope.OtherShare=function(){
     window.plugins.socialsharing.share(strings.shareMess, null, null, $scope.appUrl);
  }

 $scope.addTofavorite = function(data){
    $ionicLoading.show({ template: strings.saved, noBackdrop: true, duration: 1000 });
    NewsService.favorite(data);
  };

  }])


.controller('ForgetCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', 'config', 'strings', '$ionicLoading', function($scope, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicHistory, config, strings, $ionicLoading) {
    
    $scope.formEmail = strings.formEmail;
    $scope.titleforget = strings.titleforget;
    $scope.forgetText = strings.forgetText;
    $scope.sendNow = strings.sendNow;
    $scope.succForget = strings.succForget;
    $scope.forgetErr = strings.forgetErr;
    $scope.Login = strings.Login;

    $scope.loginData={};

    $scope.doLogin=function(){
    var user_email=$scope.loginData.username;

      if(user_email){
          var str = config.urlBase+"controller/data_forget.php?username="+user_email;
          $http.get(str)
            .success(function(){
            $scope.success.show();                  
            })
            .error(function(){   
            $ionicLoading.show({ template: $scope.forgetErr, noBackdrop: true, duration: 2000 });           
            });

      }else{
      }
    }

$scope.cancelar = function(){
$scope.success.hide();
$state.go('tab.login',{},{location:"replace",reload:true});
}

    $ionicModal.fromTemplateUrl('success.html', function($ionicModal) {
        $scope.success = $ionicModal;
    }, {
        scope: $scope,
        hardwareBackButtonClose: false,
        animation: 'slide-in-up'
    }); 

$ionicHistory.nextViewOptions({
disableAnimate:true,
disableBack:true
})

}])

.controller('AboutCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$localStorage', '$ionicLoading', function($scope, $http, $state, config, strings, $localStorage, $ionicLoading) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
});

$scope.aboutusTitle = strings.aboutusTitle;
  $scope.termsTitle = strings.termsTitle;
  $scope.privacyTitle = strings.privacyTitle;

$scope.strings = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_strings.php')
  .success(function(data, status, headers,config){
      console.log('Data strings success');
      $scope.strings = data.strings;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data strings error');
  })

}])

.controller('PrivacyCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$localStorage', '$ionicLoading', function($scope, $http, $state, config, strings, $localStorage, $ionicLoading) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
});

$scope.privacyTitle = strings.privacyTitle;

$scope.strings = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_strings.php')
  .success(function(data, status, headers,config){
      console.log('Data strings success');
      $scope.strings = data.strings;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data strings error');
  })

}])

.controller('TermsCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$localStorage', '$ionicLoading', function($scope, $http, $state, config, strings, $localStorage, $ionicLoading) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
});

$scope.termsTitle = strings.termsTitle;

$scope.strings = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_strings.php')
  .success(function(data, status, headers,config){
      console.log('Data strings success');
      $scope.strings = data.strings;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data strings error');
  })

}])

.controller('FavoritesCtrl', ['$scope', 'OffersService', 'PlacesService', 'NewsService', '$http', '$state', 'config', 'strings', '$localStorage', '$ionicLoading', function($scope, OffersService, PlacesService, NewsService, $http, $state, config, strings, $localStorage, $ionicLoading) {

  $scope.favoritesTitle = strings.favoritesTitle;
  $scope.offersTitle = strings.offersTitle;
  $scope.placesTitle = strings.placesTitle;
  $scope.newsTitle = strings.newsTitle;
  $scope.listEmpty = strings.listEmpty;

  $scope.id_user = localStorage.getItem("id_user");

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';

    $scope.$on('$ionicView.enter',function(){
      $scope.favoriteOffers =  OffersService.favorite();
      $ionicLoading.hide();
    });
    

    $scope.removefavoriteOffer = function(id) {
       $scope.favoriteOffers =  OffersService.favorite(id);
    };

    $scope.$on('$ionicView.enter',function(){
    $scope.favoritePlaces =  PlacesService.favorite();
    $ionicLoading.hide();
    });
    

    $scope.removefavoritePlace = function(id) {
       $scope.favoritePlaces =  PlacesService.favorite(id);
    };


    $scope.$on('$ionicView.enter',function(){
    $scope.favoriteNews =  NewsService.favorite();
    $ionicLoading.hide();
    });
    

    $scope.removefavoritePost = function(id) {
       $scope.favoriteNews =  NewsService.favorite(id);
    };


}])

.controller('PurchasesCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', function($scope, $http, $state, config, strings, $ionicLoading) {


$scope.purchasesTitle = strings.purchasesTitle;
$scope.purchasesRef = strings.purchasesRef;
$scope.purchasesAmout = strings.purchasesAmout;
$scope.purchasesOrder = strings.purchasesOrder;


$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
});

$scope.id_user = localStorage.getItem("id_user");

  $scope.orders = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_orders.php')
  .success(function(data, status, headers,config){
      console.log('Data orders success');
      $scope.orders = data.orders;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data orders error');
  })

}])

.controller('ContactCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$timeout', '$ionicLoading', function($scope, $http, $state, config, strings, $timeout, $ionicLoading) {

    $scope.contactTitle = strings.contactTitle;
    $scope.FormcontactName = strings.FormcontactName;
    $scope.FormcontactEmail = strings.FormcontactEmail;
    $scope.FormcontactMessage = strings.FormcontactMessage;
    $scope.FormcontactSend = strings.FormcontactSend;
    $scope.contactEmail = strings.contactEmail;
    $scope.contactPhone = strings.contactPhone;
    $scope.contactWebsite = strings.contactWebsite;
    $scope.contactAddress = strings.contactAddress;
    $scope.contactSending = strings.contactSending;
    $scope.contactSuccess = strings.contactSuccess;
    $scope.contactFailed = strings.contactFailed;


    $scope.openEmail = function(email) {
      window.open(encodeURI('mailto:'+$scope.contactEmail), '_system');
    }

    $scope.openPhone = function(phone) {
      window.open(encodeURI('tel:'+$scope.contactPhone), '_system');
    }

    $scope.openWeb = function(website) {
      window.open(encodeURI($scope.contactWebsite), '_system');
    }

    $scope.openMap = function(map) {
      window.open(encodeURI('https://www.google.es/maps/place/'+$scope.contactAddress), '_system');
    }

    $scope.contact={};

    $scope.sendForm=function(){
    $ionicLoading.show({ template: $scope.contactSending, noBackdrop: true});

    var user_id = localStorage.getItem("id_user");
    var user_name = $scope.contact.name;
    var user_email = $scope.contact.email;
    var user_massage = $scope.contact.message;

      if(user_email){
          var urlContact = config.urlBase+"controller/contact.php?user_id="+user_id+"&user_name="+user_name+"&user_email="+user_email+"&user_massage="+user_massage;
          $http.get(urlContact)
            .success(function(){
            $ionicLoading.show({ template: $scope.contactSuccess, noBackdrop: true, duration: 2000 });             
            })
            .error(function(){   
            $ionicLoading.show({ template: $scope.contactFailed, noBackdrop: true, duration: 2000 });        
            });

      }else{
      }
    }


}])

.controller('AccountCtrl', ['$scope', '$http', '$state', 'config', 'strings', '$ionicLoading', '$ionicHistory', '$localStorage', function($scope, $http, $state, config, strings, $ionicLoading, $ionicHistory, $localStorage) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
});

$scope.accountTitle = strings.accountTitle;
$scope.accountFirstName = strings.accountFirstName;
$scope.accountLastName = strings.accountLastName;
$scope.accountPhone = strings.accountPhone;
$scope.accountEmail = strings.accountEmail;
$scope.favoritesTitle = strings.favoritesTitle;
$scope.purchasesTitle = strings.purchasesTitle;
$scope.signoutTitle = strings.signoutTitle;
$scope.contactTitle = strings.contactTitle;

$scope.id_user = localStorage.getItem("id_user");

  $scope.users = [];
  $scope.imagesfolder = config.urlBase+'images';
  $http.get(config.urlBase+'json/data_users.php')
  .success(function(data, status, headers,config){
      console.log('Data users success');
      $scope.users = data.users;
      $ionicLoading.hide();
  })
  .error(function(data, status, headers,config){
      console.log('Data users error');
  })

        $scope.doLogout=function(){

      localStorage.removeItem('chequeado');
      localStorage.removeItem('loggedin_status');
      localStorage.removeItem('id_user');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('tab.login',{},{location:"replace",reload:true});

    }

}])