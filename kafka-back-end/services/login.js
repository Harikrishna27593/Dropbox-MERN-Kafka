var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";
function handle_request(msg, callback){
    var res = {};
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('login');


            console.log("In handle request:"+ JSON.stringify(msg));

            coll.findOne({username: msg.username}, function(err, user){
                if (user) {
                    console.log("if condition")
                    res.code = "200";
                    res.value = "Success Login";
                    callback(null, res);

                } else {
                    console.log("else condition")
                    res.code = "401";
                    res.value = "Failed Login";
                }
            });
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed Login";
    }

}

exports.handle_request = handle_request;