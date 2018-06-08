// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');

// const User = mongoose.model('users');

// const deserializeUser = async (id, done) => {
//     const user = await User.findById(id);
//     return done(null, user);
// }

// // authentication callback.
// const authUserCallback = async (accessToken, refreshToken, profile, done) => {
//     let user = await User.findOne({ profileId: profile.id });
//     if (!user) user = await new User({ profileId: profile.id }).save();
//     return done(null, user);
// };

// // google configs
// const googleConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     proxy: true,
// };

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(deserializeUser);
// passport.use(new GoogleStrategy(googleConfig, authUserCallback))
const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// authentication callback.
const authUserCallback = async (payload, done) => {
    let user = await User.findById(payload.id);
    if (!user) return done(null, false);
    return done(null, user);
};

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };
    passport.use(new Strategy(opts, authUserCallback))
}
