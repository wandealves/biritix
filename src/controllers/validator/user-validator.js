'use strict';

const config = require('config');

exports.create = (req) => {

    req.assert('name', config.get('message.M0017')).notEmpty();
    req.assert('email', config.get('message.M0002')).notEmpty();
    req.assert('email', config.get('message.M0004')).isEmail();
    req.assert('password', config.get('message.M0003')).notEmpty();
    req.assert('password', config.get('message.M0007')).len(5, 100);

    let erros = req.validationErrors();
    let messages = [];

        if (erros)
        erros.forEach(e => {
            messages.push(e.msg);
        });

    return messages.join(', ');
};

exports.update = (req) => {

    req.assert('name', config.get('message.M0017')).notEmpty();
    req.assert('password', config.get('message.M0003')).notEmpty();
    req.assert('password', config.get('message.M0007')).len(5, 100);

    let erros = req.validationErrors();
    let messages = [];

    if (erros)
        erros.forEach(e => {
            messages.push(e.msg);
        });

    return messages.join(', ');
};

exports.authenticate = (req) => {

    req.assert('email', config.get('message.M0002')).notEmpty();
    req.assert('email', config.get('message.M0004')).isEmail();
    req.assert('password', config.get('message.M0003')).notEmpty();
    req.assert('password', config.get('message.M0007')).len(5, 100);

    let erros = req.validationErrors();
    let messages = [];

    if (erros)
        erros.forEach(e => {
            messages.push(e.msg);
        });

    return messages.join(', ');
};