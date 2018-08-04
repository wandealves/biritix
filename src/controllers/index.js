'use strict';

module.exports.get = (req, res, next) => {
    res.status(200).send({
        title: "Biritix API",
        version: "1.0.0"
    });
};