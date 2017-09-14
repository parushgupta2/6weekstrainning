'use strict'; 

angular.module('alisthub').factory('dashboard', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  
  /*Webservice call for get all network*/
 
    url.getcampaignreportlistss = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getcampaignreportlistss,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
     url.getuserdetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getuserdetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
    
    url.reqteacher = function(jsondata,callback){
       communicationService.resultViaPost(webservices.reqteacher,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
  url.getrqstudnts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getrqstudnts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
    url.updatestatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.updatestatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
        url.acptstudnts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.acptstudnts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res){
       callback(res.data);
    });
  };
 
return url;
}]);
