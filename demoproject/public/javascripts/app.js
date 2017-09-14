// app.js
/**************
CREATED :16 June 2017
CREATED BY: Parush Gupta
Motive: It defined routes to call different files.It will provide you directions where to go.
********************/
'use strict';
angular.module("communicationModule", []);
// Declare app level module which depends on filters, and services

var routerApp = angular.module('alisthub', ['angular-loading-bar','ngRoute','autocomplete','ngSanitize','ui.router','ngStorage','oc.lazyLoad','communicationModule', 'ui.bootstrap','ckeditor','angularUtils.directives.dirPagination','angularjs-dropdown-multiselect','oitozero.ngSweetAlert','ngAnimate','ngDialog','ngLodash','angular-confirm','angular-svg-round-progressbar'])



.config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider,$httpProvider,cfpLoadingBarProvider) {
     $urlRouterProvider.otherwise('/login');
  delete $httpProvider.defaults.headers.common['X-Requested-With'];  

 cfpLoadingBarProvider.includeSpinner = false;
 cfpLoadingBarProvider.latencyThreshold = 500;
 $locationProvider.html5Mode(true);
/*
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});*/

    // You can also load via resolve
    $stateProvider.
    //login screen
       state('dashboard', {
            url: '/dashboard',            
            views: {
                "lazyLoadView": {
                  controller: 'dashboardController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/users/views/index.html'
                },
                'header': {
                    templateUrl: "header.html"                   
                },
                'footer': {
                    templateUrl: "footer.html"             
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/users/service.js')/*.then(function(){                   
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/users/controller.js']);
                    })
               
              }]
            }
        })
    
    
    .state('booking', {
            url: '/booking',            
            views: {
                "lazyLoadView": {
                  controller: 'bookingController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/booking/views/index.html'
                },
                'header': {
                    templateUrl: "header.html"                   
                },
                'footer': {
                    templateUrl: "footer.html"             
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/booking/service.js')/*.then(function(){                   
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/booking/controller.js']);
                    })
               
              }]
            }
        })
    
    
    .state('login', {
            url: '/login',            
            views: {
                "lazyLoadView": {
                  controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/login/views/login.html'
                },
                
                'footer': {
                    templateUrl: "footer.html"             
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/login/service.js')/*.then(function(){                   
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/login/controller.js']);
                    })
               
              }]
            }
        })
    .state('signup', {
            url: '/signup',            
            views: {
                "lazyLoadView": {
                  controller: 'signupController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/signup/views/index.html'
                },
                
                'footer': {
                    templateUrl: "footer.html"             
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/signup/service.js')/*.then(function(){                   
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/signup/controller.js']);
                    })
               
              }]
            }
        })
    
    .state('edit',{ 
        
        url:'/edit',
        
        views:{
            
            "lazyLoadView":{
                controller:'editController',
                templateUrl:'modules/edit/views/index.html'
            },
                'header': {
                    templateUrl: "header.html"  },
            'footer':{
                templateUrl:'footer.html'
            }
            
        },
        resolve :{
            resources:['$ocLazyLoad','$injector',function($ocLazyLoad, $injector)
                      
                      {return $ocLazyLoad.load('modules/edit/service.js')
                      .then(function(){
                          return $ocLazyLoad.load(['modules/edit/controller.js']);
                      })
                      }]
        }
        
        
        
    })
    

    
    
    
    
    
  }).run(['$rootScope', '$location','$state', '$localStorage',function($rootScope,$location, $state,$localStorage) {
    //To add class
   
    $rootScope.logout=function(){
       
         $localStorage.username=undefined;
                   $localStorage.id=undefined;
                   $rootScope.user_login=undefined;
                      $rootScope.user_id= undefined;  
        $rootScope.user_type=undefined;
                      $rootScope.user_type= undefined; 
        
        $state.go('login');
    }
    }]);
