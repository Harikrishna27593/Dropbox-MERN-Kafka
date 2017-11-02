var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in ikikpassport');
        kafka.make_request('login-topic',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,{username:username});
                }
                else {
                    done(null,false);
                }
            }
        });
        /*try {
            if(username == "bhavan@b.com" && password == "a"){
                done(null,{username:"bhavan@b.com",password:"a"});
            }
            else
                done(null,false);
        }
        catch (e){
            done(e,{});
        }*/
    }));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
        function(req,username , password, done) {
        console.log('in sdsdpassport');
        console.log(req.body.firstname)
        console.log(req.body.lastname)
        console.log(password)
        console.log(username)
        kafka.make_request('signup-topic',{"firstname":req.body.firstname,"lastname":req.body.lastname,"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                console.log("in passport else")
                if(results.code == 200){
                    done(null,{username:username});
                }
                else {
                    done(null,false);
                }
            }
        });
    }));



};


