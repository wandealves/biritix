'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Auto-Load
consign()
    .include('src/routes')
    .then('src/controllers')
    .into(app);

module.exports = app;