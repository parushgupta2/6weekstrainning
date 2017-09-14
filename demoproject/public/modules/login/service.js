'use strict'; 

angular.module('alisthub').factory('login', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  
  /*Webservice call for get all network*/
  url.login = function(jsondata,callback){// get method example
      
      communicationService.resultViaPost(webservices.login,appConstants.authorizationKey,headerConstants.json,jsondata,function(res,req){
      callback(res.data);
    });
  };


  

 
return url;
}]);
