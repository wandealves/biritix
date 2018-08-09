'use strict';

const message = require('../../config/message');

exports.create = (req) => {

    req.assert('name', message.E0008).notEmpty();
    req.assert('email', message.E0001).notEmpty();
    req.assert('email', message.E0003).isEmail();
    req.assert('password', message.E0002).notEmpty();
    req.assert('password', message.E0006).len(5, 100);

    return req.validationErrors();
};

exports.update = (req) => {

    req.assert('name', message.E0008).notEmpty();;
    req.assert('password', message.E0002).notEmpty();
    req.assert('password', message.E0006).len(5, 100);

    return req.validationErrors();
};

exports.authenticate = (req) => {
    req.assert('email', message.E0001).notEmpty();
    req.assert('email', message.E0003).isEmail();
    req.assert('password', message.E0002).notEmpty();
    req.assert('password', message.E0006).len(5, 100);

    return req.validationErrors();
};