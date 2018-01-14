"use strict";

var express       = require("express");
var bodyParser    = require('body-parser');
var jwt           = require('jsonwebtoken');
var jwtMiddleware = require('../index');
var app           = express();

var router = app.Router();
var authRouter = app.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

//routes

const user = {
    username: "foo",
    password: "bar"
}

router.get('/', function(req, res) {
    res.json("Default route");
});

router.get('/getToken', function(req, res) {
    const payload = {
        username: user.username,
        password: user.password
    }

    var token = jwt.sign(payload, "tokenauth", {
        expiresIn: '24h'
    });

    res.json({
        success: true,
        message: "Enjoy your token!",
        token: token
    });
});

app.use('/test', authRouter);

authRouter.use(jwtMiddleware("tokenauth"));

authRouter.get('/', function(req, res) {
    res.json(req.decoded);
})

module.exports = app;
