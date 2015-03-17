/**
 *  * Create HTTP GET POST PUT DELETE methods using express for easier REST calls.
 **/
var express = require('express')
var http = require('http')
var https = require('https')
var path = require('path')
var multer = require('multer')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').Server(app);
var rport;
var rports;
//************************************************************************************************
/** Utility function to get the right type of body parser for handling POST requests.**/
function getContentType(options) {
    if (options.contentType == "urlencoded") {
        return bodyParser.urlencoded(options.config)
    } else if (options.contentType == "json") {
        return bodyParser.json(options.config)
    } else if (options.contentType == "raw") {
        return bodyParser.raw(options.config)
    } else if (options.contentType == "text") {
        return bodyParser.text(options.config)
    }
}
//************************************************************************************************

module.exports = {
    /** 
    GET function which takes a route on which the call needs to act and also the Value to return
    **/
    get: function (onPath, returnValueOrFunc) {
        app.get(onPath, function (req, res) {
            try {
                var contentType = req.get('content-type') || "None";
                if (typeof returnValueOrFunc == 'function') {
                    res.send(returnValueOrFunc(false, req.query, contentType));
                } else {
                    res.send(JSON.stringify(returnValueOrFunc))
                }
            } catch (e) {
                if (typeof returnValueOrFunc == 'function') {
                    returnValueOrFunc(e, "", "");
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
                    res.sendFile(path.join(__dirname, '../../', returnFileFunc(false, req.query)));
                } else {
                    res.sendFile(path.join(__dirname, '../../', returnFileFunc))
                }
            } catch (e) {
                if (typeof returnFileFunc == 'function') {
                    returnFileFunc(e, "");
                } else {
                    throw e;
                }
            }
        });

    },
    /** POST function which takes the route and a return value OR Callback function. There is not version of POST which can return a file, as the             client needs to handle it by making a getfile call.**/
    post: function (onPath, returnFunction, options) {
        app.post(onPath, getContentType(options), function (req, res) {
            try {
                if (typeof returnFunction == 'function') {
                    res.status(200).send(returnFunction(false, req.body));
                } else {
                    res.status(200).send(JSON.stringify(returnFunction));
                }
            } catch (e) {
                if (typeof returnFunction == 'function') {
                    res.status(400).send(returnFunction(e, ""));
                } else {
                    throw e;
                }
            }
        });
    },
    /** MultiPart POST function with two options for either reading fields or files.**/
    multipost: function (onPath, returnFunction, options) {
        app.use(onPath, multer({
            dest: options.FilePath,
            rename: options.Rename
        }));
        app.post(onPath, function (req, res) {
            try {
                if (typeof returnFunction == 'function') {
                    if (options.PostType == 'field') {
                        res.status(200).send(returnFunction(false, req.body));
                    } else if (options.PostType == 'file') {
                        res.status(200).send(returnFunction(false, req.files));
                    }
                } else {
                    res.status(200).send(JSON.stringify(returnFunction));
                }
            } catch (e) {
                if (typeof returnFunction == 'function') {
                    res.status(400).send(returnFunction(e, ""));
                } else {
                    throw e;
                }
            }
        });
    },
    put: function (onPath, returnFunction) {
        app.put(onPath, function (req, res) {
            try {
                if (typeof returnFunction == 'function') {
                    res.status(200).send(returnFunction(false, req.params));
                } else {
                    res.status(200).send(JSON.stringify(returnFunction));
                }
            } catch (e) {
                if (typeof returnFunction == 'function') {
                    res.status(400).send(returnFunction(e, ""));
                } else {
                    throw e;
                }
            }
        });
    },
    delete: function (onPath, returnFunction) {
        app.delete(onPath, function (req, res) {
            try {
                if (typeof returnFunction == 'function') {
                    res.status(200).send(returnFunction(false, req.params));
                } else {
                    res.status(200).send(JSON.stringify(returnFunction));
                }
            } catch (e) {
                if (typeof returnFunction == 'function') {
                    res.status(400).send(returnFunction(e, ""));
                } else {
                    throw e;
                }
            }
        });
    },
    
    setHeaders: function(headerObj){
            var headers = Object.keys(headerObj);
            app.use(function(req,res,next){
                for(i in headers){
                    console.log(headers[i]+" : "+headerObj[headers[i]])
                    res.header(headers[i],headerObj[headers[i]]);
                }
                next();
            });
    },
    getSocketServer: function(){
	    return server;
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

//************************************************************************************************
