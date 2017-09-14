'use strict'; 

angular.module('alisthub').factory('edit', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  
  /*Webservice call for get all network*/
 
    url.update = function(jsondata,callback){
       communicationService.resultViaPost(webservices.update,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
      url.getuserdetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getuserdetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
    
    
    url.updatepas=function(jsondata,callback){
    console.log(jsondata);
        communicationService.resultViaPost(webservices.updatepas,appConstants.authorizationKey,headerConstants.json,jsondata,function(res){
            callback(res.data);
        });
        
    };

 
return url;
}]);
