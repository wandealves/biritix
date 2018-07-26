'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');

const app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//validator
app.use(expressValidator());

//Auto-Load
consign()
    .include('src/routes')
    .into(app);

module.exports = app;