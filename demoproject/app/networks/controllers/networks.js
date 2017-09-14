var request = require("request");
var http = require("http");
var qs = require("querystring");
var async = require("async"); 
var fs = require('fs');
var path = require('path');
var util = require('util');
var archiver = require('archiver');

var db = require('../../../db.js');



exports.getcampaignreportlistss = function(req,res){
    var connection = db.connection();
    var request =req.body;
    var query ='Select * From users WHERE `type` = ' + '"'+request.type+'"';  
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}


exports.getrqstudnts = function(req,res){
    
    console.log("connection");
    var connection = db.connection();
    var request =req.body;
   // var query ='Select * From `booking` WHERE `tutor_id` = '+'"'+request.id+'"'+' ' ; 
    var query ='SELECT booking.date, booking.student_id,users.firstname,users.lastname,users.filename FROM `booking` LEFT JOIN `users` ON `booking`.`student_id` = `users`.`id` WHERE `tutor_id` = '+'"'+request.id+'"'+' ';
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}

//updatestatus
//SELECT *FROM `booking`WHERE (`tutor_id` = 644 AND `student_id`=1 AND `date`='2017-07-06T07:20:01.182Z');
//UPDATE `booking`SET `status`=0    WHERE (`tutor_id` = 644 AND `student_id`=1 AND `date`='2017-07-06T07:20:01.182Z');

exports.updatestatus = function(req,res){
    
    console.log("connection");
    var connection = db.connection();
    var request =req.body;
//     var query = 'UPDATE `users` SET `password`='+'"'+request.newpassword+'"'+' WHERE `id`='+'"'+request.id+'"'+' ';
    var query='UPDATE `booking` SET `status`= '+'"'+request.status+'"'+'  WHERE (`tutor_id` = '+'"'+request.tutor+'"'+' AND `student_id`='+'"'+request.student+'"'+' AND `date`='+'"'+request.date+'"'+')';
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}
//acptstudnts

exports.acptstudnts = function(req,res){
    
    console.log("connection");
    var connection = db.connection();
    var request =req.body;
   // var query ='Select * From `booking` WHERE `tutor_id` = '+'"'+request.id+'"'+' ' ; 
    var query ='SELECT booking.date,users.firstname,users.lastname,users.filename FROM `booking` LEFT JOIN `users` ON `booking`.`student_id` = `users`.`id` WHERE (`tutor_id` = '+'"'+request.id+'"'+' AND `status`='+'"'+request.status+'"'+')';
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}










exports.getuserdetails = function(req,res){
    
    console.log("connection");
    var connection = db.connection();
    var request =req.body;
    var query ='Select * From `users` WHERE `id` = '+'"'+request.id+'"'+' ' ;  
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}


exports.updatepas = function(req,res){
    var connection = db.connection();
    var request =req.body;
       var query = 'UPDATE `users` SET `password`='+'"'+request.newpassword+'"'+' WHERE `id`='+'"'+request.id+'"'+' ';
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}














exports.update = function(req,res){
    var connection = db.connection();
    var request =req.body;
       var query = 'UPDATE `users` SET `email`='+'"'+request.email+'"'+',`firstname`='+'"'+request.firstname+'"'+',`lastname`='+'"'+request.lastname+'"'+',`filename`='+'"'+request.filename+'"'+' WHERE `id`='+'"'+request.id+'"'+' ';
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}




exports.login = function(req,res){
    var connection = db.connection();
    var request =req.body;
  var query = 'SELECT * FROM `users` WHERE `email` = '+'"'+request.email+'"'+' AND `password` ='+'"'+request.password+'"';
    console.log(query);
    connection.query(query, function(err, results) {  
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}

//reqteacher

exports.reqteacher = function(req,res){
    
    var connection = db.connection();
    var request = req.body; 
    console.log(request);

 var query = 'SELECT * FROM `users` WHERE `id`  ='+'"'+request.tutor+'"';
//   var query = "INSERT INTO users (`id`,`email`,`firstname`,`lastname`) VALUES (NULL,"+"`"+request.email+"`"+","+"`"+request.firstname+"`"+","+"`"+request.lastname+"`"+")";

    console.log(query);
    connection.query(query, function(err, results) {
          
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}






exports.req = function(req,res){
    
    var connection = db.connection();
    var request = req.body; 
    console.log(request);
//     var query = 'SELECT * FROM `users` WHERE `email` = '+'"'+request.email+'"'+' AND `password` ='+request.password;
 var query = 'INSERT INTO `booking` (`id`,`tutor_id`,`student_id`,`date`,`status`) VALUES (NULL,'+'"'+request.tutor+'"'+','+'"'+request.student+'"'+','+'"'+request.date+'"'+','+'"'+request.status+'"'+')';
//   var query = "INSERT INTO users (`id`,`email`,`firstname`,`lastname`) VALUES (NULL,"+"`"+request.email+"`"+","+"`"+request.firstname+"`"+","+"`"+request.lastname+"`"+")";

    console.log(query);
    connection.query(query, function(err, results) {
          
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}







exports.signup = function(req,res){
    
    var connection = db.connection();
    var request = req.body; 
    console.log(request);
//     var query = 'SELECT * FROM `users` WHERE `email` = '+'"'+request.email+'"'+' AND `password` ='+request.password;
 var query = 'INSERT INTO `users` (`id`,`email`,`password`,`firstname`,`lastname`,`type`,`filename`) VALUES (NULL,'+'"'+request.email+'"'+','+'"'+request.password+'"'+','+'"'+request.firstname+'"'+','+'"'+request.lastname+'"'+','+'"'+request.type+'"'+','+'"'+request.filename+'"'+')';
//   var query = "INSERT INTO users (`id`,`email`,`firstname`,`lastname`) VALUES (NULL,"+"`"+request.email+"`"+","+"`"+request.firstname+"`"+","+"`"+request.lastname+"`"+")";

    console.log(query);
    connection.query(query, function(err, results) {
          
        
      if (err) {
           console.log("Data not receiving");
        res.json({error:err,code:101});
        connection.end();
      }else{
          console.log("Data receiving");
        res.json({result:results,code:200});
          
        connection.end();
      } 
  }); 
}