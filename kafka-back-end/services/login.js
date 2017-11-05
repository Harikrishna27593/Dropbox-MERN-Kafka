var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
var moment= require('moment');
var bcrypt = require('bcrypt');
function handle_request(msg, callback){
    var res = {};
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('login');


            console.log("In handle request:"+ JSON.stringify(msg));

            coll.findOne({username: msg.username}, function(err, user){
                if (user) {
                    var Login="Loggedin";
                    var d = moment().format('MMMM Do YYYY h:mm:ss a')
                    var coll = mongo.collection('Activity');
                    try {
                        var orgPassword = bcrypt.compareSync(msg.password, user.password);
                    }
                    catch(e){
                        res.code = "401";
                        res.value = "Failed Login";
                    }

                    if(orgPassword) {
                        res.code = "200";
                        res.value = "Success Login";

                    }
                    else {
                        console.log('password mismatch')
                        res.code = "401";
                        res.value = "Failed Login";
                    }

                    coll.save({
                        USERNAME: msg.username,
                        ACTIVITY_TIME: d,
                        Activity: Login
                    })

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