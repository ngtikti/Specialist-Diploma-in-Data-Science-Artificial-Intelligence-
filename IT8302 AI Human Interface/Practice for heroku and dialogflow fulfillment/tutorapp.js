//----------------------------------------
// Importing modules
//----------------------------------------
var express = require("express");
var app = express();
var path = require('path');
var dessert = require("./controller/dessert"); //importing another file, into varable called dessert

//----------------------------------------
// Middleware Functions
//----------------------------------------
// app.use() is to apply a middleware function
// to the request-response life cycle

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());  // MF1
// Parse JSON bodies (as sent by API clients)
app.use(express.json());        // MF2

/*
  GET     - simple queries  
  POST    - create / add
  PUT     - update
  DELETE  - delete

  CRUD - Create, Read, Update, Delete
*/

//----------------------------------------
// Endpoints
//----------------------------------------
app.get("/", function (req, res) {
  // [start(/)] ----- MF1 ------ MF2 -------[end]
  res.send('<h1>This is my web app');
});

app.post("/post", function (req, res) {
  // typing localhost:3000/post is not going to trigger this
  //end point, because entering an address in web browser
  //triggers a GET request instead
  // We currently do not have app.get("/post")
  
  // [start(/post)] ----- MF1 ------ MF2 ----------[end]
  //               build req.body   build req.body
  console.log("post route was triggered");

  // req.body contains the information posted by user
  // we are extracting info from the body, and saving them
  // into our own variables here
  var fname = req.body.fname;
  var lname = req.body.lname;
  res.send('POST request to the homepage ' + '<br>firstname: ' + fname + '<br>lastname: ' + lname);
});

app.get('/test.html', function (req, res) {
  console.log('directory:' + __dirname); 
  console.log(path.join(__dirname + '/test.html'));
  res.sendFile(path.join(__dirname + '/test.html'));
});

// http://localhost:3000/temp/100
app.get("/temp/:celsius", function (req, res) {
  //var request = require('request');
  // :celsius -----> req.params.celsius
  // :cel     -----> req.params.cel
  // convert the celsius into a floating number (decimal number)
  var celsius = parseFloat(req.params.celsius);
  var fahr = (celsius * 9 / 5) + 32;

  res.send(celsius + '<h3>' + ' celsius to fahrenheit is ' + fahr + '</h3 > ');
});

// http://localhost:3000/grade/100
app.get("/grade/:marks", function (req, res) {
  // 0 ----- 50 ---- 80 ---- 100
  // [  F  ] [    P  ][   A   ]
  var grade = 'Z';
  var marks = req.params.marks;

  if (marks > 80) {
    grade = 'A';
  }
  else if (marks > 50) {
    grade = 'P';
  }
  else {
    grade = 'F';
  }

  res.send('<h3>Your grade is ' + grade + '</h3>');
});

//setup this endpoint for DialogFlow
// POST >> http://localhost:3000/chat
// POST >>  https://aihi-weather-7190-2.herokuapp.com/chat

app.post("/chat", function (req,res){
  console.log("servicing POST >> /chat...");

  // let's get the intent name
  var intent = req.body.queryResult.intent.displayName;
  var result = {};

  switch (intent){
    case "saysomething":
     result={
       fulfillmentText:"from Say Something"
     }
    break;
// you can get the intent name from your
//DialogFlow > Diagnostic Info > Fulfilment Request
    case "GetDessertPrice":
      result=dessert.handleIntent_getDessertPrice(req);
    break;
  }

  // build output package
  var jsonData = {
    fulfillmentText: result.fulfillmentText
  };

  // send data out
  res.status(result.statusCode);
  res.type("json");
  res.send(JSON.straingify(jasonData));
});
//----------------------------------------
// Main
//----------------------------------------
var listener = app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("server has started");
  console.log('Listening on port ' + listener.address().port);
});