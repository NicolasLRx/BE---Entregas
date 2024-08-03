import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";
import envs from "./env.config.js";
import jwt from "passport-jwt";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtracto = (req) => {

  let token = null;

  if(req && req.cookies){
    token = req.cookies.token;
  }

  return token;

};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },

      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, role } = req.body;
          const user = await userDao.getByEmail(username);
          if (user)
            return done(null, false, { message: "El usuario ya existe" });

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
          };
          const createUser = await userDao.create(newUser);
          return done(null, createUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userDao.getByEmail(username);
          if (!user || !isValidPassword(user, password))
            return done(null, false, { msg: "email o password invalidos" });

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtracto]),
        secretOrKey: envs.JWT
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          done(error);
        } 
      }
    )
  );

    passport.use(
    "google",
    new GoogleStrategy(
        {
        clientID: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/login/google",
        },
        async (accessToken, refreshToken, profile, cb ) => {
            try {
                
                const { name, emails,   } = profile;
                const user = {
                    first_name:  name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value, 
                };

                const existUser = await userDao.getByEmail(emails[0].value); 
                if(existUser) return cb(null, existUser);


                const newUser = await userDao.create(user);
                cb (null, newUser);

            } catch (error) {
              return cb(error); 
            }
        }
    )

  )

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userDao(id);
    done(null, user);
  });
};
export default initializePassport;
