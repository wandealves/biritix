'use strict'

module.exports = app => {
    app.get('/', (requestAnimationFrame, res, next) => {
        res.status(200).send({
            title: "Biritix API",
            version: "1.0.0"
        });
    });
};