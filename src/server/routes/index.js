const express = require('express');
const passport = require('passport');
const { errorHandler } = require('../shared/middlewares');

module.exports = (app, router) => {
    // set middlewares here
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use('/api', router);

    // require the passport file.
    require('../services/passport')(passport);
    require('./auth')(router);
    require('./profiles')(router);
    require('./posts')(router);

    app.use(errorHandler);
}