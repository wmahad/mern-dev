module.exports = (app, router) => {
    // set middlewares here
    app.use('/api', router);
    require('./auth')(router);
    require('./profiles')(router);
    require('./posts')(router);
}