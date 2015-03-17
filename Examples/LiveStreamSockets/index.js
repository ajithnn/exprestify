/*The code has been written by Rishi Gaurav Bhatnagar using exprestify, a module written by Ajith N N. This code creates a live stream using sockets. 
To install the modules 
$npm install exprestify 
$ npm install socket.io
*/


/* Requirements by the server*/
var rest = require('exprestify')
var fs = require('fs')
var path = require('path');
/* Headers required for cross-origin resource sharing */
var header ={
"Access-Control-Allow-Origin":"*", //Restrict it to the origin of your server
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
"Access-Control-Allow-Headers":"Content-Type"
};

rest.setHeaders(header);
/*Defining the functionality of / , this will be used to server the HTML file */
rest.getfile('/', function (err, query) { 
	if (!err) { 
		return "./index.html"; 
	} 
	else { 
		console.log(err); 
		return err; 
	} 
})
/* Defining the get functionality of /image , this will be used to fetch the image from the server*/
rest.getfile('/image', function (err, query) {
        if (!err) {
                return "./images/image_stream.jpg";
        }
        else {
                console.log(err);
                return err;
        }
})
/*This section is to post a certain type of file on the server. multiopt is posted on the server using rest.multipost*/
var multiopt = {
    FilePath: "./images/",
    PostType: "file",
    Rename: function () {
        return "image_stream"; //All the files will be renamed to image_stream
    }
}

rest.multipost('/pagemulti', function (err, data) {
    if (!err) {
      //  console.log(data);
    } else {
        console.log(err);
    }
}, multiopt)
/* Socket Io functionality to the server , support recently added by Ajith N N */

var server = rest.getSocketServer() 
var io = require('socket.io')(server);

io.on('connection', function (socket) { 
console.log("In Socket"); 
//socket.emit("news",{my:'data'}); //You can send an emit for acknowledgements, etc. 
startStreaming(io);
});
/* Socket watches a file in the folder, and on changes to it, updates the front-end*/
function startStreaming(io){
fs.watchFile('./images/image_stream.jpg', function(current, previous) {
    io.sockets.emit('liveStream', 'image?_t=' + (Math.random() * 100000));
  })
}
server.listen(process.env.PORT||4000,function(){
console.log("serving on port 0.0.0.0:4000");
}) // port number
