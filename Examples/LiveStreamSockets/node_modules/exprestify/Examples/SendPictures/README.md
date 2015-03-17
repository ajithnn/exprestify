#Writing server using Exprestify to send files 

All the details on how to get started with it are mentioned here: https://github.com/ajithnn/exprestify

To get started with it, do the following:

Go to the project folder - 
$ npm install exprestify --save 


You use -- save so that it writes the dependency in package.json file by itself.  Latest version of the module is 0.2.0.

The getting started folder gives you a brief idea on how to write a server that can handle basic post and get request, we were using json/text in the previous example. But how do you write a server to send and receive files? This server is written to demonstrate the same, I will be sending the image files for showcasing it here. 
Initially I had written only to handle post requests, which means you will not be able to see whats happening there on the browser, because if you put a link in the browser, it being a client by default does a GET request from it, hence it will show an error which might freak you out. I have resolved that in this one, the server will handle both GET and POST requests.

All the code has been commented and for any doubts or issues you can write back.


To run the server :
$ node index.js 
