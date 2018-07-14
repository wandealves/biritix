'use strict'

const express = require('express');
const router = express.Router();

const route = router.get('/', (requestAnimationFrame, res, next) => {
    res.status(200).send({
        title: "Biritix API",
        version: "1.0.0"
    });
});

module.exports = router;