const passport = require('passport');

// Example error handler
const errorHandler = (err, req, res, next) => {
    if (err.isBoom) return res.status(err.output.statusCode).json(err.output.payload);
    next();
}

const passPort = () => passport.authenticate('jwt', { session: false });

module.exports = {
    errorHandler,
    passPort: passPort(),
};
