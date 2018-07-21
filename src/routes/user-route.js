'use strict'

module.exports = app => {
    app.post('/api/auth', (req, res, next) => {
        app.src.controllers.user.authenticate(res,req.body);
    });
}

