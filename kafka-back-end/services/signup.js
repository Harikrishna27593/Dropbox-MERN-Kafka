var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
var moment= require('moment');
var bcrypt = require('bcrypt');
function handle_request(msg, callback){
    var res = {};
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);

            var Signedup="Signed up";
            var d = moment().format('MMMM Do YYYY h:mm:ss a')
            var coll1 = mongo.collection('Activity');
            coll1.save({
                USERNAME: msg.firstname,
                ACTIVITY_TIME: d,
                Activity: Signedup
            })

            var coll = mongo.collection('login');


            console.log("In handle request:"+ JSON.stringify(msg));


            var hash = bcrypt.hashSync(msg.password, 10);
             coll.findOne({'username': msg.username}, function (err, user) {
                 // In case of any error return
                 if (err) {
                     res.code = "200";
                     res.value = "Success Signup";
                     callback(null, res);
                 }
                 // already exists
                 if (user) {
                     res.code = "401";
                     res.value = "Failed Signup";
                     callback(null, res);
                 } else {
                     // save the user
                     coll.save({
                         firstname: msg.firstname,
                         lastname: msg.lastname,
                         username: msg.username,
                         password: hash
                     })
                     res.code = "200";
                     res.value = "Success Signup";
                     callback(null, res);
                 }
             });


        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed Signup";
        callback(null, res);
    }

}

exports.handle_request = handle_request;