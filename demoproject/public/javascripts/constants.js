var localhostUrl="";
var webservices = {	
   
        "update" : localhostUrl + "/networks/update",        
        "signup":localhostUrl+"/networks/signup",
    "reqteacher":localhostUrl+"/networks/reqteacher",
         "login":localhostUrl+"/networks/login", 
    "updatestatus":localhostUrl+"/networks/updatestatus", 
     "acptstudnts":localhostUrl+"/networks/acptstudnts",
    "getuserdetails":localhostUrl+"/networks/getuserdetails",
    "getrqstudnts":localhostUrl+"/networks/getrqstudnts",
     "req":localhostUrl+"/networks/req",
    "updatepas":localhostUrl+"/networks/updatepas",
        "getcampaignreportlistss":localhostUrl+"/networks/getcampaignreportlistss"
}

var global_message = {
    "EmailAvailable" : "Available",
    "EmailExist" : "Already Exist!",
    "SavingError" : "Error in saving !",
    "SignupSuccess" : "Email send to you , Please go to email to activate your account.",
    "ForgetPassword" : "Email has been sent to you for reset new password.",
    "ForgetEmailError" : "Please enter correct Email.",
    "ActivatedMessage" : "Your account has been activated now , you can sign in your account .",
    "ErrorInActivation" : "There is some problem in server , Please try some time.",
    "eventSaved" : "Event has been Selected, Please choose Network",
    "eventError" : "Some Error Occured, Please try again.",
    "networkSaved" : "Network has beed added with campaign",
    "networkError" : "Some Error Occured, Please try again.",
    "date_comparison":'End time must be greater than start time. ',
    "endDateError" : 'End date must be same or greater than start date',
    "minbudgetamount":'The entered Budget is very less!',
}
 
var appConstants = {
	"authorizationKey": "ddfgdfgdfg"
}
var headerConstants = {
	"json": "application/json"
} 
var authConstants = {
    "json": "application/json",
    "Content-Type": "Authorization"
}