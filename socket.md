## Usage

```js
var rest = require('exprestify')
<script src="/socket.io/socket.io.js"></script>
var rest = require('exprestify')
var rest = require('exprestify')
var fs = require('fs')
var header ={
"Access-Control-Allow-Origin":"http://localhost:4000",
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
"Access-Control-Allow-Headers":"Content-Type"
};

rest.setHeaders(header);

rest.getfile('/', function (err, query) {
    if (!err) {
            return "./exprestify/exptest/index.html";
        }
     else {
        console.log(err);
        return err;
    }
})


var server = rest.getSocketServer()
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log("In Socket");
    socket.emit("news",{my:'data'});
});

server.listen(3000)
```
