var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");
var crypto = require('crypto');
app.use(bodyParser.json());
var cookieParser = require('cookie-parser');
var port = process.env.PORT||8000;
//app.engine('html', require('ejs').renderFile); 
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());


app.get('/helo', function ( req, res){

	var ip = req.headers['x-forwarded-for'] || 
     		req.connection.remoteAddress || 
     		req.socket.remoteAddress ||
     		req.connection.socket.remoteAddress;
	console.log('trying to get ip',ip);
	// the ip adress being passed is ipV6
	// node has a crypto module to create hash digests for by passing in different algorithms 
	// as the parameter
	var hash  = crypto.createHash('sha256').update(ip).digest('hex');
	
	console.log(hash);
	res.cookie('helo',hash);
	res.send(JSON.parse('{"message" : "C is for cookies. That\'s good enough for me."}'));
});

app.get('/ehlo', function ( req, res){
	console.log(req.cookies)

	if(req.cookies.helo){
		request('http://services.packetizer.com/motd/?f=json', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log('got cookeis', typeof body) // Print the google web page.
    		//uncommet the following line to clear the cookies for each get request to /ehlo
    		//res.clearCookie('helo');
	
    		res.send(JSON.parse(body));
 		 }
 		
		})
	}
	else{   
            console.log('no cookies');
 		 	res.send(JSON.parse('{ "message" : "No cookie. No message."}'));

 		}
 	//clear the cookie
	
	//res.send('Hello World');
});

//creating express server
var server = app.listen(port, function(){
	console.log('express server started...');
});