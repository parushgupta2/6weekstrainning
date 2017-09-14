/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2017-06-16
  Created By: Parush Gupta
  Module : Manage Tutor
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('bookingController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
   
  //For Step 1
  var data = {}; 
  var $serviceTest = $injector.get("booking");
  $scope.ts=false;
  $scope.list=false;
  $scope.init=function(){
      
      
             if( $localStorage.id!=undefined)
           { 
               
          $rootScope.user_id= $localStorage.id;
          var data={"id":$rootScope.user_id};
     
               
               $scope.setSelected=function(){
                   data.tutor= $rootScope.teacher.id;
                   data.status=1;
                   data.student=$rootScope.user_id;
                   data.date=$scope.model;
                   console.log(data);
               $serviceTest.req(data,function(response){
                   if(response.code==200){
                       console.log("Request successfull");
                   }
               });
                   
               }
                 
                 
               
               
            
           
}
      else{
          $state.go("login");
      }
      
  }

  
  
});