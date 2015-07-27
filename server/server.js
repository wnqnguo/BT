var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");
var crypto = require('crypto');
app.use(bodyParser.json());
var cookieParser = require('cookie-parser')
//app.engine('html', require('ejs').renderFile); 
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());

// app.get('/', function(req, res) {
// 	res.sendfile(__dirname+'./client/index.html');
//   // do something here.
// });
// 
app.get('/helo', function ( req, res){
	var ip = req.headers['x-forwarded-for'] || 
     		req.connection.remoteAddress || 
     		req.socket.remoteAddress ||
     		req.connection.socket.remoteAddress;
	console.log('trying to get ip',ip);
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


var server = app.listen(8000, function(){
	console.log('express server started...');
});