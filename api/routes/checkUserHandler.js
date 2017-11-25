var express = require('express');
var router = express.Router();

var atob = require('atob');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

router.use(function () {
    
});