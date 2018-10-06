'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const config = require('config');
const errorHandling = require('./middleware/error-handling');

const app = express();

//Connecta ao banco nosql
mongoose.connect(config.get('mongo.connectionstrings'), {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(config.get('message.M0001'));
    })
    .catch(err => {
        console.error(`${config.get('message.M0009')} ${err}`);
    });

//body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//validator
app.use(expressValidator());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//router
app.use('/api', require('./routes'));

//Error Handling
app.use(errorHandling.error);

module.exports = app;