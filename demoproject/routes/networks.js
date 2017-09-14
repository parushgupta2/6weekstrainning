
module.exports = function(app, express) {
    /*Import Router*/
 
    var router = express.Router();     
    /* multer used to upload images*/
   var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer ({ storage: storage }).single('file');
app.post('/multer', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
    
        console.log("error occurred");
      return
    }
      console.log(res.filename);
    //  res.json({filename:0});
     res.end();
    // Everything went fine 
  })
})
    
    
    
    /*Import Network controller*/
    Networks  = require('./../app/networks/controllers/networks.js'); 
    
    router.post('/req/', Networks.req); 
    router.post('/signup/', Networks.signup);
     router.post('/reqteacher/', Networks.reqteacher);
    router.post('/updatestatus/', Networks.updatestatus);    
     router.post('/acptstudnts/', Networks.acptstudnts);  
     router.post('/getrqstudnts/', Networks.getrqstudnts);  
    router.post('/getcampaignreportlistss/', Networks.getcampaignreportlistss);   
     router.post('/login/', Networks.login);  
    router.post('/update/', Networks.update);  
     router.post('/getuserdetails/', Networks.getuserdetails);
    router.post('/updatepas/', Networks.updatepas);
    /*Express routing for import or use Network router*/
    app.use('/networks', router);

    
}