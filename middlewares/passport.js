
const extractJwt = require('passport-jwt').ExtractJwt;
const strategy = require('passport-jwt').Strategy;

module.exports = function (passport) {
    opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.secret_key;
    passport.use(new strategy(opts, async function (jwt_payload, done) {
        if (jwt_payload) {
            return done(null, jwt_payload);
        }
        else {
            return done(null, false);
        }
    }))
}