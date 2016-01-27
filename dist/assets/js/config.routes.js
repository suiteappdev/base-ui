'use strict';
angular.module('shoply').run(['$rootScope', '$state', '$stateParams', "$window", /*"AuthenticationService", "$location", "$localStorage", "$socket",*/  function($rootScope,   $state,   $stateParams, $window, /*AuthenticationService, $location, $localStorage,*/ $socket) {
          $rootScope.$on('$stateChangeStart', function(event, nextRoute, toParams, fromState, fromParams){
             /* $rootScope.credential = $localStorage.credential;

              if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
                  && !AuthenticationService.isAuthenticated && !$localStorage.credential) {
                  $location.path('login');
              }*/
          });
      }
    ]
  ).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
          //$urlRouterProvider.otherwise('app/panel');
          $stateProvider
              .state('home', {
                  url: '/',
                  templateUrl: 'views/home/content.html'
              })
              .state('login', {
                  url: '/login',
                  templateUrl: 'views/login/login.html',
                  controller : 'loginController'
              })
              .state('signup', {
                    url: '/signup',
                    templateUrl: 'views/signup/signup.html'
              })
              .state('forgot', {
                    url: '/forgot',
                    templateUrl: 'views/forgot/forgot.html'
              })
              .state('reset', {
                    url: '/reset',
                    templateUrl: 'views/reset/reset.html'
              })
              .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/app/dashboard.html'
              })
      }
    ]
  );