/**
 * Created by ADDY on 19/10/16.
 */

var express = require('express');
var app = express();

var http = require('http');


app.use(express.static(__dirname + '/public'));

require("./request.js")(app);
var port = 8081;
var server = app.listen(port, function(){
    console.log("server running at localhost:"+port+"/");
});
