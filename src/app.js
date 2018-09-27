'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');;
const config = require('config');

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

//Auto-Load
consign()
    .include('src/models')
    .then('src/routes')
    .into(app);

module.exports = app;