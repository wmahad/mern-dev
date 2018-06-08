const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
});

userSchema.methods.generateAuthToken = function() {
    const payload = {
        id: this.id
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
}

mongoose.model('users', userSchema);