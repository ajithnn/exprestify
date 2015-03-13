/*The code below has been written using exprestify, a module by Ajith N N , you can find the module here:https://github.com/ajithnn/exprestify 
The code below is going to used to send files to a server and saving them there.*/

var rest = require('exprestify') //Module required
/*Cross origin resource sharing*/
var header ={
"Access-Control-Allow-Origin":"http://localhost:4000", //It can be restricted to any other domains by replacing the link and open for all domains, using *
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
"Access-Control-Allow-Headers":"Content-Type"
};

rest.setHeaders(header);

/*The following code defines where will the file be saved,how will it be named etc */
var multiopt ={
FilePath:"./images/", 		//File is going to be saved at a folder called 'images'
PostType:"file", 		//Mulitpart post
Rename: function(fieldname,filename){
	return fieldname; //Field name is what you add to the file,you then control how the file will be saved in the folder
}
}

/* Test the Server using Postman , 
chose 'POST' , use the link :  http://localhost:3000/pagemulti 


Key is the field name => It could be anything that you want to name your file with. The type of the file will be appeneded 
automatically, you don't have to write that. Also, no file type conversion will take place here. 

Chose 'File' on 'Text/file' drop down
*/

rest.multipost('/pagemulti', function (err, data) { //File will be posted at servername/pagemulti 
    if (!err) {
        console.log(data); //You will be able to see whether the data is posted correctly.
    } else {
        console.log(err);
    }
}, multiopt)

/* To get the files form the server you will have to write the url in the following way:
 
 http://localhost:3000/images?value=nameOffile.fileType

*/

rest.getfile('/folderName', function (err, query) {
    if (!err) {
        if (query.value) {
            return "./folderName/" + query.value;
        } else {
            return ""; //You could return a default value here

        }
    } else {
        console.log(err);
        return err;
    }
})

rest.listen(3000, function () { //Running the server
    console.log("Listening on port 0.0.0.0:%s", rest.port)
})
