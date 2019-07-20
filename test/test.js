var request = require('supertest');
var app = require('../index.js');


describe('Route GET "/"', function() {
 it('should respond with Hello World!', function(done) {
    //navigate to root and check the the response is "Hello World!"
    request(app).get('/').expect('Hello World!', function(err){
        if (err){done(err);
            console.log("Error in Test")
        }
        else {
            console.log("Succes Test");
            done();
        }
    });
 });
});