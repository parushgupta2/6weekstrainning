/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2017-06-16
  Created By: Parush Gupta
  Module : Manage Tutor
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('loginController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
   
  //For Step 1
  var data = {}; 
  var $serviceTest = $injector.get("login");
  $scope.full=true;
    
    $scope.chkuser=function()
    {
        if( $localStorage.id!=undefined)
           { $state.go('dashboard');
               $rootScope.user_login=$localStorage.username;
                      $rootScope.user_id= $localStorage.id;
           
           }
    
    }
    
  $scope.submitForm = function(){
      $scope.full=true;
	    var data=$scope.user;
       $serviceTest.login(data,function(response){
            
             if(response.code==200) {
                 if(response.result[0]!=undefined)
                 {
                   $localStorage.id=response.result[0].id;
                   
                    $state.go('dashboard');
			 }
                 else{
                  sweetAlert("No matching user found!!", " Try again or Signup", "error");
                 }
             }
		});
  }
 
  
 
});