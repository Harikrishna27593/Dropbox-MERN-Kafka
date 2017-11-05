var moment= require('moment');
var fs=require('fs');
var Buffer = require('buffer/').Buffer
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
function handle_request(msg, callback){
    var res = {};
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);

            var fileupload="Directory created";
            var coll1 = mongo.collection('Activity');
            var d = moment().format('MMMM Do YYYY h:mm:ss a')
            coll1.save({
                USERNAME: msg.username,
                ACTIVITY_TIME: d,
                Activity: fileupload
            })

            var coll = mongo.collection('upload_info');

            var d = moment().format('MMMM Do YYYY h:mm:ss a')
            var starred=0;
            var permission=1;

            path='./public/uploads/'+ msg.folder;
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
            var isdirec=1;
            coll.save({
                USERNAME: msg.username,
                ACTIVITY_TIME: d,
                STARRED: starred,
                PATH: path,
                PERMISSION:permission,
                ISDIREC:isdirec
            })

            res.code = "204";
            res.value = "Successful directory creation";
            callback(null, res);
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed directory creation";
        callback(null, res);
    }

}

exports.handle_request = handle_request;