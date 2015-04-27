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
// Because the get Socket server returns the app variable from the express context, for use with socketio.
var io = rest.getSocketServer()

io.on('connection', function (socket) {
    console.log("In Socket");
    socket.emit("news",{my:'data'});
});

rest.listen(3000)
```
