'use strict';

const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/index-controller');

router.get('/', controller.getInfo);

module.exports = router;