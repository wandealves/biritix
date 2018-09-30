'use strict';

function IndexController() {}

IndexController.prototype.getInfo = function (req, res, next) {
    res.status(200).send({
        title: "Biritix API",
        version: '0.0.1'
    });
};

module.exports = new IndexController();