'use strict'

module.exports = app => {
    app.get('/', (req, res, next) => {
        app.src.controllers.index.get(app, req, res, next);
    });
};