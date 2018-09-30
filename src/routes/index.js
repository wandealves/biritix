'use strict';

const express = require('express'),
    router = express.Router();

//index
router.use('/', require('./index-route'));
//user
router.use('/user', require('./user-route'));

module.exports = router;