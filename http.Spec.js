"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('HTTP servers', function() {

  it('should respond to request to /time with status code 200', function(done) {

    chai.request('localhost:3000')
          .get('/time')
          /*.end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          }); */
          .then(function (res) {
             expect(res).to.have.status(200);
             done();
          })
          .catch(function (err) {
             throw err;
          });

  });

  it('server time in seconds should equal test time in seconds', function(done) {
    var time = new Date().getTime();
    chai.request('localhost:3000')
          .get('/time')
          .end(function (err, res) {
            expect(res.text).to.equal(Math.floor(time/1000).toString());
            done();
          });

  });

  it('server should send a greeting to the name in the GET request', function(done) {

    chai.request('localhost:3000')
          .get('/greet/Sebastian')
          .end(function (err, res) {
            expect(res.text).to.equal('How are you, Sebastian?');
            done();
          });

  });

  it('server should send a greeting to the name in the POST request in JSON', function(done) {

    chai.request('localhost:3000')
          .post('/greet/Martha')
          .end(function (err, res) {
            //expect(res.text).to.equal('How are you, Sebastian?');
            done();
          });

  });

});
