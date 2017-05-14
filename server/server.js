var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/model/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(mongan('dev'));
mongoose.connect('mongodb://localhost:27017/meanapi', function (err) {
    if (err) {
        console.log('Not connected to the database: '+err);
    } else {
        console.log('Successfuly connected to MongoDB');
    }
})

app.post('/users', function (req, res) {

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {        
        res.send('Ensure username,password and email were provided')
    } else {
        user.save(function (err) {
            if (err) {         
                res.send('Username or Email already exist')                
            } else {
                res.send('User Created!');
            }
        });
    }        
})

app.listen(port, function () {
    console.log('Running the server port ' + port)
});