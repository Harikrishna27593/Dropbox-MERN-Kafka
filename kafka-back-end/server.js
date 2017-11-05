var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var upload=require('./services/upload');
var getfiles=require('./services/getfiles');
var star=require('./services/star');
var unstar=require('./services/unstar');
var deletefiles=require('./services/deletefiles');
var share=require('./services/share');
var Activity=require('./services/Activity');
var Profile=require('./services/Profile');
var GetUserDetails=require('./services/GetUserDetails');
var Directory=require('./services/Directory');
var topic_name = 'login-topic';
var topic_name2 = 'signup-topic';
var topic_name3 = 'upload-topic';
var topic_name4 = 'getfiles-topic';
var topic_name5 = 'star-topic';
var topic_name6 = 'unstar-topic';
var topic_name7 = 'delete-topic';
var topic_name8 = 'share-topic';
var topic_name9 = 'Activity-topic';
var topic_name10 = 'profile-topic';
var topic_name11 = 'Displayuserinfo-topic';
var topic_name12 = 'directory-topic';
var consumer = connection.getConsumer(topic_name);
var consumer2 = connection.getConsumer(topic_name2);
var consumer3 = connection.getConsumer(topic_name3);
var consumer4 = connection.getConsumer(topic_name4);
var consumer5 = connection.getConsumer(topic_name5);
var consumer6 = connection.getConsumer(topic_name6);
var consumer7 = connection.getConsumer(topic_name7);
var consumer8 = connection.getConsumer(topic_name8);
var consumer9 = connection.getConsumer(topic_name9);
var consumer10 = connection.getConsumer(topic_name10);
var consumer11 = connection.getConsumer(topic_name11);
var consumer12 = connection.getConsumer(topic_name12);
var producer = connection.getProducer();

console.log('server is running');

consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    login.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer2.on('message', function (message) {
    console.log('message received from signup');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    signup.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer3.on('message', function (message) {
    console.log('message received from upload');
   // console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    upload.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer4.on('message', function (message) {
    console.log('message received from upload');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    getfiles.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer5.on('message', function (message) {
    console.log('message received from star');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    star.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer6.on('message', function (message) {
    console.log('message received from unstar');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    unstar.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer7.on('message', function (message) {
    console.log('message received from delete');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    deletefiles.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer8.on('message', function (message) {
    console.log('message received from share');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    share.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer9.on('message', function (message) {
    console.log('message received from Activity');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    Activity.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer10.on('message', function (message) {
    console.log('message received from Activity');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    Profile.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer11.on('message', function (message) {
    console.log('message received from Activity');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    GetUserDetails.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});
consumer12.on('message', function (message) {
    console.log('message received from Directory');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    Directory.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});