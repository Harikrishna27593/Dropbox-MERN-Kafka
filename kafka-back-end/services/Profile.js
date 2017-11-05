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
            var coll = mongo.collection('userProfile');
            coll.save({
                NAME: msg.NAME,
                EMAIL:msg.EMAIL,
                WORK:msg.WORK,
                EDUCATION:msg.EDUCATION,
                CONTACT:msg.CONTACT,
                INTERESTS:msg.INTERESTS,
                LANGUAGE:msg.LANG_PREF
            })

            res.code = "204";
            res.value = "Successful Upload";
            callback(null, res);
        });
    }
    catch (e){
        res.code = "401";
        res.value = "Failed upload";
        callback(null, res);
    }

}

exports.handle_request = handle_request;