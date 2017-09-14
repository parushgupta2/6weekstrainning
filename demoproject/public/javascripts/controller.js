/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Get Network Budget 
*/
   
angular.module('alisthub', ['ui.bootstrap','angular-dayparts','angucomplete','angularjs-datetime-picker','ngTagsInput']).controller('facebookController', function($scope,$localStorage,$parse,$injector,$http,$state,$location,$filter,ngDialog,$sce,$timeout,$rootScope,$anchorScroll,$window,cfpLoadingBar,SweetAlert) {
   //For Step 1
  $anchorScroll();
  var $serviceTest = $injector.get("facebook");
  //var $servicecfpLoadingBar = $injector.get("cfpLoadingBar");
  $scope.after_login_footer_div = true;
  /*Define Time and Age dropdown values*/
  $scope.conversiontab=true;
  $scope.audience   = false;
  $scope.placementtab = false; 
  $scope.budgettab = false;
  $scope.format = "MM-dd-yyyy";
 
  // class
  $scope.conversiontabclass = "fa-caret-up";
  $scope.basictabclass= "fa-caret-down";
  $scope.placementtabclass = "fa-caret-down";
  $scope.budgettabclass = "fa-caret-down";
  $scope.gender = "All";
  $scope.placementselected= [];

  $scope.current =        0;
  $scope.max =            100;
  $scope.duration =       800;
  $scope.stroke =         8;
  $scope.radius =         70;
  $scope.isSemi =         false;
  $scope.currentColor =   '#801517';
  $scope.bgColor =        '#eaeaea';
  $scope.currentAnimation = 'easeOutCubic';
  $scope.animationDelay = 0;

  $scope.numpattern="(-?[0-9]+(\.[0-9]+)?)"


  $scope.getStyle = function(){
    var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
    return {
        'top': $scope.isSemi ? 'auto' : '93%',
        'bottom': $scope.isSemi ? '5%' : 'auto',
        'left': '49%',
        'transform': transform,
        '-moz-transform': transform,
        '-webkit-transform': transform,
        'font-size': $scope.radius/3.5 + 'px'
    };
};  
  
  

  if($localStorage.campaignid==undefined || $localStorage.campaignid ==''){
      $state.go('dashboard');
  }
  

  var range = [];  
  for(var i=13;i<66;i++) {
      range.push(i);
  }
  $scope.maxageranges = $scope.ageranges = range;
  
  $scope.weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Everyday'];

  $scope.weektimes = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];

  $scope.setradiusvalues = ["5","10","15","20","25","30","35","40","45","50"];
  $scope.location = undefined;
  $scope.states = '';
  $scope.dtargets = '';

  if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
  }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
      $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
  }
   
  $scope.bidtype = 0;
  $scope.bidmanual = false;
  $scope.deliverytypedata = "Standard";
  $scope.runads = "runalltime";
  $scope.hidelocalawerness = false;
  $scope.coversitionobjective = false;
  $scope.showadvancesche=false;
  $scope.CPMdel = true;
  $scope.CPCdel = true;
  $scope.setadverttime = false;
  $scope.manageschedule = 0;
  $scope.facebookpagelist = false;
  $scope.facebookeventlist = false;
  $scope.excludedetailpeople = false;
  $scope.budgettype ='Daily';
  $scope.minage = '18';
  $scope.maxage = '65+';
  $scope.budgetcount = '0';
  $scope.endBeforeStart = false;
  $scope.startBeforeCurrent = false;


    
  $scope.$watch('startdate', function(){
      validateDates();
  });

$scope.$watch('enddate', function(){
  validateDates();
});

$scope.showcustomdata = false;
$scope.showcustomaud = function(){
  if($scope.onoffswitch==true){
     $scope.showcustomdata = true;
   }   
   if($scope.onoffswitch==false){
      if($scope.includecustomaudiences.length<1 && $scope.excludecustomaudiences.length<1){
        $scope.showcustomdata = false;
      }else {
        $scope.checkeddata = 1;
        SweetAlert.swal("Message!", "Please remove selected custom audience data!", "error");        
      }    
   }
}
    

$scope.schd = {};

$scope.$watch('minage', function(){
  if($scope.minage !='' && $scope.minage != undefined){
    var minrange = $scope.minage;
    //getestimate($scope.minage,$scope.maxage);
    /*var maxrange = []; 
    minrange = +minrange + +1;
    for(var i=minrange;i<66;i++) {
        maxrange.push(i);
    }
    $scope.maxageranges = maxrange; */
  }
});

//console.log("$localStorage.selectday2", $localStorage.selectday);

$scope.$watch('maxage', function(){
  if($scope.maxage !=='' && $scope.maxage != undefined){
    var maxrange = $scope.maxage;
    //getestimate($scope.minage,$scope.maxage);
    /*var range = [];  
    for(var i=13;i<maxrange;i++) {
        range.push(i);
    }
    $scope.ageranges = range;*/
  }
});

$scope.onchangeestimate = function(){
  getestimate();
}
/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-18
  Created By: Lavlesh Mishra
  Module : Validate Ads Date
*/

function validateDates() {
    var endDate = $scope.enddate;
    var startDate = $scope.startdate;  
    var stdate = Date.parse(startDate);
    var currentdate = new Date().getTime();
    if(currentdate>stdate){
      $scope.startBeforeCurrent = true;
    }else {
      $scope.startBeforeCurrent = false;      
    } 
    if(endDate < startDate) {
        $scope.endBeforeStart = true;
    }else {
      $scope.endBeforeStart = false;
    }          
}
 
  var checkboxes = $("input[type='checkbox']");
  $scope.placementfil = 'yes';
  checkboxes.click(function() {
      if(!checkboxes.is(":checked")){
        $scope.placementfil = 'yes';      
      }else {
        $scope.placementfil = 'yes';
      }
  }); 
 

 /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : View Audience
*/

$scope.viewaudiance = function(newdata){  
    if(newdata == 'new'){
      $scope.showaudienacedropdown = true;
      $scope.showaudienacefield = false;
    }
    else {
      $scope.showaudienacedropdown = false;
      $scope.showaudienacefield = true;
    }
  }
  $scope.showscheduleddropdown = false;
  $scope.showaudienacefield = true;
  
 /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Format Date
*/

function formatDate(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var strTime = hours + ':' + minutes + ':' + seconds;
        var month = +today.getMonth() + +1;
        if(convertdate != '' && convertdate != undefined)
          return today.getFullYear() + "-" + month + "-" + today.getDate();
        else 
          return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
  }

  $scope.success_message = false;
  $scope.error_message = false;

  
  $scope.audtype = 'used';  
  $scope.locationtype = 'Includes';

 
  $scope.include = false;
  $scope.exclude = false;

  $scope.excludelocation = [];
  $scope.includelocation = [];


 /**
  Angular Controller to Add Location
  Created : 2016-05-17
  Created By: Regal Singh
  Module : select location
*/

$scope.locationselect = function(){  

    if($scope.locationtype=='Includes' && $scope.location != undefined && $scope.location != ''){
        if($scope.savedlocation=="" || $scope.savedlocation==undefined){
          $scope.savedlocation = $scope.location;
        }
        var getstring = $scope.savedlocation.split('<');
        if($scope.location.length>3){
          var newst = getstring[1].substr(23);      
          var data = newst.split('</span');
          var include_loc =  angular.toJson($scope.includelocation).indexOf(JSON.stringify({'title':getstring[0],'id':data[0]}));        
          if (include_loc <= -1) {
            $scope.includelocation.push({'title':getstring[0],'id':data[0]});
          }  
          $scope.savedlocation = '';
        }
                             
    } 
    else if($scope.locationtype=='Excludes' && $scope.location != undefined && $scope.location != ''){
        if($scope.location.length>3){
            var getstring = $scope.savedlocation.split('<');
            var newst = getstring[1].substr(23);      
            var data = newst.split('</span'); 
            var exclude_loc =  angular.toJson($scope.excludelocation).indexOf(JSON.stringify({'title':getstring[0],'id':data[0]}));     
            if (exclude_loc <= -1) {
              $scope.excludelocation.push({'title':getstring[0],'id':data[0]});
            }
            $scope.savedlocation = '';
        } 
    } 

    if(typeof $scope.excludelocation[0] != 'undefined') {
        $scope.exclude = true;
        $scope.location = '';
    }
    else $scope.exclude = false;

    if(typeof $scope.includelocation[0] != 'undefined') {
      $scope.include = true;
      $scope.location = '';
    }
    else $scope.include = false;

    // Estimated audience fixed data    
    getestimate();
 }

 $scope.interestlisting = [];
 $scope.interestshow = false;


/**
  Angular Controller to Delete Interest
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Interest Delete
*/


 $scope.delexcludelocation = function(index){
    $scope.excludelocation.splice(index, 1);
    getestimate();
 }

 $scope.delincludelocation = function(index){
    $scope.includelocation.splice(index, 1);
    getestimate();
 }



/* Added by Regal*/
  if($localStorage.networkid != undefined && $localStorage.networkid != '' ){
      var network_id = $localStorage.networkid;      
      var objectid = $localStorage.object_id;
      if($localStorage.object_id != undefined && $localStorage.object_id != '' ){
        $serviceTest.objectiveplacements(objectid,function(response) {
            if(response.code==200) {
              if(typeof response.result[0] != 'undefined') {
                $scope.objectplacement = response.result;                
                var networkid = response.result[0].placement;   
                //console.log(response.result[0]);
                $scope.billing_event = response.result[0].billing_events;
                $scope.optimization_goal = response.result[0].optimization_goal;

                $serviceTest.networkplacements(networkid,function(response) {
                    if(response.code==200){
                      $scope.placementlisting = response.result;
                      $scope.placementselection = [];
                      $scope.placementselectionvalues = [];
                      j = 0;
                      angular.forEach($scope.placementlisting, function(value, key){
                         $scope.placementselection[j] = value.title;
                         $scope.placementselectionvalues[j] = value.value;
                          j = j+1;
                      });
                      
                        if($scope.placementselected.length<1){
                          $scope.placementselected = $scope.placementselection;
                        }                      
                    }                   
                });
              }
            }
        }); 
      }      
    $serviceTest.connectiontype(1,function(response) {
        if(response.code==200) $scope.connectiontypes = response.result;
    });
  }

  if($localStorage.userId != undefined && $localStorage.userId != '' ){
      var user_id = $localStorage.userId;
      $serviceTest.existingaudiences(user_id,function(response) {
        if(response.code==200) $scope.existingaudiences = response.result;
      });
      // API for custom audience
      var postdata = {};
      postdata.user_id  = $localStorage.userId;
      postdata.network_id = 1;
      postdata.configureaccountid = $localStorage.configureaccountid;

      $serviceTest.getcustomaudience(postdata,function(response) {
        if(response.code==200){
            $scope.customaudiences = response.result.data;
        }
      });
  }

   
   $scope.$watch('selectaudience',function(){
    var audienceid  = $scope.selectaudience;
    if(audienceid != undefined){
      $serviceTest.selectaudience(audienceid.id,function(response) {
        if(response.code==200) {
          var existingaudience = response.result[0];
          $scope.include = true;
          $scope.exclude = true;

          if(existingaudience.network_id==2){            
            if(existingaudience.gendergroupselection!=''){
              var gender = JSON.parse(existingaudience.gendergroupselection);
              if(gender.indexOf("10")>-1 && gender.indexOf("11")>-1){$scope.gender = 'All';
              }else if(gender.indexOf("10")>-1){  $scope.gender = 'Male'; }
              else if(gender.indexOf("11")>-1){ $scope.gender = 'Female';}
            }
            if(existingaudience.agegroupselection!=''){
                var agegroup = JSON.parse(existingaudience.agegroupselection);
                if(agegroup.indexOf("503001")>-1){$scope.minage = '18';
                }else if(agegroup.indexOf("503002")>-1){ $scope.minage = '25';
                }else if(agegroup.indexOf("503003")>-1){ $scope.minage = '35';
                }else if(agegroup.indexOf("503004")>-1){ $scope.minage = '45';
                }else if(agegroup.indexOf("503005")>-1){ $scope.minage = '55';
                }else if(agegroup.indexOf("503006")>-1){$scope.minage = '64'; }

                if(agegroup.indexOf("503006")>-1){$scope.maxage = '65+';
                }else if(agegroup.indexOf("503005")>-1){ $scope.maxage = '64';
                }else if(agegroup.indexOf("503004")>-1){ $scope.maxage = '54';
                }else if(agegroup.indexOf("503003")>-1){ $scope.maxage = '44';
                }else if(agegroup.indexOf("503002")>-1){ $scope.maxage = '34';
                }else if(agegroup.indexOf("503001")>-1){$scope.maxage = '24'; }
            }
              $scope.includelocation = [];
              var includelocationnew = existingaudience.include_locations_title;
              if(includelocationnew != undefined && includelocationnew !=''){
                $scope.includelocationnew = JSON.parse(includelocationnew);                
                angular.forEach($scope.includelocationnew, function(value, key){
                    var gettitle = value.title.split(","); 
                    var postdata = {};
                    postdata.user_id  = $localStorage.userId;
                    postdata.network_id = 1;
                    postdata.id = gettitle[0];
                    postdata.configureaccountid = $localStorage.configureaccountid;                
                    $serviceTest.searchlocation(postdata,function(response) {
                    if(response.code==200) { 
                        var count1 = 0;
                        angular.forEach(response.result.data, function(value, key){
                          if(value.type=='city'){  
                              if(count1<1){
                                count1 = count1 +1; 
                                var id = value.key+'*'+value.country_code+"*"+value.type;                           
                                $scope.includelocation.push({'title':value.name,'id':id});
                            }
                          }    
                        });
                    }
                  });
                });
              } 


              $scope.excludelocation = [];
              var excludelocationnew = existingaudience.exclude_locations_title;
              if(excludelocationnew != undefined && excludelocationnew !=''){
                $scope.excludelocationnew = JSON.parse(excludelocationnew);                
                angular.forEach($scope.excludelocationnew, function(value, key){
                    var gettitle = value.title.split(",");
                    var postdata = {};
                    postdata.user_id  = $localStorage.userId;
                    postdata.network_id = 1;
                    postdata.id = gettitle[0];
                    postdata.configureaccountid = $localStorage.configureaccountid;
                    $serviceTest.searchlocation(postdata,function(response) {
                    if(response.code==200) { 
                        var count = 0;
                        angular.forEach(response.result.data, function(value, key){
                          if(value.type=='city'){ 
                            if(count<1){
                                count = count +1; 
                                var id = value.key+'*'+value.country_code+"*"+value.type;                          
                                $scope.excludelocation.push({'title':value.name,'id':id});
                            }
                          }    
                        });
                    }
                  });
                });
              }
           
 
          }else {
              var includelocation = existingaudience.include_locations_title;
              if(includelocation != undefined && includelocation != ''){
                  $scope.includelocation = JSON.parse(includelocation);
              } 
              var excludelocation = existingaudience.exclude_locations_title;
              if(excludelocation != undefined && excludelocation != ''){
                $scope.excludelocation = JSON.parse(excludelocation);
              } 

              var agegroup = existingaudience.agegroup.split("-");
              if(agegroup[0] != undefined) $scope.minage = agegroup[0];
              if(agegroup[1] != undefined) $scope.maxage = agegroup[1];
              
              $scope.gender = existingaudience.gender;
              $scope.agegroup = existingaudience.agegroup;
          }
          


          $scope.showincludecustomaudname = true;
          $scope.showexcludecustomaudname = true;
          var include_customaudiences = existingaudience.include_customaudiences;
          if(include_customaudiences != undefined && include_customaudiences!= '') {
            $scope.includecustomaudiences = JSON.parse(include_customaudiences);
          }
          var exclude_customaudiences = existingaudience.exclude_customaudiences;
          if(exclude_customaudiences != undefined && exclude_customaudiences != ''){
            $scope.excludecustomaudiences = JSON.parse(exclude_customaudiences);
          } 

         
                
          $scope.Includelocationdata = existingaudience.includelocationdata;
          $scope.showincludetargetselect = true;
          
          var include_targetpeoples = existingaudience.include_targetpeoples;
          if(include_targetpeoples != undefined && include_targetpeoples!= ''){
              $scope.includetargetpeoples = JSON.parse(include_targetpeoples);
          } 

          var exclude_targetpeoples = existingaudience.exclude_targetpeoples;
          if(exclude_targetpeoples != undefined && exclude_targetpeoples != ''){
            $scope.excludetargetpeoples = JSON.parse(exclude_targetpeoples);
            $scope.excludedetailpeople = true;
            $scope.showexcludetargetpeople = true;
          } 
          
          $scope.addconnectiontype = existingaudience.connection_type;
          $scope.connectpageid = existingaudience.facebookpagelist;
          if(existingaudience.facebookpagelist!=null){
            $scope.facebookpagelist = true;
          }
          $scope.connecteventid = existingaudience.facebookeventlist;
          if(existingaudience.facebookeventlist!=null){
            $scope.facebookeventlist = true;
          }
        }

      });
    }

  });

  $scope.schedules = [];

  /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-18
  Created By: Lavlesh Mishra
  Module : Delete Add More
*/

  $scope.delsch = function(index) {
    $scope.schedules.splice(index, 1);
  };

 /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : View Schedule
*/
$scope.schedules = [];
$scope.viewschedule = function(getsched){
     if(getsched=='scheduledtime'){
          $scope.showscheduleddropdown = true;
          if (typeof $scope.schedules[0] == 'undefined') 
            $scope.schedules.push({scheduleday:"Monday",schedulestarttime:"12:00 PM",scheduleendtime:"01:00 PM"});
          var index = $scope.schedules.length;
     }else {
        $scope.showscheduleddropdown = false;
        $scope.schedules = [];
     }
  }


  /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-18
  Created By: Lavlesh Mishra
  Module : addmoreschedule Function
*/
  $scope.addmoreschedule = function () {   
    $scope.schedules.push({scheduleday:"Monday",schedulestarttime:"12:00 PM",scheduleendtime:"01:00 PM"});
    var index = $scope.schedules.length; 
  }

  /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-24
  Created By: Regal Singh
  Module : save audience name
*/

  $scope.saveaudiencename = function () {
      var data = [];
      data.audience = {};
      if($scope.audiencename != undefined){
            data.audience.created = data.audience.modified = formatDate();
            data.audience.campaignid = $localStorage.campaignid;
            data.audience.audiencename =   $scope.audiencename;
            data.audience.network_id = $localStorage.networkid;
            data.audience.user_id   = $localStorage.userId;
            data.audience.includelocationdata = $scope.Includelocationdata;
            if($scope.includelocation != undefined){
              data.audience.include_locations_title   = JSON.stringify($scope.includelocation);
            } 
            if($scope.excludelocation != undefined){
              data.audience.exclude_locations_title   = JSON.stringify($scope.excludelocation);
            } 
            data.audience.campaign_id   = $localStorage.campaignid;
            data.audience.gender   = $scope.gender;
            data.audience.maxage = $scope.maxage;
            data.audience.minage = $scope.minage;

            if($scope.includecustomaudiences != undefined){                  
              data.audience.include_customaudiences  = JSON.stringify($scope.includecustomaudiences);

            } 
            if($scope.excludecustomaudiences != undefined){
              data.audience.exclude_customaudiences  = JSON.stringify($scope.excludecustomaudiences);
            } 

            if($scope.includetargetpeoples != undefined){
              data.audience.include_targetpeoples  = JSON.stringify($scope.includetargetpeoples);
            } 
            if($scope.excludetargetpeoples != undefined){
              data.audience.exclude_targetpeoples  = JSON.stringify($scope.excludetargetpeoples);
            } 

            data.audience.connection_type = $scope.addconnectiontype;
            data.audience.facebookpagelist = $scope.connectpageid;
            data.audience.facebookeventlist = $scope.connecteventid;

            $serviceTest.saveaudiencename(data.audience,function(response){
                  if(response.code==200){
                    $scope.placementbox = false;
                    SweetAlert.swal("Message!", "Audience has been Saved.", "success");
                  } 
                    
            });
      }else{
        SweetAlert.swal("Message!", "Please add audience details!");
      }
  }

   /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-19
  Created By: Regal Singh
  Module : Save Campaign Target, Location, Budget, Schedule
*/

  
 
  
  // toggle selection for a given employee by name
  $scope.toggleSelection = function(employeeName,empval) { 

     var idx = $scope.placementselection.indexOf(employeeName);     
     // is currently selected
     if (idx > -1) {
       $scope.placementselection.splice(idx, 1);
       $scope.placementselectionvalues.splice(idx, 1);
     } 
     // is newly selected
     else {
       $scope.placementselection.push(employeeName);
       $scope.placementselectionvalues.push(empval);
     }

     var idx1 = $scope.placementselectionvalues.indexOf(empval);     
     // is currently selected
     if (idx1 > -1) {      
       $scope.placementselectionvalues.splice(idx1, 1);
     } 
     // is newly selected
     else {      
       $scope.placementselectionvalues.push(empval);
     }
     $scope.placementselected = $scope.placementselection;
     getestimate();
   };




  $scope.submtcampaigndetails = function(){
    
      if($scope.budgetamount == undefined || $scope.budgetamount == null || $scope.budgetamount == ""){
        erroratsubmit("Please enter a number input!" , 'budgeterrorfb');
          }else if(isNaN($scope.budgetamount)){ console.log("isnan")
            erroratsubmit("Please enter a number input!" , 'budgeterrorfb');
          } else if($scope.bidtype == 1){
            $scope.onoffswitch1 = true;
           if($scope.bigamount == undefined || $scope.bigamount == null || $scope.bigamount == ""){
            erroratsubmit("Please enter a number input!" , 'bigamounterror');
          } else if(isNaN($scope.bigamount) || $scope.bigamount.indexOf(' ') >= 0){
            erroratsubmit("Please enter a number input!" , 'bigamounterror');
          } else {
            $scope.addcampaigndetails();
          } 
          }
           else{
           $scope.addcampaigndetails();
        }


    }
var erroratsubmit = function(errormessage , showerror){
        $scope.campaginerror = errormessage;
        $scope.numerrorempty = errormessage;
        var errmodel = $parse(showerror);
        errmodel.assign($scope, true);
        //document.getElementById("outrankshare").scrollIntoView(true);
            $timeout(function() {
            errmodel.assign($scope, false);
          }, 3000);

  }


  $scope.addcampaigndetails = function () {    
      //  cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      $scope.progressbardiv = 'progressbardiv';
      $rootScope.noscrollclass = 'noscroll';
      var currentdate = formatDate();
      var data = [];
      data.audience = {};
      data.placements = {};
      data.budget = {};
      data.creative = {};
      data.duration = {}
      data.schedule = {};
      data.adstype = {};
      if($localStorage.userId!=undefined && $localStorage.networkid!=undefined) {
          data.audience.detailtype = 'audience';
          data.placements.detailtype = 'placements';
          data.creative.detailtype = 'creative';
          data.budget.detailtype = 'budget';
          data.schedule.detailtype = 'schedule';
          data.duration.detailtype = 'duration';
          data.adstype.detailtype = 'adstype';

          data.adstype.network_id = data.duration.network_id =  data.budget.network_id = data.schedule.network_id = data.creative.network_id = data.placements.network_id = data.audience.network_id = $localStorage.networkid;
          
          data.adstype.campaign_id = data.duration.campaign_id =  data.budget.campaign_id = data.schedule.campaign_id = data.creative.campaign_id = data.placements.campaign_id = data.audience.campaign_id = $localStorage.campaignid;

          data.audience.created = data.audience.modified = formatDate();
          data.placements.created = data.placements.modified = formatDate();
          data.creative.created = data.creative.modified = formatDate();
          data.budget.created = data.budget.modified = formatDate();
          data.schedule.created = data.schedule.modified = formatDate();
          data.duration.created = data.duration.modified = formatDate();
          data.adstype.created = data.adstype.modified = formatDate();

          data.audience.network_id = $localStorage.networkid;
          
          data.audience.includelocationdata = $scope.Includelocationdata;
            if($scope.includelocation != undefined){
                data.audience.include_locations_title   = JSON.stringify($scope.includelocation);
            } 
            if($scope.excludelocation != undefined){
              data.audience.exclude_locations_title   = JSON.stringify($scope.excludelocation);
            } 
            data.audience.campaign_id   = $localStorage.campaignid;
            data.audience.gender   = $scope.gender;
            data.audience.maxage = $scope.maxage;
            data.audience.minage = $scope.minage;

            if($scope.includecustomaudiences != undefined){
              data.audience.include_customaudiences  = JSON.stringify($scope.includecustomaudiences);
            } 
            if($scope.excludecustomaudiences != undefined){
              data.audience.exclude_customaudiences  = JSON.stringify($scope.excludecustomaudiences);
            } 

            if($scope.includetargetpeoples != undefined){
              data.audience.include_targetpeoples  = JSON.stringify($scope.includetargetpeoples);
            } 
            if($scope.excludetargetpeoples != undefined){
              data.audience.exclude_targetpeoples  = JSON.stringify($scope.excludetargetpeoples);
            } 

            data.audience.connection_type = $scope.addconnectiontype;
            data.audience.facebookpagelist = $scope.connectpageid;
            data.audience.facebookeventlist = $scope.connecteventid;
      
            data.audience.conversitiontype = $scope.conversitiontype;
            data.audience.localawernesslocation = $scope.localawernesslocation;
            data.audience.radius = $scope.radiusval;
            data.audience.id = $scope.audiencetabelid;
          
            data.placements.placementfeeds = $scope.placementselection;           
             data.placements.id = $scope.placementtabelid;
            data.schedule.startdate = formatDate($scope.startdate);
            data.schedule.enddate = formatDate($scope.enddate);
            data.schedule.runads = $scope.runads;
            $scope.selar = [];
            angular.forEach($scope.schd.selectschdata, function(value, key){
              if(value!=""){
                var newday = value.split('-');
                if(newday[0]=='Monday'){ $scope.selar.push('0 - '+newday[1]); }
                if(newday[0]=='Tuesday'){ $scope.selar.push('1 - '+newday[1]); }
                if(newday[0]=='Wednesday'){ $scope.selar.push('2 - '+newday[1]); }
                if(newday[0]=='Thursday'){ $scope.selar.push('3 - '+newday[1]); }
                if(newday[0]=='Friday'){ $scope.selar.push('4 - '+newday[1]); }
                if(newday[0]=='Saturday'){ $scope.selar.push('5 - '+newday[1]); }
                if(newday[0]=='Sunday'){ $scope.selar.push('6 - '+newday[1]); }
              }
            });
            $localStorage.scheduleads = $scope.selar;
            $localStorage.showselectedschedule = $scope.schd.selectschdata;
            data.schedule.schedules = JSON.stringify($scope.schd.selectschdata);
            data.schedule.id = $scope.scheduletabelid;
            data.budget.paytype = $scope.paytype;
            data.budget.budgettype = $scope.budgettype;            
            data.budget.budgetamount = $scope.budgetamount;
            data.budget.bigamount = $scope.bigamount;
            data.budget.deliverytype = $scope.deliverytype;
            data.budget.bidtype = $scope.bidtype;
            data.budget.deliverytypedata = $scope.deliverytypedata;
            data.budget.id = $scope.budgettabelid;
            

            /*if($scope.runads=='runonschedule'){
                 var schedules = $scope.schedules;
                 if(schedules != undefined && schedules !='' ){
                    data.duration.schedules = schedules;
                  }
            }*/
    }
    
    // Manage Facebook campaign group
    var facebookcampaigndata = {};
    facebookcampaigndata.bidamount = $scope.bigamount;
    facebookcampaigndata.budgetamount = $scope.budgetamount;
    facebookcampaigndata.campiagnid = $localStorage.fbcampaignid;
    facebookcampaigndata.campaign_id = $localStorage.campaignid;
    facebookcampaigndata.object_id = $localStorage.object_id;
    if($localStorage.groupId!="" && $localStorage.groupId!=undefined){
    }else {
      facebookcampaigndata.start_time = formatcampaignDate($scope.startdate,$scope.starttime);
    }
    facebookcampaigndata.end_time =  formatcampaignDate($scope.enddate,$scope.endtime);
    if($scope.budgettype=='Daily') { var bdtp = 0; }else { var bdtp = 1;}
    facebookcampaigndata.bid_type = bdtp;
    facebookcampaigndata.billing_event = $scope.billing_event;
    facebookcampaigndata.optimizationgoal = $scope.optimization_goal; 
    facebookcampaigndata.page_types = $scope.placementselectionvalues;
    facebookcampaigndata.groupname = $localStorage.groupname;    
    facebookcampaigndata.Includelocationdata = $scope.Includelocationdata;
    facebookcampaigndata.addconnectiontype = $scope.addconnectiontype;
    facebookcampaigndata.connectpageid = $scope.connectpageid;
    facebookcampaigndata.connecteventid = $scope.connecteventid;
    facebookcampaigndata.manageschedule = $scope.manageschedule;
    facebookcampaigndata.deliverytype = $scope.deliverytype; 
    facebookcampaigndata.paytype = $scope.paytype;
    facebookcampaigndata.bidtype = $scope.bidtype;
    facebookcampaigndata.runads = $scope.runads;
    facebookcampaigndata.scheduleads= $localStorage.scheduleads;
    facebookcampaigndata.deliverytypedata = $scope.deliverytypedata;   
    facebookcampaigndata.minage = $scope.minage;
    facebookcampaigndata.maxage = $scope.maxage;  
    var gender = 0;
    if($scope.gender=='Male'){ gender = 1;}
    if($scope.gender=='Female'){ gender = 2;}      
    facebookcampaigndata.gender = parseInt(gender);      
    if($scope.placementselectionvalues!="" && $scope.placementselectionvalues!=undefined){
      facebookcampaigndata.pagetype = $scope.placementselectionvalues;
    }else{          
      facebookcampaigndata.pagetype = ["desktopfeed","rightcolumn","mobilefeed","instagramstream","mobileexternal"]; 
    }
    var interestlist = []; var behaviorslist = []; var demogrlist = [];
    if($scope.includetargetpeoples!=""){        
      
      angular.forEach($scope.includetargetpeoples, function(value, key){
          var getids = value.id.split('*');
          if(getids[1]=='Demographics'){ demogrlist.push({'id':getids[0],'name':value.title});}
          if(getids[1]=='Behaviors') { behaviorslist.push({'id':getids[0],'name':value.title}); }
          if(getids[1]=='Interests') { interestlist.push({'id':getids[0],'name':value.title}); }
      });        
    }
    facebookcampaigndata.interestlist = interestlist;
    facebookcampaigndata.behaviorslist = behaviorslist;
    facebookcampaigndata.demogrlist = demogrlist;
    var excestlist = []; 
    if($scope.excludetargetpeoples!=""){
      var lifeevent = []; var behavioevent = []; var interestevent = [];
      angular.forEach($scope.excludetargetpeoples, function(value, key){
          var getids = value.id.split('*');
          if(getids[1]=='Demographics'){ lifeevent.push({'id':getids[0],'name':value.title}); }
          if(getids[1]=='Behaviors') { behavioevent.push({'id':getids[0],'name':value.title}); }
          if(getids[1]=='Interests') { interestevent.push({'id':getids[0],'name':value.title}); }
      });
      excestlist = {"life_events":lifeevent,"interests":interestevent,"behaviors":behavioevent};        
    }
    facebookcampaigndata.excestlist = excestlist;
    var countrylist = ['US']; var citylist = []; var statelist = [];
    if($scope.includelocation!=""){          
        angular.forEach($scope.includelocation, function(value, key){
            var getids = value.id.split('*');
            if(getids[2]=='city') { citylist.push({'key':getids[0], 'radius':50, 'distance_unit':'mile'}); }
            if(getids[2]=='region') { statelist.push({'key':getids[0]}); }
            if(getids[2]=='country') { countrylist.push(getids[1]); }                          
        });
    }
   
    facebookcampaigndata.countrylist = countrylist;
    facebookcampaigndata.citylist = citylist;
    facebookcampaigndata.statelist = statelist;
    var excludecountrylist = ['US'];var excludecitylist = []; var excludestatelist = [];
    if($scope.excludelocation!=""){        
      angular.forEach($scope.excludelocation, function(value, key){
            var getids = value.id.split('*');
            if(getids[2]=='city') { excludecitylist.push({'key':getids[0], 'radius':50, 'distance_unit':'mile'}); }
            if(getids[2]=='region') { excludestatelist.push({'key':getids[0]}); }
            if(getids[2]=='country') { excludecountrylist.push(getids[1]);  }                          
      });       
    }
    facebookcampaigndata.excludecountrylist = excludecountrylist;
    facebookcampaigndata.excludecitylist = excludecitylist;
    facebookcampaigndata.excludestatelist = excludestatelist;
    if($scope.includecustomaudiences!=""){
      facebookcampaigndata.includecustomaudiences = $scope.includecustomaudiences;
    }
    if($scope.excludecustomaudiences!=""){
      facebookcampaigndata.excludecustomaudiences = $scope.excludecustomaudiences;
    }

    //$localStorage.facebookcampaigndata = facebookcampaigndata;
    $scope.setschedulearr = [];
    if($scope.budgettype =='Lifetime'){
      $scope.finalarr = [];  
      for(var i=0;i<25;i++) {
          $scope.finalarr[i] =[];
      }  
               
      angular.forEach(facebookcampaigndata.scheduleads, function(value1, key1){ 
          var gettime = value1.split(' - ');
          $scope.finalarr[gettime[1]].push(parseInt(gettime[0])); 
      });
      if($scope.finalarr!=undefined) {    
          angular.forEach($scope.finalarr, function(value, key){                     
              if(value.length>0){
                var starttime = parseInt(key)*60;
                var endtime = parseInt(starttime)+60;
                $scope.setschedulearr.push({"start_minute":parseInt(starttime),"end_minute":parseInt(endtime),"days":value});
              }
          });
      }
    }else {
      $scope.setschedulearr.push({"start_minute":0,"end_minute":1440,"days": [0,1,2,3,4,5,6]});
    }          
    facebookcampaigndata.setschedulearr = $scope.setschedulearr;
    //facebookcampaigndata.pagetypenew = ["desktopfeed","rightcolumn","mobilefeed","instagramstream","mobileexternal"]; 
    facebookcampaigndata.pagetypenew = facebookcampaigndata.pagetype;//["desktopfeed","rightcolumn","mobilefeed"]; 
    facebookcampaigndata.pageidval = $localStorage.facebookpageid;
    facebookcampaigndata.adsweburl = $scope.adsweburl;
    facebookcampaigndata.appid = $localStorage.fbappid;   
    facebookcampaigndata.lataddress = $localStorage.lataddress;
    facebookcampaigndata.lngaddress = $localStorage.lngaddress;
    facebookcampaigndata.address = $localStorage.address;
    facebookcampaigndata.addressradius = $scope.radiusval;
    facebookcampaigndata.pixelId = $localStorage.pixelId;

    if($localStorage.groupId!="" && $localStorage.groupId!=undefined){
      facebookcampaigndata.groupsetid = $localStorage.groupId;
    }
    //console.log(facebookcampaigndata); return false;
    $scope.current = 10;
    facebookcampaigndata.user_id  = $localStorage.userId;
    facebookcampaigndata.network_id = 1;
    facebookcampaigndata.configureaccountid = $localStorage.configureaccountid;

    $serviceTest.addcampaigngroup(facebookcampaigndata,function(response){
      if(response.result.id!=undefined) {
        $scope.current = 20;
        $localStorage.groupId = response.result.id;   
        $serviceTest.addcampaigndetails(data.audience,function(response){
          $scope.current = 40;
            $serviceTest.addcampaigndetails(data.budget,function(response){
              $scope.current = 60;
                  $serviceTest.addcampaigndetails(data.placements,function(response){
                    $scope.current = 80;
                    $serviceTest.addcampaigndetails(data.schedule,function(response){
                      $scope.current = 100;
                        //cfpLoadingBar.complete();
                        //return false;
                        $scope.loadingclass = ''; 
                        $scope.progressbardiv = ''; 
                        $rootScope.noscrollclass = ''; 
                        $state.go('adpreview'); 
                        $scope.current = 0;                          
                    });            
                  });                            
            });
        });
      }else if(response.result.success!=undefined){        
         $serviceTest.addcampaigndetails(data.audience,function(response){
           $scope.current = 20;
            $serviceTest.addcampaigndetails(data.budget,function(response){
               $scope.current = 50;
                  $serviceTest.addcampaigndetails(data.placements,function(response){
                     $scope.current = 75;
                    $serviceTest.addcampaigndetails(data.schedule,function(response){
                       $scope.current = 100;
                        //cfpLoadingBar.complete();
                        //return false;
                        $scope.loadingclass = ''; 
                        $scope.progressbardiv = ''; 
                        $rootScope.noscrollclass = ''; 
                        $state.go('adpreview');  
                        $scope.current = 0;                         
                    });            
                  });                            
            });
        });
        //return false;          
      }else {
        //cfpLoadingBar.complete();
        $scope.loadingclass = ''; 
        $scope.progressbardiv = ''; 
        $rootScope.noscrollclass = ''; 
        $scope.current = 0;
        if(response.result.error.error_user_msg!=undefined){

          SweetAlert.swal("",response.result.error.error_user_msg, "error");
        }else {
          SweetAlert.swal("","Location field is required", "error");

        }
        
      }
    });

  }

  

  /**
  Angular Controller to Run as schedule Function
  Created : 2016-05-24
  Created By: Lavlesh Mishra
  Module : Run as schedule Function
  */ 
  $localStorage.scheduleads = '';  
  

  /**
  Angular Controller to Search location
  Created : 2016-05-25
  Created By: Lavlesh Mishra
  Module : Search Location
  */
  $rootScope.states=[];
   $scope.$watch('location',function(){
    var locationsearch  = $scope.location;
    
    if(locationsearch != '' && locationsearch != undefined){
         if($scope.savedlocation!= '' && $scope.savedlocation!= undefined){
             var savedat = $scope.savedlocation;
             var index = savedat.toString().indexOf('<');
          }else {
            var index = -1;
          }

                 if(index<0 && locationsearch.length > 2){
                    var postdata = {};
                    postdata.user_id  = $localStorage.userId;
                    postdata.network_id = 1;
                    postdata.id = locationsearch;
                    postdata.configureaccountid = $localStorage.configureaccountid;
                      $serviceTest.searchlocation(postdata,function(response) {
                      if(response.code==200) {  
                      // var mymaxSuggestionListLength = 0;  
                      if(document.getElementById('location')!== undefined){
                        $scope.loc_hide=true;
                      }        
                         $scope.locationArr = [];
                          j = 0;    
                          angular.forEach(response.result.data, function(value, key){                
                            $scope.locationArr[j] = value.name+" <span class='hiddencls'>"+value.key+'*'+value.country_code+'*'+value.type+"</span><p class='manageright'>"+value.country_name+'('+value.type+")</p>";
                            j = j+1;  
                            //   mymaxSuggestionListLength += 1;
                            //   if(mymaxSuggestionListLength === 10){
                            //   break;
                            // }                      
                          });
                          $rootScope.statesArray = $scope.locationArr;                   
                               
                      }
                    });  
                 }
         


      }
 });

$scope.$watch('localawernesslocation',function(){
    var locationsearch  = $scope.localawernesslocation;
    
    if(locationsearch != '' && locationsearch != undefined){
         if($scope.savedlocation!= '' && $scope.savedlocation!= undefined){
             var savedat = $scope.savedlocation;
             var index = savedat.toString().indexOf('<');
          }else {
            var index = -1;
          }

                 if(index<0){
                      var postdata = {};
                      postdata.user_id  = $localStorage.userId;
                      postdata.network_id = 1;
                      postdata.id = locationsearch;
                      postdata.configureaccountid = $localStorage.configureaccountid;
                      $serviceTest.searchlocation(postdata,function(response) {
                      if(response.code==200) {  
                      // var mymaxSuggestionListLength = 0;  
                      if(document.getElementById('location')!== undefined){
                        $scope.loc_hide=true;
                      }        
                         $scope.locationArr = [];
                          j = 0;    
                          angular.forEach(response.result.data, function(value, key){                
                            $scope.locationArr[j] = value.name+" <span class='hiddencls'>"+value.key+'*'+value.country_code+'*'+value.type+"</span><p class='manageright'>"+value.country_name+'('+value.type+")</p>";
                            j = j+1;  
                            //   mymaxSuggestionListLength += 1;
                            //   if(mymaxSuggestionListLength === 10){
                            //   break;
                            // }                      
                          });
                          $rootScope.statesArray = $scope.locationArr;                   
                               
                      }
                    });  
                 }
         


      }
 });


$scope.data = {};
$scope.changedstarttime = function() {
      $scope.select_delect_event = false;
      $rootScope.startevent_time = $filter('date')($scope.starttime, 'shortTime');

    }
    //Ebd time change func
  $scope.changedendtime = function() {
      if ($scope.starttime !== '') {

        // if ($scope.data.eventtype === "single") {
          var stt = new Date("January 01, 2016 " + $scope.starttime);
          stt = stt.getTime();
          var endt = new Date("January 01, 2016 " + $scope.endtime);
          endt = endt.getTime();
          /*if (stt >= endt) {
            $scope.error_message = true;
            $scope.endtime = '';
            $scope.error = global_message.date_comparison;
            $scope.endtime = '';
            $timeout(function() {
              $scope.error = '';
              $scope.error_message = false;
            }, 3000);

          }*/
        // }
        $scope.select_delect_event = false;
        $rootScope.endevent_time = $filter('date')($scope.endtime, 'shortTime');
      } else {
        $scope.error_message = true;
        $scope.error = global_message.start_date;
        $scope.endtime = '';
        $timeout(function() {

          $scope.error = '';
          $scope.error_message = true;
        }, 3000);
      }

    }
// //////////////////////////////////////////
////////////////////////////////////////////



  var now = new Date();
  if (now.getMonth() === 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  // $scope.inlineOptions = {
  //   customClass: getDayClass,
  //   minDate: new Date(),
  //   showWeeks: true
  // };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',

    minDate: new Date(),
    startingDay: 1,
    showWeeks: false
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return '';

  }



  $scope.open1 = function() {
    //$scope.showWeeks = false;
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    //$scope.showWeeks = false;
    $scope.popup2.opened = true;
  };


  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };


  $scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };


   $scope.options = {
     //customClass: getDayClass,
     minDate: new Date(),
     showWeeks: false
   };

   $scope.options1 = {
    // customClass: getDayClass,
    // initDate: current,
     showWeeks: true
   };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  

  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = !$scope.ismeridian;
  };
  $scope.recurring_period = function(action) {
    var stt = new Date($scope.startdate);
    stt = stt.getTime();
    var endt = new Date($scope.enddate);
    endt = endt.getTime();

    if (stt >= endt) {
      $scope.error_message = true;
      $scope.enddate = '';
      $scope.error = global_message.endDateError;
      $timeout(function() {
        $scope.error = '';
        $scope.error_message = false;
      }, 3000);
    }

    if (($scope.startdate === undefined) || ($scope.enddate === undefined)) {
      if ((action === 'start') || (action === 'end')) {} else {
        $scope.error = "";
        $scope.error_message = true;
        $timeout(function() {

          $scope.error = '';
          $scope.error_message = false;
          $scope.data.period = '';
        }, 3000);
      }
    } else {
      if ($scope.data.period === 'daily') {
        $scope.dailyrecurring_div = true;
        $scope.weekly_div = $scope.monthly_div = $scope.days_div = true;

        $scope.rec_days_func();
      } 

      else if ($scope.data.period === 'weekly') {
        $scope.days_div = $scope.dailyrecurring_div = false;
        $scope.weekly_div = $scope.monthly_div = true;
      }

      else if ($scope.data.period === 'monthly') {
        $scope.weekly_div = $scope.days_div = true;
        $scope.monthly_div = $scope.dailyrecurring_div = false;
      }

      else if ($scope.data.period === 'yearly') {
        $scope.dailyrecurring_div = false;
        $scope.days_div = $scope.weekly_div = $scope.monthly_div = true;

        $scope.rec_year_func();
      }

    }

  }


 /**
  Angular Controller to API for detail targeting
  Created : 2016-05-25
  Created By: Lavlesh Mishra
  Module : detail targeting
  */
  
  
$scope.$watch('targetpeople',function(){
    var targetpeople  = $scope.targetpeople; 
    if(targetpeople!= '' && targetpeople!= undefined){
      if($scope.savedtargetpeople!= '' && $scope.savedtargetpeople!= undefined){
         var savedat = $scope.savedtargetpeople;
         var indext = savedat.toString().indexOf('<');
      }else {
        var indext = -1;
      }
      if(indext<0 && targetpeople.length > 2){
        var postdata = {};
        postdata.user_id  = $localStorage.userId;
        postdata.network_id = 1;
        postdata.id = targetpeople;
        postdata.configureaccountid = $localStorage.configureaccountid;
        $serviceTest.searchtarget(postdata,function(response) {
            if(response.code==200) {
              if(document.getElementById('hiddencls')!== undefined){                 
                $scope.include_tar = true;
              }
              $rootScope.targetArray = [];
              k = 0;             
              angular.forEach(response.result.data, function(value, key){                
                $rootScope.targetArray[k] = value.name+" <span class='hiddencls'>"+value.id+'*'+value.path[0]+"</span><p class='manageright'>"+value.path[0]+'('+value.audience_size+")</p>";              
                k = k+1;                                        
              });           
              $scope.dtargets = $rootScope.targetArray;  
            }
        });
      }
    } 
});

$scope.$watch('excludetargetpeople',function(){
   var targetpeoplex  = $scope.excludetargetpeople; 
      if(targetpeoplex != '' && targetpeoplex!= undefined){
        if($scope.savedexcludetargetpeople!= '' && $scope.savedexcludetargetpeople!= undefined){
           var savedat = $scope.savedexcludetargetpeople;
           var indexe = savedat.toString().indexOf('<');
        }else {
          var indexe = -1;
        }
        if(indexe<0 && targetpeoplex.length > 2){
          var postdata = {};
          postdata.user_id  = $localStorage.userId;
          postdata.network_id = 1;
          postdata.id = targetpeoplex;
          postdata.configureaccountid = $localStorage.configureaccountid;
          $serviceTest.searchtarget(postdata,function(response) {
            if(response.code==200) {
              $rootScope.excludeArray = [];                  
              k = 0;    
              if(document.getElementById('excludetargetpeople')!== undefined){
                $scope.exclude_tar = true;
              }
              angular.forEach(response.result.data, function(value, key){     
                $rootScope.excludeArray[k] = value.name+" <span class='hiddencls'>"+value.id+'*'+value.path[0]+"</span><p class='manageright'>"+value.path[0]+'('+value.audience_size+")</p>";              
                k = k+1;                               
              });           
              $scope.dtargets = $rootScope.excludeArray;  
            }
        });
      }
    }  
 });

/**
  Angular Controller to Manage Get Facebook Page API
  Created : 2016-05-26
  Created By: Lavlesh Mishra
  Module : Get Facebook Page API
*/

function formatDate(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var strTime = hours + ':' + minutes + ':' + seconds;
        var month = +today.getMonth() + +1;
        if(convertdate != '' && convertdate != undefined)
          return today.getFullYear() + "-" + month + "-" + today.getDate();
        else 
          return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
  }
  
     function formatcampaignDate(convertdate,time) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();
      
        var hours = time.split(' ');
        if(hours[1]=='AM'){
            var strTime = hours[0]+ ':00';
        }else{
          var newtime = hours[0].split(':');
          var hr = parseInt(newtime[0])+12;
          var strTime =  hr+":"+newtime[1]+':00';
        }
        
        var month = +today.getMonth() + +1;
        if(month<10){ month = 0+month;}
        return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
  }


  function formatonlyDate(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var dd = today.getDate();
        if(dd<10){ dd='0'+dd; }

        var month = +today.getMonth() + +1;
        
        if(month<10){  month='0'+month; } 

        if(convertdate != '' && convertdate != undefined)
          return month + "/" + dd + "/" +  today.getFullYear();
        else 
          return month + "/" + dd + "/" +  today.getFullYear();
  }

  function setcurrenttime(date){
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
  }

  function setdateformat(convertdate){      
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var month = months[today.getMonth()];
        return month + " " + today.getDate() + ", " +  today.getFullYear();
  }

/**
  Angular Controller to API for detail targeting
  Created : 2016-05-25
  Created By: Lavlesh Mishra
  Module : detail targeting
  */
  
  $scope.startdate = new Date(formatonlyDate());
  var d = new Date();
  var end = d.setDate(d.getDate() + 30);

  $scope.enddate = new Date(formatonlyDate(end));
  $scope.starttime = '08:00 AM';//setcurrenttime();
  $scope.endtime= '11:00 PM';//setcurrenttime();
  $scope.advertrundate = setdateformat($scope.enddate);

  $scope.$watch('budgettype',function(){
      var budgettype  = $scope.budgettype;    
      if(budgettype == 'Daily'){
        $scope.budgettypeval = false;
        $scope.showscheduleddropdown = false;
        $scope.budgetcount = calculatebudgets($scope.startdate,$scope.enddate,$scope.budgetamount,$scope.budgettype);
      }else {
        $scope.budgettypeval = true;
        $scope.budgetcount = $scope.budgetamount;
      } 
  });


$scope.bigamount=5;
$scope.budgetfun = function(){
    $scope.budgetcount = calculatebudgets($scope.startdate,$scope.enddate,$scope.budgetamount,$scope.budgettype); 
     if($scope.budgettype==='Daily'){
          if($scope.manageschedule === 0){
            var months = "";
            months = 1;
          }else {
            var months = "";
            if($scope.enddate>$scope.startdate){
           months = ($scope.enddate.getFullYear() - $scope.startdate.getFullYear())*12 + ($scope.enddate.getMonth() - $scope.startdate.getMonth())
         } 
        }  
      }else{
        months = 12;
      }      
      $rootScope.minbudget = eval(months*$scope.bigamount*15);
      $scope.budgetamount = $rootScope.minbudget;
      $scope.budgetinfo = true;
      $timeout(function() {
        $scope.budgetinfo = false;
            }, 3000);
  
  }
  $scope.checkbudget = function(){
     /*if($scope.budgetamount < $rootScope.minbudget){
         $scope.budgeterror = true;
      $timeout(function() {
        $scope.budgeterror = false;
            }, 3000);

      } else {
     $scope.budgeterror = false;

        
      }*/
    $scope.budgetcount = calculatebudgets($scope.startdate,$scope.enddate,$scope.budgetamount,$scope.budgettype);      
 
}

  $scope.$watch('startdate',function(){   
    $scope.budgetcount = calculatebudgets($scope.startdate,$scope.enddate,$scope.budgetamount,$scope.budgettype);      
  });

  $scope.$watch('enddate',function(){   
    $scope.budgetcount = calculatebudgets($scope.startdate,$scope.enddate,$scope.budgetamount,$scope.budgettype);  
    $scope.advertrundate = setdateformat($scope.enddate);    
  });

 

function calculatebudgets(startdate,enddate,amount,budgettype){   
    if(amount== undefined){
        return 0;
    }else {
      if(budgettype=='Daily'){
          if(startdate!= undefined && enddate!= undefined){
                var date1 = new Date(startdate);
                var date2 = new Date(enddate);
                var days = parseInt((date2 - date1) / (1000 * 60 * 60 * 24)); 
                return parseInt(days)*amount;
          }else {
              return amount;
          }  
      }else {
        return amount;
      }      
    }
}


/*Added BY Lavlesh*/

$scope.removeexclude = function(type){  
   if(type==0){ $scope.excludedetailpeople = true;  }
   if(type==1){ $scope.excludedetailpeople = false;  }
}

$scope.$watch('addconnectiontype',function(){
  var gettype = $scope.addconnectiontype;
  if(gettype=="1" || gettype=="2" || gettype=="0" ){
      $scope.facebookpagelist = true;
      var postdata = {};
      postdata.user_id  = $localStorage.userId;
      postdata.network_id = 1;
      postdata.configureaccountid = $localStorage.configureaccountid;
      $serviceTest.fbpageaccount(postdata,function(response) {
          if(response.code==200) {
              $scope.getpagelist = response.result.data;
              $scope.connectpageid =  $scope.getpagelist[0].id;             
          }
      });      
  }else { $scope.facebookpagelist = false;}

  if(gettype=="3" || gettype=="4" || gettype=="5" ){
      $scope.facebookeventlist = true;
      var postdata = {};
      postdata.user_id  = $localStorage.userId;
      postdata.network_id = 1;
      postdata.configureaccountid = $localStorage.configureaccountid;
      $serviceTest.fbpageevents(postdata,function(response) {
        if(response.code==200) {     
            $scope.eventresponsedata = response.result.data; 
            if($scope.eventresponsedata[0] != undefined){
              $scope.connecteventid = $scope.eventresponsedata[0].id; 
            } else{
              $scope.eventresponsedata = [{"id":"","name":"No Event Found"}];
            }          
            
        }
      });

  }else { $scope.facebookeventlist = false;}

})

$scope.$watch('manageschedule',function(){
    var getsch = $scope.manageschedule;
    if(getsch==1){ $scope.setadverttime = true;}else{ $scope.setadverttime = false; }
})

$scope.showschadvance = function(){  
   var type = $scope.onoffswitch1;   
   if(type==true){ 
     $scope.showadvancesche = true;  
   }else {
    $scope.showadvancesche = false;
   }
}


if($localStorage.object_id==1){
  $scope.deliveryoptions = [{"id":"LINK_CLICKS","val":"Link Clicks to Your Website"},{"id":"IMPRESSIONS","val":"Impressions"},{"id":"DAILY_UNIQUE_REACH","val":"Daily Unique Reach"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "LINK_CLICKS";
  $scope.paytype="Link Click (CPC)";
  $scope.chargetype = "Link Click (CPC)";
}

if($localStorage.object_id==3){
  $scope.deliveryoptions = [{"id":"POST_ENGAGEMENT","val":"Post Engagement"},{"id":"IMPRESSIONS","val":"Impressions"},{"id":"DAILY_UNIQUE_REACH","val":"Daily Unique Reach"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "Post Engagement";
  $scope.paytype="Post Engagement";
  $scope.chargetype = "Post Engagement";
}

if($localStorage.object_id==4){
  $scope.deliveryoptions = [{"id":"Page Likes","val":"Page Likes"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "Page Likes";
  $scope.paytype="Page Likes";
  $scope.chargetype = "Page Likes";
}

if($localStorage.object_id==15){
  $scope.deliveryoptions = [{"id":"CONVERSIONS","val":"Conversions"},{"id":"LINK_CLICKS","val":"Link Clicks to Your Website"},{"id":"IMPRESSIONS","val":"Impressions"},{"id":"DAILY_UNIQUE_REACH","val":"Daily Unique Reach"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "CONVERSIONS";
  $scope.paytype="Link Click (CPC)";
  $scope.chargetype = "Link Click (CPC)";
  $scope.coversitionobjective = true;
  $scope.CPCdel = false;
  var postdata = {};
  postdata.user_id  = $localStorage.userId;
  postdata.network_id = 1;
  postdata.configureaccountid = $localStorage.configureaccountid;

  $serviceTest.getfacebookpixcel(postdata,function(response) {   
    if(response.code==200) {
      $localStorage.pixelId = response.result.data[0].id;
    }
  });  

  $serviceTest.fbpageconversition(postdata,function(response) {   
    if(response.code==200) {
        $scope.conversitionlist = response.result.data;
        $scope.conversitionlistold = [{"id":"123544","name":"Initiate Checkout"},{"id":"123544","name":"Add Payment Info"},{"id":"123544","name":"Search"},{"id":"123544","name":"Lead"},{"id":"123544","name":"Complete Registration"},{"id":"123544","name":"View Content"},{"id":"123544","name":"Add to Basket"},{"id":"123544","name":"Add to Wishlist"},{"id":"123544","name":"Purchase"}];
        if($scope.conversitionlist!="")
          $scope.conversitiontype =  $scope.conversitionlist[0].id;
        else {
          $scope.conversitiontype =  $scope.conversitionlistold[0].id;
        }              
    }
  });
}


if($localStorage.object_id==10){
  $scope.deliveryoptions = [{"id":"VIDEO_VIEWS","val":"Video Views"},{"id":"DAILY_UNIQUE_REACH","val":"Daily Unique Reach"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "VIDEO_VIEWS";
  $scope.paytype="10-second video view";
  $scope.chargetype = "10-second video view";
}



if($localStorage.object_id==17){ 
  $scope.hidelocalawerness = true; 
  $scope.radiusval = "10";
  $scope.budgetamount = "200";
  $scope.showadvancesche = false;
  $scope.address = $localStorage.street_address;
}

if($localStorage.object_id==9){
  $scope.deliveryoptions = [{"id":"EVENT_RESPONSES","val":"Event Response"},{"id":"POST_ENGAGEMENT","val":"Post Engagement"},{"id":"IMPRESSIONS","val":"Impressions"},{"id":"DAILY_UNIQUE_REACH","val":"Daily Unique Reach"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "EVENT_RESPONSES";
  $scope.paytype="Post Engagement";
  $scope.chargetype = "Post Engagement";
  $scope.CPCdel = false;
}

if($localStorage.object_id==5){
  $scope.deliveryoptions = [{"id":"APP_INSTALLS","val":"App Installs"},{"id":"LINK_CLICKS","val":"Link Clicks"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "App Installs";
  $scope.paytype="App Installs";
  $scope.chargetype = "App Installs";  
}
if($localStorage.object_id==16){
  $scope.deliveryoptions = [{"id":"LINK_CLICKS","val":"Link Clicks to Your Website"},{"id":"APP_EVENTS","val":"App Events"},{"id":"DAILY_UNIQUE_REACH","val":"Daily Unique Reach"}];
  $scope.bigamount = "3.78";
  $scope.budgetamount = "200";
  $scope.deliverytype = "LINK_CLICKS";
  $scope.paytype="Link Click (CPC)";
  $scope.chargetype = "Link Click (CPC)";  
}



$scope.$watch('deliverytype',function(){
    var deliverytypeval = $scope.deliverytype;   
    if(deliverytypeval=='LINK_CLICKS'){ 
      $scope.paytype="Link Click (CPC)";
      $scope.CPMdel = true;
      $scope.CPCdel = true;
      $scope.bidtypemsg= "per link click";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
    if(deliverytypeval=='POST_ENGAGEMENT'){ 
      $scope.paytype="Post Engagement";
      if($localStorage.object_id==9){ $scope.CPMdel = false; }else { $scope.CPMdel = true;}
      $scope.CPCdel = true;
      $scope.bidtypemsg= "per post engagement";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
    if(deliverytypeval=='EVENT_RESPONSES'){ 
      $scope.paytype="CPM";
      $scope.CPMdel = true;
      $scope.CPCdel = false;
      $scope.bidtypemsg= "per 1,000 impressions";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
    if(deliverytypeval=='VIDEO_VIEWS'){ 
      $scope.paytype="10-second video view";
      $scope.CPMdel = true;
      $scope.CPCdel = true;
      $scope.bidtypemsg= "per video views";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
    if(deliverytypeval=='CONVERSIONS'){ 
      $scope.paytype="Conversions";
      $scope.CPMdel = true;
      $scope.CPCdel = false;
      $scope.bidtypemsg= "per results";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
    if(deliverytypeval=='IMPRESSIONS'){ 
      $scope.paytype="CPM";
      $scope.CPMdel = true;
      $scope.CPCdel = false;
      $scope.bidtypemsg= "per 1,000 impressions";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
    if(deliverytypeval=='DAILY_UNIQUE_REACH'){ 
      $scope.paytype="CPM";
      $scope.CPMdel = true;
      $scope.CPCdel = false;
      $scope.bidtypemsg= "per 1,000 impressions";
      $scope.bidmanual = false;
      $scope.bidtype = 0;
    }
})



$scope.$watch('paytype',function(){
    var paytypeval = $scope.paytype;   
    if(paytypeval=='CPM'){       
      $scope.bidtypemsg= "per 1,000 impressions";
    }
    if(paytypeval=='Link Click (CPC)'){       
      $scope.bidtypemsg= "per link click";
    }
    if(paytypeval=='Post Engagement'){       
      $scope.bidtypemsg= "per post engagement";
    }
    if(paytypeval=='Page Likes'){       
      $scope.bidtypemsg= "per page like";
    }
    if(paytypeval=='10-second video view'){       
      $scope.bidtypemsg= "per video view";
    }
    
})



$scope.$watch('bidtype',function(){
    var bidtypeval = $scope.bidtype;   
    if(bidtypeval=='0'){ 
      $scope.bidmanual = false;
    }
    if(bidtypeval=='1'){ 
      $scope.bidmanual = true;
    }    
})

// Toggle Function
$scope.audienceboxtabclass = "fa-caret-down";
$scope.placementboxtabclass=  $scope.budgetboxtabclass = "fa-caret-up";
$scope.audiencebox = false;
$scope.placementbox = $scope.budgetbox = true;

$scope.toggleCustom = function(boxname) {
   $scope.actiononbox = 1;

  /*if(boxname == "budgetbox"){
      if($scope.budgetamount == undefined || $scope.budgetamount == null || $scope.budgetamount == ""){ console.log("value to be changed")
          $scope.actiononbox = 0;
         } else if(isNaN($scope.budgetamount) || $scope.budgetamount.indexOf(' ') >= 0){
            $scope.actiononbox = 0;
            } else if($scope.bidtype == 1){
                if($scope.bigamount == undefined || $scope.bigamount == null || $scope.bigamount == "" ){
                      $scope.actiononbox = 0;
                  } else if(isNaN($scope.bigamount) || $scope.bigamount.indexOf(' ') >= 0){
                    $scope.actiononbox = 0;
                  } else{
                     $scope.actiononbox = 1;
                    }
              }else{
               $scope.actiononbox = 1;
              }
      }else{
        $scope.actiononbox = 1;
      }*/

          if($scope.actiononbox == 1){
            var tabname = boxname+"tabclass";
            var tabmodel = $parse(tabname);
            if($scope[boxname]===false){
              $scope[boxname] = true;
              tabmodel.assign($scope, 'fa-caret-up');
            }else{
              $scope[boxname] = false;
              tabmodel.assign($scope, 'fa-caret-down');
            }
        }
        else{
          SweetAlert.swal("", "Please fill empty fields or valid inputs!", "error");
        }
}

function togglesetting(boxname){
  var tabname = boxname+"tabclass";
  var tabmodel = $parse(tabname);
  if($scope[boxname]===false){
    $scope[boxname] = true;
    tabmodel.assign($scope, 'fa-caret-up');
  }else{
    $scope[boxname] = false;
    tabmodel.assign($scope, 'fa-caret-down');
  }
}


 /*======================================================================*/
var eventParent=function()
{
  var eventdata={"value":"none"};
  $serviceTest.getEventData(eventdata,function(response){
              if(response.code==200){
                $scope.parentData=response.result;

              }else{
                $scope.errormessage = global_message.networkError;

              }
        });
}
eventParent();
$scope.eventListChild=function()
{
var eventChildData={"value":$scope.events.id, "value1":"null"};
  $serviceTest.getEventData(eventChildData,function(response){
              if(response.code==200){
                $scope.childData=response.result;
              }else{
                $scope.errormessage = global_message.networkError;
              }
        });
}

$scope.eventListSubChild=function()
{
  $serviceTest.getEventData($scope.events,function(response){
              if(response.code==200){
                $scope.subChildData= response.result;
              }else{
                $scope.errormessage = global_message.networkError;
              }
        });
}

function setestimate(){
     // Estimated audience fixed data
      if($scope.gender=='Male'){ 
        $scope.reachestimate = Math.floor((Math.random() * 9000000) + 4700000);
      }
      if($scope.gender=='Female'){ 
       $scope.reachestimate = Math.floor((Math.random() * 9000000) + 5700000);
      } 
      if($scope.gender=='All'){ 
        $scope.reachestimate = Math.floor((Math.random() * 19100000) + 10100000);     
      } 
}

/**
  Angular Controller to custom audience
  Created : 2016-06-06
  Created By: Lavlesh Mishra
  Module : select custom audience
*/
$scope.includecustomaudiences = [];
$scope.excludecustomaudiences = [];
$scope.customaudtypetype = 'Includes';
$scope.Includelocationdata = "Everyone in this location";
$scope.customaudeience = '0';
$scope.customaudienceselect = function(){  
    if($scope.customaudtypetype=='Includes' && $scope.customaudeience != undefined && $scope.customaudeience != ''){
        if($scope.excludecustomaudiences.indexOf($scope.customaudeience)==-1 && $scope.includecustomaudiences.indexOf($scope.customaudeience)==-1){
            $scope.includecustomaudiences.push($scope.customaudeience);
        }else {
          SweetAlert.swal("Message!", "Already added");
        }      
    } 
    else if($scope.customaudtypetype=='Excludes' && $scope.customaudeience != undefined && $scope.customaudeience != ''){

          if($scope.excludecustomaudiences.indexOf($scope.customaudeience)==-1 && $scope.includecustomaudiences.indexOf($scope.customaudeience)==-1){
                $scope.excludecustomaudiences.push($scope.customaudeience);
          }else {
              SweetAlert.swal("Message!", "Already added");
          }
        
    }

    if(typeof $scope.excludecustomaudiences[0] != 'undefined') { 
     $scope.showexcludecustomaudname = true;//$scope.customaudeience = '';
    } else { $scope.showexcludecustomaudname = false; }

    if(typeof $scope.includecustomaudiences[0] != 'undefined') { 
      $scope.showincludecustomaudname = true; //$scope.customaudeience = '';
    } else { $scope.showincludecustomaudname = false; }

    getestimate();
}
$scope.delexcludecustomaud = function(index){ $scope.excludecustomaudiences.splice(index, 1); getestimate(); }
$scope.delincludecustomaud = function(index){ $scope.includecustomaudiences.splice(index, 1);  getestimate(); }




$scope.includetargetpeoples = [];
$scope.excludetargetpeoples = [];
$scope.saveincludetargetselect = function(){    
    if($scope.targetpeople != undefined && $scope.targetpeople != ''){ 
        if($scope.savedtargetpeople=="" || $scope.savedtargetpeople==undefined){
          $scope.savedtargetpeople = $scope.targetpeople;
        }
        var getstring = $scope.savedtargetpeople.toString().split('<');
        var newst = getstring[1].substr(23);      
        var data = newst.split('</span'); 

        var indxcludetargetp =  angular.toJson($scope.includetargetpeoples).indexOf(JSON.stringify({'title':getstring[0],'id':data[0]}));
          if (indxcludetargetp <= -1) {    
        $scope.includetargetpeoples.push({'title':getstring[0],'id':data[0]}); 
      }
        $scope.savedtargetpeople = '';     
    } 
    if(typeof $scope.includetargetpeoples[0] != 'undefined') { $scope.showincludetargetselect = true; $scope.targetpeople = '';
    } else { $scope.showincludetargetselect = false; }
    
    getestimate();
}

$scope.saveexcludetargetselect = function(){   
    
    if($scope.excludetargetpeople != undefined && $scope.excludetargetpeople != ''){
        // Estimated audience fixed data
        if($scope.savedexcludetargetpeople=="" || $scope.savedexcludetargetpeople==undefined){
          $scope.savedexcludetargetpeople = $scope.excludetargetpeople;
        }
        var getstring = $scope.savedexcludetargetpeople.toString().split('<');
        var newst = getstring[1].substr(23);      
        var data = newst.split('</span');  

        var indxexcludetargetp =  angular.toJson($scope.excludetargetpeoples).indexOf(JSON.stringify({'title':getstring[0],'id':data[0]}));
        if (indxexcludetargetp <= -1) {
        $scope.excludetargetpeoples.push({'title':getstring[0],'id':data[0]});}
        $scope.savedexcludetargetpeople = '';        
    } 
    if(typeof $scope.excludetargetpeoples[0] != 'undefined') {  $scope.showexcludetargetpeople = true;$scope.excludetargetpeople = '';
    } else { $scope.showexcludetargetpeople = false; }
    getestimate();
}

$scope.delexcludetargetpeople = function(index){ $scope.excludetargetpeoples.splice(index, 1); getestimate(); }
$scope.delincludetargetselect = function(index){ $scope.includetargetpeoples.splice(index, 1);  getestimate(); }



// Manage Back data
if($localStorage.campaignid != undefined && $localStorage.campaignid != '' ){
      $serviceTest.showcampaignnetwork($localStorage.campaignid,function(response){
        if(response.code==200){
              if(typeof response.result[0] != 'undefined') {                  
                  $scope.groupname = response.result[0].groupname;
                  $scope.shwtitle = response.result[0].title;
                  $scope.shwobjtive = response.result[0].network_objective_id;
                  $localStorage.groupname = response.result[0].groupname;
                  if($localStorage.fbcampaignid==undefined){
                      $localStorage.fbcampaignid = response.result[0].fbcampaign_id; 
                  }
                  console.log($localStorage.fbcampaignid); 
              }
            }
      });
      
      $serviceTest.showcampaignaudiencedata($localStorage.campaignid,function(response){
        if(response.code==200){
              if(typeof response.result[0] != 'undefined') {                         
                    var existingaudience = response.result[0];                    
                    var includelocation = existingaudience.include_locations_title;
                    if(includelocation != undefined && includelocation !=''){
                      $scope.include = true;
                      $scope.includelocation = JSON.parse(includelocation);
                    } 
                    var excludelocation = existingaudience.exclude_locations_title;
                    if(excludelocation != undefined && excludelocation != ''){
                      $scope.exclude = true;
                      $scope.excludelocation = JSON.parse(excludelocation);
                    } 

                    $scope.radiusval = existingaudience.radius;               
                    var include_customaudiences = existingaudience.include_customaudiences;
                    if(include_customaudiences != undefined && include_customaudiences!= '') {
                        $scope.showincludecustomaudname = true;
                        $scope.includecustomaudiences = JSON.parse(include_customaudiences);
                        $scope.checkeddata =1;
                        $scope.showcustomdata = true;                        
                    } 
                    var exclude_customaudiences = existingaudience.exclude_customaudiences;
                    if(exclude_customaudiences != undefined && exclude_customaudiences != ''){
                      $scope.excludecustomaudiences = JSON.parse(exclude_customaudiences);
                      $scope.showexcludecustomaudname = true;
                      $scope.checkeddata =1;
                      $scope.showcustomdata = true;
                    } 
                  
                    $scope.audiencetabelid = existingaudience.id;
                    var agegroup = existingaudience.agegroup.split("-");
                    if(agegroup[0] != undefined) $scope.minage = agegroup[0];
                    if(agegroup[1] != undefined) $scope.maxage = agegroup[1];
                    
                    if(existingaudience.gender!="" && existingaudience.gender!=null){ 
                      $scope.gender = existingaudience.gender;
                    }
                    
                    // estimate api
                    getestimate();
                      
                    if(existingaudience.includelocationdata!="" && existingaudience.includelocationdata!=null){                   
                      $scope.Includelocationdata = existingaudience.includelocationdata;
                    }
                    
                    
                    var include_targetpeoples = existingaudience.include_targetpeoples;
                    if(include_targetpeoples != undefined && include_targetpeoples != ''){
                      $scope.showincludetargetselect = true; 
                      $scope.includetargetpeoples = JSON.parse(include_targetpeoples);  
                    } 

                    var exclude_targetpeoples = existingaudience.exclude_targetpeoples;
                    if(exclude_targetpeoples != undefined && exclude_targetpeoples != ''){
                      $scope.excludetargetpeoples = JSON.parse(exclude_targetpeoples);
                      $scope.excludedetailpeople = true;
                      $scope.showexcludetargetpeople = true;
                    } 

                    if(existingaudience.connection_type!="" && existingaudience.connection_type!=null){
                      $scope.addconnectiontype = existingaudience.connection_type;
                    }
 
                    if(existingaudience.facebookpagelist!="" && existingaudience.facebookpagelist!=null){
                      
                      if(existingaudience.facebookpagelist!=null){
                        var postdata = {};
                        postdata.user_id  = $localStorage.userId;
                        postdata.network_id = 1;
                        postdata.configureaccountid = $localStorage.configureaccountid;
                        $serviceTest.fbpageaccount(postdata,function(response) {
                  if(response.code==200) {
                        $scope.getpagelist = response.result.data;
                        $scope.connectpageid = existingaudience.facebookpagelist;             
                  }
                }); 
                        $scope.facebookpagelist = true;
                      }
                    }
                    if(existingaudience.facebookeventlist!="" && existingaudience.facebookeventlist!=null){
                      
                      if(existingaudience.facebookeventlist!=null){
                          var postdata = {};
                          postdata.user_id  = $localStorage.userId;
                          postdata.network_id = 1;
                          postdata.configureaccountid = $localStorage.configureaccountid;
                          $serviceTest.fbpageevents(postdata,function(response) {
                    if(response.code==200) {     
                        $scope.eventresponsedata = response.result.data; 
                        $scope.connecteventid = existingaudience.facebookeventlist;
                    }
                });
                          $scope.facebookeventlist = true;
                      } 
                    }                                      
                }else {
                  getestimate();
                }
            }
      });


      $serviceTest.showcampaignplacementdata($localStorage.campaignid,function(response){
        if(response.code==200){
              if(typeof response.result[0] != 'undefined') {                         
                  var existingplacement = response.result[0];                  
                  if(existingplacement.device_platform!="" && existingplacement.device_platform!=null){
                      //$scope.placementselected = JSON.parse(existingplacement.device_platform);  
                      $scope.placementtabelid = existingplacement.id;
                  }             
                }
            }
      });

      $serviceTest.showcampaignbudgetdata($localStorage.campaignid,function(response){
        if(response.code==200){
              if(typeof response.result[0] != 'undefined') {
              if($localStorage.object_id==17){  $scope.showadvancesche = false; }else { $scope.showadvancesche = true; }

                    var existingbudget = response.result[0];
                    $scope.budgettabelid = existingbudget.id;                  
                    if(existingbudget.network_budget!="" && existingbudget.network_budget!=null){
                        $scope.budgetamount = existingbudget.network_budget;  
                    }
                    if(existingbudget.budget_type!="" && existingbudget.budget_type!=null){
                        $scope.budgettype = existingbudget.budget_type;  
                    }
                    if(existingbudget.pay_type!="" && existingbudget.pay_type!=null){
                        $scope.paytype = existingbudget.pay_type;  
                    }

                    if(existingbudget.pay_type!="" && existingbudget.pay_type!=null){
                        $scope.paytype = existingbudget.pay_type;  
                    }
                    if(existingbudget.bigamount!="" && existingbudget.bigamount!=null){
                        $scope.bigamount = existingbudget.bigamount;  
                    }
                    if(existingbudget.deliverytype!="" && existingbudget.deliverytype!=null){
                        $scope.deliverytype = existingbudget.deliverytype;  
                    }
                    if(existingbudget.bidtype!="" && existingbudget.bidtype!=null){
                        $scope.bidtype = existingbudget.bidtype; 

                        if(existingbudget.bidtype=='1'){                           
                          $scope.bidmanual = true;
                        } 
                    }
                    if(existingbudget.deliverytypedata!="" && existingbudget.deliverytypedata!=null){
                        $scope.deliverytypedata = existingbudget.deliverytypedata;  
                    }             
                }
            }
      });


        $serviceTest.showcampaignschedulingdata($localStorage.campaignid,function(response){

            if(response.code==200){
              if(typeof response.result[0] != 'undefined') {                         
                   var existingschedule = response.result[0];
                   $scope.scheduletabelid = existingschedule.id;
                   if(existingschedule.start_date!="" && existingschedule.start_date!=null){
                        $scope.startdate = new Date(existingschedule.start_date); 
                        $scope.setadverttime = true;
                        $scope.manageschedule = 1; 
                   }
                   if(existingschedule.end_date!="" && existingschedule.end_date!=null){
                        $scope.enddate = new Date(existingschedule.end_date);  
                   }
                   if(existingschedule.scheduling_type!="" && existingschedule.scheduling_type!=null){
                      $scope.runads = existingschedule.scheduling_type;
                      if(existingschedule.scheduling_type=='runonschedule'){
                          $scope.showscheduleddropdown = true; 
                      }                      
                   }                   
                   if(existingschedule.schedules!="" && existingschedule.schedules!=null){
                      $localStorage.showselectedschedule = JSON.parse(existingschedule.schedules);
                   }         
                }
            }
        });

    }

//$scope.selectedval = '';
    //if($scope.minage=="") { $scope.minage = 18;}

   // Function to get user estimates
    function getestimate(){
      var postestimate = {};    
      postestimate.minage = $scope.minage;
      postestimate.maxage = $scope.maxage;     
      postestimate.budgetamount = $scope.budgetamount;
      
      var gender = 0;
      if($scope.gender=='Male'){ gender = 1;}
      if($scope.gender=='Female'){ gender = 2;}      
      postestimate.gender = parseInt(gender);
      if($scope.optimization_goal!="" && $scope.optimization_goal!=undefined){        
        postestimate.optimizationgoal = $scope.optimization_goal; 
      }else {
        postestimate.optimizationgoal = 'OFFSITE_CONVERSIONS';
      } 
      
      if($scope.placementselectionvalues!="" && $scope.placementselectionvalues!=undefined){
        postestimate.pagetype = $scope.placementselectionvalues;
      }else{          
        postestimate.pagetype = ["desktopfeed","rightcolumn","mobilefeed","instagramstream","mobileexternal"]; 
      }
      var interestlist = []; var behaviorslist = []; var demogrlist = [];
      if($scope.includetargetpeoples!=""){    
        
        angular.forEach($scope.includetargetpeoples, function(value, key){
            var getids = value.id.split('*');
            if(getids[1]=='Demographics'){ demogrlist.push({'id':getids[0],'name':value.title});}
            if(getids[1]=='Behaviors') { behaviorslist.push({'id':getids[0],'name':value.title}); }
            if(getids[1]=='Interests') { interestlist.push({'id':getids[0],'name':value.title}); }
        });        
      }
      postestimate.interestlist = interestlist;
      postestimate.behaviorslist = behaviorslist;
      postestimate.demogrlist = demogrlist;
      var excestlist = []; 
      if($scope.excludetargetpeoples!=""){
        var lifeevent = []; var behavioevent = []; var interestevent = [];
        angular.forEach($scope.excludetargetpeoples, function(value, key){
            var getids = value.id.split('*');
            if(getids[1]=='Demographics'){ lifeevent.push({'id':getids[0],'name':value.title}); }
            if(getids[1]=='Behaviors') { behavioevent.push({'id':getids[0],'name':value.title}); }
            if(getids[1]=='Interests') { interestevent.push({'id':getids[0],'name':value.title}); }
        });
        excestlist = {"life_events":lifeevent,"interests":interestevent,"behaviors":behavioevent};        
      }
      postestimate.excestlist = excestlist;
      var countrylist = ['US']; var citylist = []; var statelist = [];
      if($scope.includelocation!=""){          
          angular.forEach($scope.includelocation, function(value, key){
              var getids = value.id.split('*');
              if(getids[2]=='city') { citylist.push({'key':getids[0]}); }
              if(getids[2]=='region') { statelist.push({'key':getids[0]}); }
              if(getids[2]=='country') { countrylist.push(getids[1]); }                          
          });
      }


      var customaddress = []; 
      if($localStorage.object_id==17){
         citylist = [];               
         customaddress.push({'latitude': $localStorage.lataddress, 'longitude': $localStorage.lngaddress, 'radius': $scope.radiusval, 'distance_unit': 'mile'});        
      }
      postestimate.customlatlist = customaddress;
      postestimate.countrylist = countrylist;
      postestimate.citylist = citylist;
      postestimate.statelist = statelist;

      var excludecountrylist = ['US'];var excludecitylist = []; var excludestatelist = [];
      if($scope.excludelocation!=""){        
        angular.forEach($scope.excludelocation, function(value, key){
              var getids = value.id.split('*');
              if(getids[2]=='city') { excludecitylist.push({'key':getids[0], 'radius':50, 'distance_unit':'mile'}); }
              if(getids[2]=='region') { excludestatelist.push({'key':getids[0]}); }
              if(getids[2]=='country') { excludecountrylist.push(getids[1]);  }                          
        });
       
      }


      
      postestimate.excludecountrylist = excludecountrylist;
      postestimate.excludecitylist = excludecitylist;
      postestimate.excludestatelist = excludestatelist;

      if($scope.includecustomaudiences!=""){
        postestimate.includecustomaudiences = $scope.includecustomaudiences;
      }
      if($scope.excludecustomaudiences!=""){
        postestimate.excludecustomaudiences = $scope.excludecustomaudiences;
      }
      //console.log(postestimate); return false;

      postestimate.user_id  = $localStorage.userId;
      postestimate.network_id = 1;
      postestimate.configureaccountid = $localStorage.configureaccountid;

      $serviceTest.fbuserestimate(postestimate,function(response) {
            if(response.code==200) {              
                $scope.getestimatedata = response.result.data;               
                if($scope.getestimatedata=="" || $scope.getestimatedata==undefined){
                  $scope.reachestimate = 'Invalid parameter';
                  /*if($scope.includecustomaudiences!="" && $scope.includecustomaudiences!=undefined){
                      $scope.reachestimate = 20;
                  }else {
                    $scope.reachestimate = Math.floor((Math.random() * 19100000) + 10100000);
                  }*/
                  $scope.bigamount =  '3.75'; 
                  $scope.bigamountmin =  '3.75';
                  $scope.bigamountmax =  '5.15';
                }else {                  
                  $scope.reachestimate =  $scope.getestimatedata.users;                  
                  //$scope.bigamount =  ($scope.getestimatedata.bid_estimations[0].bid_amount_median/6000).toFixed(2); 
                  //$scope.bigamountmin =  $scope.getestimatedata.bid_estimations[0].bid_amount_min/6000;
                  //$scope.bigamountmax =  $scope.getestimatedata.bid_estimations[0].bid_amount_max/6000;
		  $scope.bigamount =  '3.75'; 
                  $scope.bigamountmin =  '3.75';
                  $scope.bigamountmax =  '5.15';
                }
                //console.log();
                //$scope.bigamount =  $scope.getestimatedata.bid_estimations.bid_amount_min; 
                //$scope.budgetamount =  $scope.getestimatedata.bid_estimations.bid_amount_median;             
            }
      });
    }
    



$scope.showWeeks = false;

function sticky_relocate() {

      var window_top = $(window).scrollTop();

      var theTabPanel = $("#sticky-anchor");
        
      var div_top = theTabPanel.offset().top;
     
    
      if (window_top > div_top) {
          $('#sticky').addClass('stick');
          $('#sticky-anchor').height($('#sticky').outerHeight());
      } else {
          $('#sticky').removeClass('stick');
          $('#sticky-anchor').height(0);
      }
  }

  $(function() {
      $(window).scroll(sticky_relocate);
      sticky_relocate();
  });

  var dir = 1;
  var MIN_TOP = 200;
  var MAX_TOP = 350;

  function autoscroll() {
      var window_top = $(window).scrollTop() + dir;
      if (window_top >= MAX_TOP) {
          window_top = MAX_TOP;
          dir = -1;
      } else if (window_top <= MIN_TOP) {
          window_top = MIN_TOP;
          dir = 1;
      }
      $(window).scrollTop(window_top);
      window.setTimeout(autoscroll, 100);
  }





$scope.marketInterestsData=[{'id':0,"marketKey":"Demographics"},
                          {'id':2,"marketKey":"Interests"},
                          {'id':1,"marketKey":"Behaviors"}
                          //{'id':3,"marketKey":"More Categories"}
                          ];

$scope.selectedinterests=[];
$scope.InterestdataChild = {};
$scope.Interestdata = [];
var InterestdataChild = [];
$scope.select_InterestsData = function(showtype){
    var postdata = {};
    if(showtype=='includetargetbrowse'){
        postdata.catid = $scope.marketInterestsVal;  
        $scope.excludetargetbrowse = false;
        if($scope.marketInterestsVal===null){
          $scope.includetargetbrowse = false;
        }else {
          $scope.includetargetbrowse = true;
        }   
    }
    if(showtype=='excludetargetbrowse'){
        postdata.catid = $scope.marketInterestsVal1;   
        $scope.includetargetbrowse = false;
        if($scope.marketInterestsVal1===null){
          $scope.excludetargetbrowse = false;
        }else {
          $scope.excludetargetbrowse = true;
        }   
    } 
    $serviceTest.marketfbAudience(postdata,function(response) {
        if(response.code==200) {
          $scope.Interestdata=response.result;
        }
    }); 
}




$scope.InterestdataChildcounter = {};
$scope.addinterestinDiv = function (title,catid,id,type,parentid)
{
  if(title!=undefined){    
    var eventdetails = getObjects($scope.includetargetpeoples, 'title',  title );    
    if (eventdetails.length<1) {
          var gettype = $scope.marketInterestsVal;
          var newcat = '';
          if(gettype==0){ var newcat = catid+'*Demographics';}
          if(gettype==1){ var newcat = catid+'*Behaviors';}
          if(gettype==2){ var newcat = catid+'*Interests';}          
          $scope.includetargetpeoples.push({'title':title,'id':newcat});
          getestimate();
    }
    $scope.showincludetargetselect = true;
    /*
    var hideinterestlist = "hideinterestlist"+catid;
    var model = $parse(hideinterestlist);
    model.assign($scope, true);
    if(type=='child'){
        var hideparentinterestlist = "hideinterestlist"+parentid;
        var parentmodel = $parse(hideparentinterestlist);
        parentmodel.assign($scope, true);

        if($scope['selectedinterestscounter'+parentid] == undefined)
        $scope['selectedinterestscounter'+parentid] = [];

        $scope['selectedinterestscounter'+parentid].push(catid);
    }else if(type=='parent'){
        var interestschildrenclass = "interestschildrenclass_"+catid;
        var classmodel = $parse(interestschildrenclass);
        classmodel.assign($scope, "interestschildrenclasshide");
    }
    catid=id=title='';*/
  }
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

$scope.addinterestinDivexclude = function (title,catid,id,type,parentid)
{
  if(title!=undefined){
    var eventdetails = getObjects($scope.excludetargetpeoples, 'title',  title );    
    if (eventdetails.length<1) {
          var gettype = $scope.marketInterestsVal1;
          var newcat = '';
          if(gettype==0){ var newcat = catid+'*Demographics';}
          if(gettype==1){ var newcat = catid+'*Behaviors';}
          if(gettype==2){ var newcat = catid+'*Interests';}  
          $scope.excludetargetpeoples.push({'title':title,'id':newcat});
          getestimate();
    }
    
    $scope.showexcludetargetpeople = true;  
   // getestimate(); 
  }
}

$scope.getchildreninterestinDiv=function(catid){
    var childrenlist = "children"+catid;
    var interestclass = "interestclass"+catid;
    if($scope[childrenlist]==true && $scope[childrenlist] != undefined){
      $scope[childrenlist] = false;
      $scope[interestclass] = "closed";
      
    }else{
      var postdata = {};
      postdata.catid = catid;
      $scope[childrenlist] = true;
        if(typeof $scope.InterestdataChild[catid] == 'undefined') {
              
          $serviceTest.marketfbAudience(postdata,function(response) {
              if(response.code==200) {
                $scope.InterestdataChild[catid] = response.result;
                $scope[interestclass] = "opened";
              }
          });
        }else{
                $scope[interestclass] = "opened";
        }
    }
}

  $rootScope.jsonData = '{"foo": "bar"}';
  $rootScope.theme = 'ngdialog-theme-default';

 
  $scope.openTemplate = function () {
    $scope.audiencetypeval = '';
    $scope.copypastedata = '';
    $scope.customaudiencename = '';
    $scope.value = true;
      ngDialog.open({
          template: 'modules/facebook/views/dialog.html',
          className: 'ngdialog-theme-plain',
          scope: $scope
      });

     
  };

  $scope.closeThisDialog = function(){
    ngDialog.close();
  }



  $scope.savecustomaudiencedata = function(){ 
    var getname = document.getElementById("audiencename").value;
    if($localStorage.audiencetypeval!="" && $localStorage.audiencetypeval!=undefined && getname!="" && getname!=undefined){
        var postdata = {};
        postdata.audiencetypeval= $localStorage.audiencetypeval;        
        postdata.userarrlist= $localStorage.userlist;
        if($localStorage.audiencetypeval=='import'){
            postdata.userarrlist= $localStorage.importuserlist;
        }
        if($localStorage.audiencetypeval=='coppaste'){
            var getemails = document.getElementById("copypastedata").value.split(',');
            var customoutput = [];
            angular.forEach(getemails, function(value, key){                 
               customoutput.push(sha256_digest(value));                             
            });
            postdata.userarrlist = customoutput;
        }
        postdata.customaudiencename= getname;
        postdata.user_id = $localStorage.userId;
        //console.log(postdata);
        postdata.network_id = 1;
        postdata.configureaccountid = $localStorage.configureaccountid;
        if(postdata.userarrlist!="" &&  postdata.userarrlist!=undefined){
              // Save audience name
              $serviceTest.savecustomaudience(postdata,function(response) {
                  if(response.code==200) {
                        // API for custom audience
                        $localStorage.importuserlist = '';
                        $localStorage.userlist = '';
                        var data = {};
                        data.user_id  = $localStorage.userId;
                        data.network_id = 1;
                        data.configureaccountid = $localStorage.configureaccountid;
                        $serviceTest.getcustomaudience(data,function(response) {
                          if(response.code==200){
                            $scope.customaudiences = response.result.data;
                              /*$scope.finalarr = [];
                             
                              angular.forEach($scope.customaudiencesnew, function(value, key){
                                 $scope.finalarr[value.id] = value.name;                             
                              });
                              $scope.customaudiences = $scope.finalarr;
                              console.log($scope.customaudiences);*/
                          }
                        });
                  }
              });
            ngDialog.close();
        }else {
          SweetAlert.swal("Message!", "Customer list can not be blank!", "error");
        }

    }else {
      SweetAlert.swal("Message!", "Audience name and Customer type not be blank!", "error");
    }

  }




$scope.uploadshow = false;
$scope.copypasteshow = false;

$scope.audiencetypedata = function(getaudtype){  
    
    $localStorage.audiencetypeval = getaudtype;
    if(getaudtype=='upload'){
      $scope.uploadshow = true;
      $scope.copypasteshow = false;
      //$scope.importshow = false;
    }
    if(getaudtype=='coppaste'){
      $scope.copypasteshow = true;
      $scope.uploadshow = false;
      //$scope.importshow = false;
    }
    if(getaudtype=='import'){
      //$scope.importshow = true;
      $scope.uploadshow = false;
      $scope.copypasteshow = false;
    

      /* $http({
        url: webservices.getAllEmails,
        method: 'POST',
        data: '',        
        headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept": "application/json",
        }
      }).success(function(data) {
          console.log(data);
      });*/
       // Fetch data from alisthub
       $http.jsonp(webservices.getAllEmails+"/data=all&callback=jsonp_callback7");
        $window.jsonp_callback7 = function(response){    
            var output = [];
            for (var key in response.data) {  
              if(response.data[key]!=""){
                 output.push(sha256_digest(response.data[key]));
              } 
            }
            $localStorage.importuserlist = output;                       
       }
      ///////////////////////////////////////////////////////////
    }
}


/*=============== Popover by ganesh===============*/
/**************************************************/ 
$scope.customaudiencefacebookpopover = $sce.trustAsHtml('<p> You can use email addresses, phone numbers, Facebook user IDs or app user IDs to create and save audiences that you&rsquo;d like to show your adverts to.</p>')
$scope.locationfacebookpopover = $sce.trustAsHtml('<p>Select one or more countries, regions, cities to show your advert to or exclude it from people in those locations. Location targeting is not available in all countries.</p>')
$scope.agefacebookpopover = $sce.trustAsHtml('<p> Select the minimum and maximum age of the people who will find your advert relevant. </p>')
$scope.detailedfacebookpopover = $sce.trustAsHtml('<p> Define your audience by including or excluding demographics, interests and behaviours. </p>')
$scope.includepeopepopover = $sce.trustAsHtml('<h5>INCLUDE </h5> <p>Adding more targeting details here will expand your audience to include more people.</p> <h5> </h5> <h5> TIPS </h5> <p>To refine your audience, you can use the links below to exclude people or narrow based on other details. </p>')
$scope.genderfacebookpopover = $sce.trustAsHtml('<p> Choose &quot;All&quot; unless you only want your adverts to be shown to either men or women.</p>')
$scope.connectionfacebookpopover = $sce.trustAsHtml('<p>Reach people who have a specific kind of connection to your Page, app or event. This will narrow your audience to include only people with that specific connection who also meet the other targeting categories that you&rsquo;ve selected</p>')
$scope.budgetfacebookpopver = $sce.trustAsHtml('<div><p>Your advert set budget is the maximum amount you want to spend.h5></h5>If you choose a daily budget, the amount you enter is the maximum you&rsquo;ll spend each day. If you choose a lifetime budget, the amount you enter is the maximum you&rsquo;ll spend during the lifetime of your advert set.</p></div>')
$scope.schedulefacbookpopover = $sce.trustAsHtml('<p>Your advert set will either run continuously starting today or within a date range that you select.</p>')
$scope.Schedulefacebookpopover = $sce.trustAsHtml('<p>Your advert set will either run continuously starting today or within a date range that you select.</p>')
$scope.optimisationfacebookpopover = $sce.trustAsHtml('<p>Choose how you want us to deliver adverts to people based on what you&rsquo;re trying to achieve. Your selection affects who sees your adverts to get you the best results for the lowest cost. E.g. If you choose to optimise for link clicks, we&rsquo;ll deliver your advert to the right people to help you get the most clicks on the link in your advert for the lowest cost.</p>')
$scope.whenuchargedfacebookpopover = $sce.trustAsHtml('<p>The selected option determines when you pay for your advert. For many optimisation goals, you&rsquo;ll pay each time your advert is served (known as an impression).<h5> </h5>Some optimisation goals also let you choose between impressions and actions (such as link clicks or post engagements).<h5> </h5>The recommended option shown here balances efficient spending of your budget to achieve your objective with easy understanding of your results.</p>')
$scope.bidamountfacebookpopover = $sce.trustAsHtml('<p>Your bid amount determines how effectively we can optimise your advert delivery. Your bid competes in an auction with other advertisers who also want to reach the same target audience. </p>')
$scope.advertSchedulefacebookpopover = $sce.trustAsHtml('<p>You can schedule your adverts for specific hours and days of the week. </p>')
$scope.deliverTypefacebookpopover = $sce.trustAsHtml('<p>You can choose standard or accelerated delivery.<h5> </h5>Standard delivery is recommended and the preferred option for most advertisers.<h5> </h5>Accelerated delivery can be useful for promoting time-sensitive events and quickly reaching a target audience. Manual bid pricing is required for accelerated delivery.</p>')
$scope.placements_1 = $sce.trustAsHtml('<p style="color:#333;">Video adverts shown within Desktop News Feed are also eligible to appear in suggested video feeds.</p>')
$scope.placements_2 = $sce.trustAsHtml('<p style="color:#333;">Your adverts shown within Desktop right section in your profile.</p>')
$scope.placements_3 = $sce.trustAsHtml('<p style="color:#333;">Video adverts shown within Mobile News Feed are also eligible to appear in suggested video feeds.</p>')
$scope.placements_4 = $sce.trustAsHtml('<p style="color:#333;">Your adverts will be shown in Instagram Home page.</p>')
$scope.placements_5 = $sce.trustAsHtml('<p style="color:#333;">Your adverts will be shown in Mobile News Feed and approved partner mobile apps and mobile websites that are part of Facebook&rsquo;s Audience Network. All targeting capabilities available on Facebook are available on the Audience Network as well.</p>')
/*-------------------------------------------------*/ 
/*-------------------------------------------------*/ 


$scope.MyFiles=[];

$scope.handler=function(e,files){
    var reader=new FileReader();
    reader.onload=function(e){
        var string=reader.result;
        var getarr = string.split("\n");  
        $scope.userarrlist = [];      
        angular.forEach(getarr, function(value, key){
          if(key!=0 && value!='' && value!=undefined){
            $scope.userarrlist.push(sha256_digest(value));
          }                          
        });  
        $localStorage.userlist = $scope.userarrlist; 
        //console.log($scope.userarrlist);      
        //var obj=$filter('csvToObj')(string);
        //do what you want with obj !        
    }
    reader.readAsText(files[0]);
}

 $scope.showdropval = false;
// 1st
  $rootScope.selectedIndex = -1;
  $rootScope.$watch('selectedIndex',function(val){
    if(val !== -1) {        
      var getstring = $rootScope.statesArray[$rootScope.selectedIndex].split('<');
      $scope.location = getstring[0];
      $scope.savedlocation = $rootScope.statesArray[$rootScope.selectedIndex];      
    }
  });
  $rootScope.checkKeyDown = function(event){

    if(event.keyCode === 40){
      event.preventDefault();
      if($rootScope.selectedIndex+1 < $rootScope.statesArray.length){
        $rootScope.selectedIndex++;
      }else{
        $rootScope.selectedIndex = 0;
      }
    }else if(event.keyCode === 38){ 
      event.preventDefault();
      if($rootScope.selectedIndex-1 >= 0){
        $rootScope.selectedIndex--;
      }else{
        $rootScope.selectedIndex = $rootScope.statesArray.length-1;
      }
    }else if(event.keyCode === 13){ 
      event.preventDefault();
      $rootScope.statesArray = [];
      $rootScope.selectedIndex = -1;
    }else if(event.keyCode === 27){ 
      event.preventDefault();
       $rootScope.statesArray = [];
      $rootScope.selectedIndex = -1;
    }
  };
  var exclude1 = document.getElementById('locationID');
  $rootScope.checkKeyUp = function(event){ 
    if(event.keyCode !== 8 || event.keyCode !== 46){
      if($scope.location === ""){
       $rootScope.statesArray = [];
        $rootScope.selectedIndex = -1;
      }
    }
  };
$rootScope.AssignValueAndHide = function(index){
     $scope.savedlocation = $rootScope.statesArray[index];
     // alert('d');
     $rootScope.statesArray = [];
     $rootScope.selectedIndex = -1;
     
  };

// 2nd
  $rootScope.selectedTarIndex = -1;
  $rootScope.$watch('selectedTarIndex',function(val){
    if(val !== -1) {      
      $scope.savedtargetpeople = $rootScope.targetArray[$rootScope.selectedTarIndex];
      var getstring = $rootScope.targetArray[$rootScope.selectedTarIndex].toString().split('<');
      $scope.targetpeople = getstring[0];
    }
  });
  $rootScope.checkKeyTarDown = function(event){
    if(event.keyCode === 40){
      event.preventDefault();
      if($rootScope.selectedTarIndex+1 < $rootScope.targetArray.length){
        $rootScope.selectedTarIndex++;
      }else{
        $rootScope.selectedTarIndex = 0;
      }
    }else if(event.keyCode === 38){ 
      event.preventDefault();
      if($rootScope.selectedTarIndex-1 >= 0){
        $rootScope.selectedTarIndex--;
      }else{
        $rootScope.selectedTarIndex = $rootScope.targetArray.length-1;
      }
    }else if(event.keyCode === 13){ 
      event.preventDefault();
      $rootScope.targetArray = [];
      $rootScope.selectedTarIndex = -1;
    }else if(event.keyCode === 27){ 
      event.preventDefault();
       $rootScope.targetArray = [];
      $rootScope.selectedTarIndex = -1;
    }
  };
  var exclude1 = document.getElementById('locationInID');
  $rootScope.checkKeyTarUp = function(event){ 
    if(event.keyCode !== 8 || event.keyCode !== 46){
      if($scope.targetpeople === ""){
       $rootScope.targetArray = [];
        $rootScope.selectedTarIndex = -1;
      }
    }
  };
  $rootScope.AssignValueTarHide = function(index){    
    $scope.savedtargetpeople = $rootScope.targetArray[index];
    var getstring = $rootScope.targetArray[index].toString().split('<');
    $scope.targetpeople = getstring[0];
    $rootScope.targetArray = [];
    $rootScope.selectedTarIndex = -1;     
  };

  // 3rd
  $rootScope.selectedExIndex = -1;
  $rootScope.$watch('selectedExIndex',function(val){
    if(val !== -1) {
      $scope.savedexcludetargetpeople = $rootScope.excludeArray[$rootScope.selectedExIndex];
      var getstring = $rootScope.excludeArray[$rootScope.selectedExIndex].toString().split('<');
      $scope.excludetargetpeople = getstring[0]; 
    }
  });
  $rootScope.checkKeyExDown = function(event){
    if(event.keyCode === 40){
      event.preventDefault();
      if($rootScope.selectedExIndex+1 < $rootScope.excludeArray.length){
        $rootScope.selectedExIndex++;
      }else{
        $rootScope.selectedExIndex = 0;
      }
    }else if(event.keyCode === 38){ 
      event.preventDefault();
      if($rootScope.selectedExIndex-1 >= 0){
        $rootScope.selectedExIndex--;
      }else{
        $rootScope.selectedExIndex = $rootScope.excludeArray.length-1;
      }
    }else if(event.keyCode === 13){ 
      event.preventDefault();
      $rootScope.excludeArray = [];
      $rootScope.selectedExIndex = -1;
    }else if(event.keyCode === 27){ 
      event.preventDefault();
       $rootScope.excludeArray = [];
      $rootScope.selectedExIndex = -1;
    }
  };
  var exclude1 = document.getElementById('locationexID');
  $rootScope.checkKeyExUp = function(event){ 
    if(event.keyCode !== 8 || event.keyCode !== 46){
      if($scope.excludetargetpeople === ""){
       $rootScope.excludeArray = [];
        $rootScope.selectedExIndex = -1;
      }
    }
  };
$rootScope.AssignValueExHide = function(index){
    $scope.savedexcludetargetpeople = $rootScope.excludeArray[index];
    var getstring = $rootScope.excludeArray[index].toString().split('<');
    $scope.excludetargetpeople = getstring[0];    
    $rootScope.excludeArray = [];
    $rootScope.selectedExIndex = -1;
     
  };
  
// Google Map for local awerness objective

var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(37.7749300, -122.4194200),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();
    var input = document.getElementById('pac-input');
    //var input = $scope.maplocation;
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
        setPlace();
    });
    var setPlace = function () {
        var place = autocomplete.getPlace(); console.log(place)
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        if (place.geometry.viewport) {
            $scope.map.fitBounds(place.geometry.viewport);
        } else {
            $scope.map.setCenter(place.geometry.location);
        }
      
        createMarker({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address });

        $scope.lataddress = place.geometry.location.lat();
        $scope.lngaddress = place.geometry.location.lng();
        $scope.address = place.formatted_address;
        $localStorage.street_address = place.formatted_address; 
        $localStorage.lataddress = place.geometry.location.lat();      
        $localStorage.lngaddress = place.geometry.location.lng();
        getestimate();
    }


    var createMarker = function (info) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lng),
            title: info.address
        });
        marker.content = '<div class="infoWindowContent">' + info.address + '</div>';
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);

          var circle = new google.maps.Circle({
          map: $scope.map,
          radius: 3000, // 3000 km 
          editable: false ,
          strokeColor   : '#801517',
          strokeOpacity : 1,
          strokeWeight  : 2,
          fillColor     : '#801517',
          fillOpacity   : 0.2,
        });
        //circle.setMap(null);
        circle.bindTo('center', marker, 'position');
        $scope.map.fitBounds(circle.getBounds());

    }

    $scope.openInfoWindow = function (e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

})
.controller('schedulecntl', function($scope,$localStorage){  
  $scope.toggle = false;
  $scope.options = {
    // Reset button
    reset: true, // default false
    // Event triggered when selecting a cell
    onChange: function(selected) { 
       $scope.schd.selectschdata = selected;
    },
    // Prepopulated cells
    selected: $localStorage.showselectedschedule,
    // When true clicking on the day name it will select the entire row
    disableRowSelection: false, // default false
    // When true clicking on the hour it will select the entire columns
    disableColumnSelection: false // default false
  }
})
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})/*.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});*/

.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
})
.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])
.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
}])
.directive('fileChange',['$parse', function($parse){
  return{
    require:'ngModel',
    restrict:'A',
    link:function($scope,element,attrs,ngModel){
      var attrHandler=$parse(attrs['fileChange']);
      var handler=function(e){
        $scope.$apply(function(){
          attrHandler($scope,{$event:e,files:e.target.files});
        });
      };
      element[0].addEventListener('change',handler,false);
    }
  }
}])
.filter('split', function() {return function(input, splitChar, splitIndex) {
      // do some bounds checking here to ensure it has that index
      return input.split(splitChar)[splitIndex];
  }
}).directive('clickoutside', function($document){
  return {
    restrict: 'A',
    link: function(scope, elem, attr, ctrl) {
      elem.bind('click', function(e) {
        // this part keeps it from firing the click on the document.
        e.stopPropagation();
      });
      $document.bind('click', function() {
        // magic here.
        scope.savedexcludetargetpeople = '';
        scope.savedtargetpeople = '';
        scope.savedlocation='';
        scope.$apply(attr.clickoutside);
      })
    }
  }
})
.filter('unsafe', function($sce) { return $sce.trustAsHtml; })
.directive('onlyDigit', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) { 
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});
