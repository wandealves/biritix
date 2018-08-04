'use strict';

const message = require('../../config/message');

exports.updateValidator = (id, items) => {

    if (id === undefined || id == null) {
        return message.erros.E0018;
    }

    if (items == null) {
        return message.erros.E0019;
    }

    if (items.length == 0) {
        return message.erros.E0019;
    }

    return '';
};