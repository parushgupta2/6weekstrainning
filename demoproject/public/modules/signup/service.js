'use strict'; 

angular.module('alisthub').factory('signup', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  
  /*Webservice call for get all network*/
  url.signup = function(jsondata,callback){// get method example
      
      communicationService.resultViaPost(webservices.signup,appConstants.authorizationKey,headerConstants.json,jsondata,function(res,req){
      callback(res.data);
    });
  };


  

 
return url;
}]);
