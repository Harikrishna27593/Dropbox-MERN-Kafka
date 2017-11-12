/**
 * New node file
 */
var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {



    it('should return the login page if the url is correct', function(done) {
        http.get('http://localhost:3000/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should not return the home page if the url is wrong', function(done) {
        http.get('http://localhost:3001/home', function(res) {
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('should Login as credentials are correct', function(done) {
        request.post(
            'http://localhost:3001/login',
            { form: {username: 'hknitw@gmail.com',password:'1q2w3e4r' } },
            function (error, response, body) {
                assert.equal(201, response.statusCode);
                done();
            }
        );
    });
    it('should not Login as credentials are incorrect', function(done) {
        request.post(
            'http://localhost:3001/login',
            { form: {username: 'hknitw@gmail.com',password:'aaasdsf' } },
            function (error, response, body) {
                assert.equal(401, response.statusCode);
                done();
            }
        );
    });
    it('should signup with the given credentials', function(done) {
        request.post(
            'http://localhost:3001/dosignup',
            { form: {firstname:'Sansa',lastname:'Stark',username:'Sansa@got.com',password:'1q2w3e4r' } },
            function (error, response, body) {
                assert.equal(201, response.statusCode);
                done();
            }
        );
    });
    it('should not signup as the credentials are already present', function(done) {
        request.post(
            'http://localhost:3001/dosignup',
            { form: {firstname:'Arya',lastname:'Stark',username:'Arya@got.com',password:'1q2w3e4r' } },
            function (error, response, body) {
                assert.equal(401, response.statusCode);
                done();
            }
        );
    });
});
