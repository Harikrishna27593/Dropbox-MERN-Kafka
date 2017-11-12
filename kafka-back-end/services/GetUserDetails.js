var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Dropbox";
function handle_request(msg, callback){
    var res = {};
    var i=0;
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at getuserdetails: ' + mongoURL);
            var coll = mongo.collection('userProfile');

            coll.find({EMAIL: msg.username}).toArray(function(err, files){

                if (err) {
                    res.code = "401";
                    res.value = "Failed activity";
                    callback(null, res);
                }
                else {
                    var resArr = [];
                    resArr = files.map(function (file) {
                        var DetailsJSON = {};
                        DetailsJSON.name=files[i].NAME;
                        DetailsJSON.email=files[i].EMAIL;
                        DetailsJSON.work=files[i].WORK;
                        DetailsJSON.edu=files[i].EDUCATION;
                        DetailsJSON.contact=files[i].CONTACT;
                        DetailsJSON.interests=files[i].INTERESTS;
                        DetailsJSON.lang_pref=files[i].LANGUAGE;
                        i=i+1;
                        return DetailsJSON;

                    });
                    res.code = "200";
                    res.value = "Successful got details";
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