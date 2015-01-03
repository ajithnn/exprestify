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

module.exports = {
    /** 
    GET function which takes a route on which the call needs to act and also the Value to return
    **/
    get: function (onPath, returnValueOrFunc) {
        app.get(onPath, function (req, res) {
            try {
                var contentType = req.get('content-type') || "None";
                if (typeof returnValueOrFunc == 'function') {
                    res.send(returnValueOrFunc(false,req.query, contentType));
                } else {
                    res.send(returnValueOrFunc)
                }
            } catch (e) {
                if (typeof returnValueOrFunc == 'function') {
                    returnValueOrFunc(e,"","");
                } else {
                    throw e;
                }
            }
        });

    },
    /** 
    GET function which takes a route on which the call needs to act and also the File to return
    **/
    getfile: function (onPath, returnFileFunc) {
        app.get(onPath, function (req, res) {
            try {
                if (typeof returnFileFunc == 'function') {
                    res.sendFile(path.join(__dirname, '../../', returnFileFunc(false,req.query)));
                } else {
                    res.sendFile(path.join(__dirname, '../../', returnFileFunc))
                }
            } catch (e) {
                if (typeof returnFileFunc == 'function') {
                    returnFileFunc(e,"");
                } else {
                    throw e;
                }
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
        https.createServer(options, app).listen(port, retFunction);
    },
    port: rport,
    ports: rports
};