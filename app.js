/*
Package dependenies
*/
var express     = require('express');
var app         = express();
var http        = require('http');
var path        = require('path');
var cors        = require('cors');  // to allow cors
var bodyParser  = require('body-parser'); // to get request parameter

var morgan      = require('morgan');
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var mysql       = require('mysql');
require('dotenv').config(); // to get information of database and JWT

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

// ------------------------------------connect to database--------------------------------------------------------

connection.connect(function (err) {
    if(!err) {
        console.log("Database is connected ... ");
    }
    else {
        console.log("Error connecting Database ... ");
        console.log(err);
    }
});

global.db = connection;

//-------------------------------------configure environment-----------------------------------------------------------------

app.set('port', process.env.PORT || 3000); // set port
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------get request parameters------------------------------------------------------

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//-------------------------------------log to console---------------------------------------------------------------

app.use(morgan('dev'));

//-------------------------------------set header to allow cors---------------------------------------------------------

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//-------------------------------------routes-----------------------------------------------------------------------
//var user        = require('./api/routes/user');
var index = require('./api/routes/index');
var reg_handler = require('./api/routes/registrationHandler');
var con_handler = require('./api/routes/connectionHandler');

app.use('/', index);
app.post('/signup', reg_handler);
app.post('/signin', con_handler);
//app.use('/signup', reg_handler);



/*
error handler
if error is encountered, display error and stacktrace
 */
var error = require('./api/errors');
app.use(error);

// app.use('/users', users);

http.createServer(app).listen(app.get('port'), function () {
    console.log('SBA server listening on port ' + app.get('port'));
});