var express = require("express");
var app = express();

var path = require('path');
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded()); //MF1
//Parse JSON bodies (as sent by API clients)
app.use(express.json()); //MP2

app.get("/", function (req, res) {
    // [start(/) ----- MF1 ----- MF2-------[end]
    res.send('<h1>This is my web app');
});

app.post("/post", function (req, res) {
    console.log("post route was triggered");
    var fname = req.body.fname;
    var lname = req.body.lname;
    res.send('POST request to the homepage '
        + '<br>firstname: ' + fname + '<br>lastname: ' + lname);
})


app.get('/test.html', function(req, res) {
    console.log('directory:' + __dirname);
    console.log(path.join(__dirname + '/test.html'));
    res.sendFile(path.join(__dirname + '/test.html'));
});





//http://localhost:3000/temp/100
app.get("/temp/:celsius", function (req, res) { //: becomes variable
    //var request = require('request');
    //:celcius -----> req.params.celsius
    // :cel -----> req.params.cel
    // convert the celsius into a floating  number (decimal number)
    var celsius = parseFloat(req.params.celsius);
    var fahr = (celsius * 9 / 5) + 32;

    res.send(celsius + '<h3>' + ' celsius to fahrenheit is ' + fahr + '</h3>');
});


//http://localhost:3000/grade/100
app.get("/grade/:marks", function (req, res) { //: becomes variable
    // 0----50----80----100
    //[ F ] [ P ] [ A ]
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

    res.send('<h3> Your grade is ' + grade + '</h3>');
});


var listener =
    app.listen(process.env.PORT || 3000, process.env.IP, function () {
        console.log("server has started");
        console.log('Listening on port ' + listener.address().port);
    });