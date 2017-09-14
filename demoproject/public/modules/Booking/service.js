'use strict'; 

angular.module('alisthub').factory('booking', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  
  /*Webservice call for get all network*/
 
  
    
    url.req = function(jsondata,callback){
       communicationService.resultViaPost(webservices.req,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
 
   url.getuserdetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getuserdetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  }; 
 
return url;
}]);
