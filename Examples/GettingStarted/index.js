/* Read more about the server here : https://github.com/ajithnn/exprestify , This has been specifically written for REST API calls */



var express = require('express') // Express node module, Helps to write GET and POST calls in a easy way.
var curValue = "none"; // Shared Variable used to share data between GET and POST Request. Not ideal. Should use a DB.
var rest = require('exprestify')
var sent_data;
var app = express(); // Init express.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Allow cross rigin requests, as the client and server arenot on the same domain.

opt = {
    extended: false
}
/*Cross origin resource sharing */
var header ={
"Access-Control-Allow-Origin":"http://localhost:4000", //It can be restricted to any other domains by replacing the link and open for all domains, using *
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
"Access-Control-Allow-Headers":"Content-Type"
};

rest.setHeaders(header);
/* This defines the kind of content the server can handle*/
var options = {
    contentType: "json",//The content type could be text also. In case of files, check the other example to send photos.
    config: opt
}

/*How to handle get requests made to the server */
rest.get('/linkName', function(){
      return curValue;
})
/*How to handle POST requests made to the server */
rest.post('/linkName', function (err, data) {
    if (!err) {
        curValue = data.value;
        console.log(curValue); // To check the value being posted
/*   In the following section, you can write the logic for handling data. You can set a flag, make a call to a different link, etc.     
if (sent_data == curValue){
          flag_same ="1";
        }
        else{
          sent_data = curValue;
          flag_same = "0";
          return curValue;
        }*/
    } else {
        console.log(err);
    }
}, options)

/*Below code is to Run the server */

rest.listen(process.env.PORT||3000, function () { //proces.env.PORT helps binding a port when you deploy it on a platform like Heroku. Otherwise port witll be 3000, you can change this port number if you wish.
    console.log("Listening on port 0.0.0.0:%s", rest.port) //Open your browser and go to localhost:3000/linkName 
})

