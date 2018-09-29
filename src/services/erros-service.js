'use strict';

exports.erro_500 = (next, message) => {
    let err = new Error(message);
    err.status = 500;
    next(err);
};

exports.erro_400 = (next, message) => {
    let err = new Error(message);
    err.status = 400;
    next(err);
};