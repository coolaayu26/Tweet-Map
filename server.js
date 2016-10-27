/**
 * Created by ADDY on 19/10/16.
 */

var express = require('express');
var app = express();

var http = require('http');



// app.get('/', function (req, res) {
//     console.log(req.headers);
//     res.sendFile(__dirname + '/public/index.html');
// });
app.use(express.static(__dirname + '/public'));

require("./request.js")(app);
var port = 8081;
var server = app.listen(port, function(){
    console.log("server running at localhost:"+port+"/");
});
