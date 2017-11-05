var moment= require('moment');

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
function handle_request(msg, callback){
    var res = {};
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);

            var filestar="File starred";
            var coll1 = mongo.collection('Activity');
            var d = moment().format('MMMM Do YYYY h:mm:ss a')
            coll1.save({
                USERNAME: msg.username,
                ACTIVITY_TIME: d,
                Activity: filestar
            })

            var coll = mongo.collection('upload_info');
            paths=msg.path;

          coll.update({USERNAME:msg.username,PATH:paths},{$set:{STARRED:"1",ACTIVITY_TIME:d}})
            res.code = "204";
            res.value = "Successful star";
            callback(null, res);
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed star";
        callback(null, res);
    }

}

exports.handle_request = handle_request;