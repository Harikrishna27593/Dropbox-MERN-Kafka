var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
var kafka = require('./routes/kafka/client');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
const fileUpload = require('express-fileupload');
var app = express();
app.use(fileUpload());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL,
        ttl:2*60*60
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        else {
            req.session.user = user.username;
            console.log(req.session.user);
            console.log("session initilized");
            return res.status(201).send({username: "test"});
        }
    })(req, res);
});


app.post('/dosignup', function(req, res) {

    passport.authenticate('signup', function(err, user) {
        if(err) {
            res.status(401).send();
        }

        if(user){
            return res.status(201).send();
        }
        else {
            return res.status(401).send();
        }
    })(req, res);

    // kafka.make_request('signup-topic',{"firstname":req.body.firstname,"lastname":req.body.lastname,"username":req.body.username,"password":req.body.password}, function(err,results){
    //     console.log('in result');
    //     console.log(results);
    //     console.log(results.code);
    //     if(err){
    //         res.status(401).send();
    //     }
    //     else
    //     {
    //         if(results.code == 200){
    //             return res.status(201).send({username: "test"});
    //         }
    //         else {
    //             res.status(401).send();
    //         }
    //     }
    // });
});



app.post('/upload',function(req, res) {
    console.log(req.body.val)
    kafka.make_request('upload-topic',{"filebuffer":req.files.mypic.data,"filename":req.files.mypic.name,"username":req.session.user,"isdirectory":req.body.val,"direcname":req.body.fname}, function(err,results){
        //console.log('in result');
       // console.log(results);
        //console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.get('/showActivity',function(req, res) {
    kafka.make_request('Activity-topic',{"username":req.session.user}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                return res.status(200).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});



app.get('/getimg',function(req, res) {
    console.log('in getimgapp.js')
    kafka.make_request('getfiles-topic',{"username":req.session.user}, function(err,results){
        console.log('in result');
        //console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                console.log(results.arr)
                return res.status(200).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.get('/getuser',function(req, res) {
        if(req.session.user) {
            return res.status(200).send({"session":req.session.user});
        }
        else
        {
            res.status(401).send();
        }


});



app.post('/star',function(req, res) {
    kafka.make_request('star-topic',{"username":req.session.user,"path":'./public/uploads/'+req.param('path')}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.post('/unstar',function(req, res) {
    kafka.make_request('unstar-topic',{"username":req.session.user,"path":'./public/uploads/'+req.param('path')}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/delete',function(req, res) {
    kafka.make_request('delete-topic',{"username":req.session.user,"path":'./public/uploads/'+req.param('path'),"permission":req.param('permission')}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/share',function(req, res) {
    kafka.make_request('share-topic',{"username":req.session.user,"path":req.param('path'),email:req.param('email')}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});



app.post('/profile', function(req, res) {
     kafka.make_request('profile-topic',{"NAME":req.body.name,"EMAIL":req.body.email,"WORK":req.body.work,"EDUCATION":req.body.edu,"CONTACT":req.body.contact,"INTERESTS":req.body.interests,"LANG_PREF":req.body.lang_pref}, function(err,results){
         console.log('in result');
         console.log(results);
         console.log(results.code);
         if(err){
             res.status(401).send();
         }
         else
         {
             if(results.code == 204){
                 return res.status(201).send({username: "test"});
             }
             else {
                 res.status(401).send();
             }
         }
     });
});


app.post('/directory', function(req, res) {
    console.log(req.session.user);
     kafka.make_request('directory-topic',{"username":req.session.user,"folder":req.body.folder}, function(err,results){
         console.log('in result');
         console.log(results);
         console.log(results.code);
         if(err){
             res.status(401).send();
         }
         else
         {
             if(results.code == 204){
                 console.log('in result');
                 return res.status(204).send({username: "test"});
             }
             else {
                 res.status(401).send();
             }
         }
     });
});


// app.post('/getfilesindirec', function(req, res) {
//     console.log(req.session.user);
//     console.log(req.param('fname'))
//     kafka.make_request('filesindirec-topic',{"username":req.session.user,"folder":req.param('name')}, function(err,results){
//         console.log('in result');
//         console.log(results);
//         console.log(results.code);
//         if(err){
//             res.status(401).send();
//         }
//         else
//         {
//             if(results.code == 200){
//                 console.log('in result');
//                 return res.send(results.arr);
//             }
//             else {
//                 res.status(401).send();
//             }
//         }
//     });
// });


app.get('/getdetails',function(req, res) {
    kafka.make_request('Displayuserinfo-topic',{"username":req.session.user}, function(err,results){
        console.log('in resultdisp');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                return res.status(200).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.post('/Groupcreation',function (req,res) {
    kafka.make_request('group-topic',{"username":req.session.user,"group":req.body.group},function (err,results) {
        if(results.code === '200'){
            res.status(201).send();
        }
        else {
            res.status(400).send();
        }
    });
});
app.get('/listgroups',function (req,res) {
    kafka.make_request('Listofgroups-topic',{"username":req.session.user},function (err,results) {
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                console.log(results.arr)
                return res.status(201).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    });
});


app.post('/addmemberingroup',function (req,res) {
    kafka.make_request('addmemberingroup-topic',{"username":req.body.name,"groupname":req.body.groupname}, function(err,results){
        console.log('in result');
        console.log(results.code);
        console.log(results.code);
        if(err){
            res.status(500).send();
        }
        if(results.code === '204'){
            res.status(201).send();
        }
        else {
            res.status(401).send();
        }
    });
});

app.get('/groupmembers',function (req,res) {
    kafka.make_request('getgroupmembers-topic',{"username":req.session.user,"groupname":req.query.groupname},function (err,results) {
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 200){
                console.log(results.arr)
                return res.status(201).send(results.arr);
            }
            else {
                res.status(401).send();
            }
        }
    })
});


app.post('/deletegroup',function(req, res) {
    kafka.make_request('deletegroup-topic',{"groupname":req.body.groupname}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.post('/deletememberfromgroup',function(req, res) {
    kafka.make_request('deletememberfromgroup-topic',{"member":req.body.membername,"groupname":req.body.groupname}, function(err,results){
        console.log('in result');
        console.log(results);
        console.log(results.code);
        if(err){
            res.status(401).send();
        }
        else
        {
            if(results.code == 204){
                return res.status(204).send({username: "test"});
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

module.exports = app;
