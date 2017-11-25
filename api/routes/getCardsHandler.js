var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

app.use(function (req, res, next) {
    next();
});

module.exports = router;