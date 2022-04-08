import { ExtractJwt, Strategy } from 'passport-jwt';
import { getUserById } from '../utils/crud.js';
import { baseConfig } from '../config/index.js';

export const passportInit = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = baseConfig.secrets.jwt;
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      getUserById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
