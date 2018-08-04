'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const appSettings = require('./config/app-settings');
const message = require('./config/message');

const app = express();

//Connecta ao banco nosql
mongoose.connect(appSettings.connectionstrings, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(message.messages.M0002);
    })
    .catch(err => {
        console.error(`${message.erros.E0012} ${err}`);
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