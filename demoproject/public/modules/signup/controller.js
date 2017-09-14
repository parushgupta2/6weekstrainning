/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2017-06-16
  Created By: Parush Gupta
  Module : Manage Tutor
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('signupController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
   
  //For Step 1
  var data = {}; 
  var $serviceTest = $injector.get("signup");
  
        $scope.chkuser=function()
    {
        if( $localStorage.id!=undefined)
           { $state.go('dashboard');
               $rootScope.user_login=$localStorage.username;
                      $rootScope.user_id= $localStorage.id;
           
           }
    
    }
    
    
    
    
    
  $scope.submitForm = function(){
	 
     
if($scope.myFile){
            var file = $scope.myFile;
            var uploadUrl = "/multer";
            var fd = new FormData();

            fd.append('file', file);
            $http.post(uploadUrl,fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(req,res){
                   var data=$scope.user;
                   data.filename = file.name;
                   $serviceTest.signup(data,function(response){

                         if(response.code==200) {

                           console.log(response);	
                             $state.go('login');
                         }
                    });
            })
            .error(function(){
              console.log("error!!");
            });

}else   {
       var data=$scope.user;
       $serviceTest.signup(data,function(response){
            
             if(response.code==200) {
                 
			   console.log(response);	
                 $state.go('login');
			 }
		});
  }
  }

   
  

}).directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);