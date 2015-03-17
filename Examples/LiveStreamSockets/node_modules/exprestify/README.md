# Exprestify

  REST API Module built on top of Express. This project was created as creating REST CRUD calls on express required 
  multiple dependencies. This is an effort to combine all those dependencies to provide a simpler interface.
  
## Features

  - POST interface which can handle JSON/form-encoded data in a single interface.
  - Multipart Post interface which can handle both files and fields, built on multer.
  - GET and GETFILE interface to easily create GET calls.
  - PUT and DELETE functions. 

## Installation

To install exprestify run:

    $ npm install exprestify

To add to your project as a dependency:

    $ npm install --save exprestify
 
## Usage

```js
var rest = require('exprestify')
var fs = require('fs')

var creds = {
    key: fs.readFileSync('./assets/key.pem'),
    cert: fs.readFileSync('./assets/key-cert.pem')
}

var header ={
"Access-Control-Allow-Origin":"http://localhost:4000",
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
"Access-Control-Allow-Headers":"Content-Type"
};

rest.setHeaders(header);

rest.get('/', "This is returned")
rest.get('/page1', function (err, query, contentType) {
    if (!err) {
        console.log(contentType);
        if (query.value == 1) {
            return "This is still page1";
        } else {
            return "This is page1";
        }
    } else {
        console.log(err);
    }
})
rest.get('/page2', "This is page2")
rest.get('/page3', "This is page3")
rest.getfile('/index', function (err, query) {
    if (!err) {
        if (query.value) {
            return "./html/index1.html";
        } else {
            return "./html/index.html";

        }
    } else {
        console.log(err);
        return err;
    }
})

opt = {
    extended: false
}
var options = {
    contentType: "text",
    config: opt
}

rest.post('/pagepost', function (err, data) {
    if (!err) {
        return data;
    } else {
        console.log(err);
    }
}, options)



var multiopt = {
    FilePath: "./assets/",
    PostType: "file",
    Rename: function () {
        return "File1";
    }
}

rest.multipost('/pagemulti', function (err, data) {
    if (!err) {
        console.log(data);
    } else {
        console.log(err);
    }
}, multiopt)


var multiopt1 = {
    FilePath: "./html/",
    PostType: "file",
    Rename: function (fieldname, filename) {
        return fieldname;
    }
}

rest.multipost('/pagemulti1', function (err, data) {
    if (!err) {
        console.log(data);
    } else {
        console.log(err);
    }
}, multiopt1)


rest.put('/api/put/:id', function (err, data) {
    if (!err) {
        console.log(data);
        return "Updated id " + data.id
    } else {
        console.log(err);
    }
})

rest.delete('/api/delete/:id', function (err, data) {
    if (!err) {
        console.log(data);
        return "Deleted id " + data.id
    } else {
        console.log(err);
    }
})



rest.listens(3443, creds, function () {
    console.log("Listening on port 0.0.0.0:%s", rest.ports)
})

rest.listen(3000, function () {
    console.log("Listening on port 0.0.0.0:%s", rest.port)
})
```
## TODO

 - Mocha Tests.
 - Add more Multer options to Multipart Post handler.

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
