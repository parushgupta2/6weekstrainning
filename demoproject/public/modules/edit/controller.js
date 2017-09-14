/**
  
  Created : 2017-06-16
  Created By: Parush Gupta
  Module : Manage Tutor
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('editController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
   
  //For Step 1
  var data = {}; 
  var $serviceTest = $injector.get("edit");
  $scope.user={"id":"","firstname":"","lastname":"","email":""};
  $scope.init=function(){
      
      $scope.setting=true;
      $scope.setting=true;
               $scope.df=true;
      $scope.dl=true;
       $scope.de=true; 
       if( $localStorage.id!=undefined)
           { 
          $rootScope.user_id= $localStorage.id;
      var data={"id":$rootScope.user_id};
      $serviceTest.getuserdetails(data,function(response){
                if(response.code==200){
                   $rootScope.user_login=response.result[0].firstname;
                    $scope.user.firstname=response.result[0].firstname;
                     $scope.user.lastname=response.result[0].lastname;
                     $scope.user.email=response.result[0].email;
                    $scope.filename=response.result[0].filename;
                         $rootScope.user_pic=response.result[0].filename;
                     $rootScope.user_pic="/images/"+ $rootScope.user_pic;
                    
                     if($rootScope.user_pic==="/images/null"||$rootScope.user_pic==="/images/undefined")
                        {
                             $rootScope.user_pic="/images/no-pic.jpg";
                        }
                  
                }
            
          
      });

           }
      else{
          $state.go("login");
      }
  }
  $scope.editl= function()
  {
      $scope.dl=false;
  }
    $scope.editf= function()
  {
      $scope.df=false;
  }
      $scope.edite= function()
  {
      $scope.de=false;
  }
  
      $scope.settings =function()
      {
          $scope.setting=false;
      }
      
         $scope.settings1 =function()
      {
          $scope.setting=true;
               $scope.df=true;
      $scope.dl=true;
       $scope.de=true;
      
      }
      
      
  $scope.submitForm2=function()
  {
      
           var data={"id":$rootScope.user_id};

      
      $serviceTest.getuserdetails(data,function(response){
                if(response.code==200){
                   
                         if(response.result[0].password!=$scope.user.oldpassword)
                                  {
                                   sweetAlert("Oops...", "Old Password doesn't matched", "error");
                                        }
                            else if($scope.user.newpassword!=$scope.user.new1password)
                                    {
                                        sweetAlert("Oops...", "You must enter the same new password twice", "error");
                                    }
                            else{
                                          $scope.user.id=$rootScope.user_id;
                                
                                        var data=$scope.user;
      
                                    $serviceTest.updatepas(data,function(response){
          
                                        if(response.code==200)
                                            {
                                                swal("Success", "Your Profile has been updated", "success");
                                                $state.go("dashboard");
                                                }});
                            }}});
  }
            
      
    
  
  
   $scope.submitForm=function()
  {
     
//      $scope.user.id=$rootScope.user_id;
//      var data=$scope.user;
//      
//      $serviceTest.update(data,function(response){
//          
//          if(response.code==200)
//              {
//                  $rootScope.user_login=$scope.user.firstname;
//             swal("Success", "Your Profile has been updated", "success");
//             
//              
//              }
//          
//          
//      });
      
       
       
       
       
       if($scope.myFile){
           console.log($scope.myFile);
            var file = $scope.myFile;
            var uploadUrl = "/multer";
            var fd = new FormData();

            fd.append('file', file);
            $http.post(uploadUrl,fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(req,res){
                   $scope.user.id=$rootScope.user_id;
                    var data=$scope.user;
                   data.filename = file.name;
                  $serviceTest.update(data,function(response){
          
          if(response.code==200)
              {
                  $rootScope.user_login=$scope.user.firstname;
             swal("Success", "Your Profile has been updated", "success");
             $state.go("dashboard");
              
              }
          
          
      });
            })
            .error(function(){
              console.log("error!!");
            });

}else   {
        $scope.user.id=$rootScope.user_id;
      var data=$scope.user;
         data.filename = $scope.filename;
      $serviceTest.update(data,function(response){
          
          if(response.code==200)
              {
                  $rootScope.user_login=$scope.user.firstname;
             swal("Success", "Your Profile has been updated", "success");
                  $state.go("dashboard");
             
              
              }
          
          
      });
  }
}}).directive('fileModel', ['$parse', function ($parse) {
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