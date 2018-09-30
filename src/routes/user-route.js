'use strict';

const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userModel = require('../models/user'),
    user = mongoose.model('User', userModel),
    repository = require('../repositories/user-repository')(user),
    controller = require('../controllers/user-controller')(repository);

router.get('/', controller.getAll.bind(controller));
router.get('/:email', controller.getByEmail.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.post('/auth', controller.authenticate.bind(controller));

module.exports = router;