var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongan = require('morgan');
var mongoose = require('mongoose');

app.use(mongan('dev'));
mongoose.connect('mongodb://localhost:27017/meanapi', function (err) {
    if (err) {
        console.log('Not connected to the database: '+err);
    } else {
        console.log('Successfuly connected to MongoDB');
    }
})

app.listen(port, function () {
    console.log('Running the server port ' + port)
});