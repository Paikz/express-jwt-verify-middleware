"use strict";

var app      = require('./server');
var chai     = require('chai');
var chaiHttp = require('chai-http');
var expect   = chai.expect;
var server;

chai.use(chaiHttp);

const url  = "http://localhost:" + app.get('port')
const port = process.env.PORT || '3030';

app.set('port', port);

var failedToAuth = { success: false, message: 'Failed to authenticate token.' };
var noToken      = { success: false, message: 'No token provided.' };

describe('test routes', function() {
    before(function() {
        server = app.listen(app.get('port'));
    })

    it('/ should return status 200', function (done) {
        chai.request(server)
        .get("/")
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    it('/gettoken should return status 200', function (done) {
        chai.request(server)
        .get('/getToken')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    it('/test should return status 403', function (done) {
        chai.request(server)
        .get('/test')
        .end(function (err, res) {
            expect(res).to.have.status(403);
            expect(res.body).to.deep.equal(noToken)
            done();
        });
    });

    it('/test?token=1.1.1 should return status 403 and failedToAuth', function (done) {
        chai.request(server)
        .get('/test?token=1.1.1')
        .end(function (err, res) {
            expect(res).to.have.status(403);
            expect(res.body).to.deep.equal(failedToAuth)
            done();
        });
    });

    after(function () {
        server.close();
    });
})


describe('Test JWT', function () {
    before(function () {
        server = app.listen(app.get('port'));
    });

    it('statuscode 200 when using the created token', function (done) {
        chai.request(server)
        .get('/getToken')
        .end(function (err, res) {
            chai.request(server)
            .get('/test?token=' + res.body.token)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body.username).to.equal('foo');
                done();
            });
        });
    });

    after(function () {
        server.close();
    });
});
