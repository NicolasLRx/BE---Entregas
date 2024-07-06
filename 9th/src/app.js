import express, { response } from "express";
import router from "./routes/index.js";
import {connectMongoDB} from "./config/mongoDB.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";


connectMongoDB();


//creo aplicacion/servidor
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:admin123456@e-commerce.bhmfzw2.mongodb.net/ecommerce",
        ttl: 15
    }),
    secret: "CodigoSecreto",
    resave: true,
    saveUninitialized: true,
}));

app.use (passport.initialize());
app.use (passport.session());
initializePassport();

app.use("/api", router);

//Configuracion para iniciar
const port = 8080;

const ready = console.log("server ready on port: " + port);

//para iniciar el servidor
app.listen(port, ready);
