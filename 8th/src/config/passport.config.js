import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use( 
    "register",
     new LocalStrategy
     ({passReqToCallback: true, usernameField: "email"},



    async (req, username, password, done) => {
        try {
            const{first_name, last_name, email,  age}= req.body;
            const user = await userDao.getByEmail(username);
            if(user) return done(null, false, {message: "El usuario ya existe"});

            const newUser = {
            first_name,
            last_name,
            email,
            age,
            password : createHash ( password)
        }
            const createUser = await userDao.create(newUser);
            return done(null, createUser);


        } catch (error) {
            return done(error)
        }


    }
    ) );

    passport.use(
    "login",
    new LocalStrategy({usernameField:"email"}, 
        async(username, password, done) => {
        try{
            const user = await userDao.getByEmail(username);
            if(!user || !isValidPassword(user, password)) return done(null,false, {msg: "email o password invalidos"});            
        
        return done(null, user);

            } catch (error) {
            done(error);
        }

    })

    )

    passport.serializeUser((user, done) => {

        done(null, user._id)

    });

    passport.deserializeUser(async (id,done) =>{
        const user = await userDao(id);
        done(null, user);

    });
};
export default initializePassport;
