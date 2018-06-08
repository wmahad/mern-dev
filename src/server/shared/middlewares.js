// Example error handler
const errorHandler = (err, req, res, next) => {
    if (err.isBoom) return res.status(err.output.statusCode).json(err.output.payload);
    next();
}

module.exports = {
    errorHandler,
};
