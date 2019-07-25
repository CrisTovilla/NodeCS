var request = require('supertest');
var app = require('../index.js');
const db = require('sqlite')

describe('Api Routes', function() {
    before(async function(){
        await db.open('./database.sqlite', { Promise })
        await db.migrate({ force: 'last' })
    });
    after(function(done) {
        // runs after all tests in this block
        process.exit(0)
    });
    
    describe('Route GET "/"', function() {
        it('should respond with Hello World!', function(done) {
           //navigate to root and check the the response is "Hello World!"
           request(app).get('/').expect('Hello World!', function(err){
               if (err){
                   done(err);
               }
               else {
                   done();
               }
           });
        });
       });
    
    describe('Route GET "/category/:id"', function() {
        it('should respond with {"category":{"id":1,"name":"Test"}}', function(done) {
           request(app).get('/category/1')
           .expect(200, {
               category :{
                   id:1,
                   name:"Test"
               }
            }, done)
        });
    });

    describe('Route POST /category/', function() {
        it('responds with json', function(done) {
          request(app).post('/category/')
            .send({name: 'Games'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
      });

      
    describe('Route PUT /category/:id', function() {
        it('responds with json', function(done) {
          request(app).put('/category/1')
            .send({name: 'Role-Playing'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
      });

    describe('Route GET "/category/"', function() {
        it('should respond with all the categories {"categories":[{"id":1,"name":"Role-Playing"}},{"category":{"id":2,"name":"Games"}]}', function(done) {
           request(app).get('/category/')
           .expect(200, {
               categories :
               [
                    {
                        id:1,
                        name:"Role-Playing"
                    },
                    {
                        id:2,
                        name:"Games"
                    }
                ]
            }, done)
        });
    });

    
 
});




