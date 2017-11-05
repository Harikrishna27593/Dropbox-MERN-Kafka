var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
function handle_request(msg, callback){
    var res = {};
    var i=0;
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('Activity');

            coll.find({USERNAME: msg.username}).toArray(function(err, files){

                if (err) {
                    res.code = "401";
                    res.value = "Failed activity";
                    callback(null, res);
                }
                else {
                    var resArr = [];
                    resArr = files.map(function (file) {
                        var ActivityJSON = {};
                        ActivityJSON.id=i;
                        ActivityJSON.activity_time=files[i].ACTIVITY_TIME;
                        ActivityJSON.username=msg.username;
                        ActivityJSON.activity=files[i].Activity;
                        i=i+1;
                        return ActivityJSON;

                    });
                    res.code = "200";
                    res.value = "Successful Upload";
                    res.arr=resArr
                    console.log(resArr)
                    callback(null, res);
                }
            });
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed Activity";
        callback(null, res);
    }

}

exports.handle_request = handle_request;