const mongoose = require('mongoose');

module.exports = () => {
    // connect to database.
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log('connected to database...'))
        .catch(() => {
            console.log('could not connect to database');
            process.exit(1);
        });

    // load the models
    require('./user');
}