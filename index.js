/**
 *  * Create HTTP GET POST PUT DELETE methods using express for easier REST calls.
 **/
var express = require('express')
var http = require('http')
var https = require('https')
var path = require('path')
var app = express()


var rport;
var rports;

var catchAllErrors = function (err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
};

module.exports = {
    /** 
    GET function which takes a route on which the call needs to act and also the Value to return
    **/
    get: function (onPath, returnValueOrFunc) {
        app.get(onPath, function (req, res) {
            var contentType = req.get('content-type')||"None";
            if (typeof returnValueOrFunc == 'function') {
                res.send(returnValueOrFunc(req.query,contentType));
            } else {
                res.send(returnValueOrFunc)
            }
        });
    },
    /** 
    GET function which takes a route on which the call needs to act and also the File to return
    **/
    getfile: function (onPath, returnFileFunc) {
        app.get(onPath, function (req, res) {
            if(typeof returnFileFunc == 'function'){
                res.sendFile(path.join(__dirname, '../../', returnFileFunc(req.query)));
            }
            else{
            res.sendFile(path.join(__dirname, '../../', returnFileFunc))
            }
        });
    },
    post: function (onPath, data, returnFunction) {
        return returnFunction();
    },
    /** 
    listen function for http
    **/
    listen: function (port, retFunction) {
        if (port < 1024) {
            throw new Error('Port needs to be greater than 1024');
        }
        this.port = port;
        app.use(catchAllErrors);
        http.createServer(app).listen(port, retFunction);
    },
    /** 
    listen function for https
    **/
    listens: function (port, options, retFunction) {
        if (port < 1024) {
            throw new Error('Port needs to be greater than 1024');
        }
        this.ports = port;
        app.use(catchAllErrors);
        https.createServer(options, app).listen(port, retFunction);
    },
    port: rport,
    ports: rports
};