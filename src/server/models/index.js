const mongoose = require('mongoose');

module.exports = () => {
    // connect to database.
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log('connected to database'))
        .catch(() => {
            console.log('connected to database');
            process.emit(1);
        });
}