const JwtStrategy = require('passport-jwt').Strategy
const ExctractJwt = require('passport-jwt').ExtractJwt
const config = require('config')
const moongose = require('mongoose')
const User = moongose.model('User')

const options = {
    jwtFromRequest: ExctractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwtSecretKey')
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.id).select('email id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}