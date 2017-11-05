var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
function handle_request(msg, callback){
    var res = {};
    var i=0;
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('upload_info');


            coll.find({USERNAME: msg.username}).sort({STARRED:-1}).toArray(function(err, files){

                if (err) {
                    res.code = "401";
                    res.value = "Failed getfiles";
                    callback(null, res);
                }
                else {
                     var resArr = [];
                     resArr = files.map(function (file) {
                         var imgJSON = {};
                         var path=files[i].PATH
                         imgJSON.img = path.split('/')[3];
                         imgJSON.cols = 1  ;
                         imgJSON.timer=files[i].ACTIVITY_TIME;
                         imgJSON.username=msg.username;
                         imgJSON.starred=files[i].STARRED;
                         imgJSON.permission=files[i].PERMISSION;
                         imgJSON.isdirec=files[i].ISDIREC;
                         i=i+1;
                         return imgJSON;

                     });
                    res.code = "200";
                    res.value = "Successful Upload";
                    res.arr=resArr
                    callback(null, res);
                }
        });
    });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed getfiles";
        callback(null, res);
    }

}

exports.handle_request = handle_request;