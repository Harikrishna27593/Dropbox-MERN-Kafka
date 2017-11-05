var mongo = require("./mongo");
var fs=require('fs');
var moment= require('moment');
var mongoURL = "mongodb://localhost:27017/Dropbox";
function handle_request(msg, callback){
    var res = {};
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);

            var filedeleted="File deleted";
            var coll1 = mongo.collection('Activity');
            var d = moment().format('MMMM Do YYYY h:mm:ss a')
            coll1.save({
                USERNAME: msg.username,
                ACTIVITY_TIME: d,
                Activity: filedeleted
            })

            var coll = mongo.collection('upload_info');

            paths=msg.path;
            permission=msg.permission;
            fs.unlink(paths, function () {

                console.log('write operation complete.');

            });
            coll.remove({PATH:paths,PERMISSION:permission})
            res.code = "204";
            res.value = "Successful delete";
            callback(null, res);
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed delete";
        callback(null, res);
    }

}

exports.handle_request = handle_request;