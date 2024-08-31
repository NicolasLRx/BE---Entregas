import express, { response } from "express";
import router from "./routes/index.js";
import {connectMongoDB} from "./config/mongoDB.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import envs from "./config/env.config.js";
import { errorHandle } from "./errors/errorHandle.js";



connectMongoDB();


//creo aplicacion/servidor
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params
app.use(cookieParser(envs.COOKIE_SECRET));
app.use(session({
    store: MongoStore.create({
        mongoUrl: envs.MONGO_URL,
        ttl: 15
    }),
    secret: envs.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.use (passport.initialize());
app.use (passport.session());
initializePassport();

app.use("/api", router);

app.use(errorHandle);

//Configuracion para iniciar
const port = envs.PORT;

const ready = console.log("server ready on port: " + port);

//para iniciar el servidor
app.listen(port, ready);
