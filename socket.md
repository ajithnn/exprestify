## Usage

```js
var rest = require('exprestify')

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

// Needs to be after the server actions for the get, post etc have been defined. 
// This is a change after 0.3.7 version, if you had used previous versions, this is a breaking change.
var io = rest.getSocketServer()

io.on('connection', function (socket) {
    console.log("In Socket");
    socket.emit("news",{my:'data'});
});
// Again different from previous version no longer need to use a new variable to call listen.
rest.listen(3000)
```
