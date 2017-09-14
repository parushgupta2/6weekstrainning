/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2017-06-16
  Created By: Parush Gupta
  Module : Manage Tutor
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('dashboardController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
   
  //For Step 1
  var data = {}; 
  var $serviceTest = $injector.get("dashboard");
  $scope.ts=false;
  $scope.list=false;
  $scope.init=function(){
      
      
             if( $localStorage.id!=undefined)
           { 
          $rootScope.user_id= $localStorage.id;
          var data={"id":$rootScope.user_id};
      $rootScope.user_type="";
      $serviceTest.getuserdetails(data,function(response){
                if(response.code==200){
                   $rootScope.user_login=response.result[0].firstname;
                       $rootScope.user_type=response.result[0].type;
                    console.log( $rootScope.user_type);
                    $rootScope.user_pic=response.result[0].filename;
                     $rootScope.user_pic="/images/"+ $rootScope.user_pic;
                
                       if($rootScope.user_type=='student'){
                           $scope.ts=true;
                   data.type="teacher";
               }
               else{
                   $scope.ts=false;
                   data.type="student";
                   
               }
                    
                     if(($rootScope.user_pic==="/images/null")||($rootScope.user_pic==="/images/undefined"))
                        {
                             $rootScope.user_pic="/images/no-pic.jpg";
                        }
                  
                    
                    
                    
                     $serviceTest.getcampaignreportlistss(data,function(response){
            
             if(response.code==200) {
                 $scope.user=response.result;
                
			     console.log(response);	
                 
			 }
		});
                }});
               
               $scope.setSelected=function(id){
                   console.log(id);
                   data.tutor=id;
               $serviceTest.reqteacher(data,function(response){
                   if(response.code==200){
                       console.log("Request successfull");
                       $rootScope.teacher=response.result[0];
                         $rootScope.teacher.filename="/images/"+ $rootScope.teacher.filename;
                        if(($rootScope.teacher.filename==="/images/null")||($rootScope.teacher.filename==="/images/undefined"))
                        {
                             $rootScope.teacher.filename="/images/no-pic.jpg";
                        }
                  
                       
                    console.log($scope.teacher.filename);
                   }
               });
                   
               }
                 $scope.setstatus=function(id,date,status){
                    data.tutor=$rootScope.user_id;
                   data.student=id;
                   data.status=status;
                   data.date=date;
               $serviceTest.updatestatus(data,function(response){
                   if(response.code==200){
                       console.log("Updated status");
                   }
               });
                   
               }
               
               $scope.rqstudnts=function(){
               $serviceTest.getrqstudnts(data,function(response){
               if(response.code=200){
               $scope.students=response.result;
               $scope.list=true;
                   $scope.listall=true;
               console.log(response.result);
          
                }});}
               
               $scope.listallreq=function(){
                $serviceTest.getrqstudnts(data,function(response){
               if(response.code=200){
               $scope.students=response.result;
               $scope.list=true;
                   $scope.listall=true;
               console.log(response.result);
          
                }});
                   $scope.acptpage=false; 
               }
               
               $scope.dshbrd=function(){
                $scope.list=false; 
                   $scope.listall=false;
                   $scope.acptpage=false; 
               }
                $scope.acpt=function(){
                $scope.acptpage=true;   
                   $scope.listall=false;
                    data.id=$rootScope.user_id;
                    data.status=2;
                      $serviceTest.acptstudnts(data,function(response){
               if(response.code=200){
               $scope.students=response.result;
               $scope.list=true;
               console.log(response.result);
          
                }});
                    
                    
                    
               }
                 $scope.decl=function(){
                $scope.acptpage=true; 
                        $scope.listall=false; 
                       data.id=$rootScope.user_id;
                    data.status=3;
                      $serviceTest.acptstudnts(data,function(response){
               if(response.code=200){
               $scope.students=response.result;
               $scope.list=true;
               console.log(response.result);
          
                }});
               }
               
               
                $scope.openrep = function() {
    $scope.popuprepo.opened = true;
  };
           
}
      else{
          $state.go("login");
      }
      
  }

  
  
});