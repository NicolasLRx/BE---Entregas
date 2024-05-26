import express, { response } from "express";
import router from "./routes/index.js";
import {connectMongoDB} from "./config/mongoDB.config.js";

connectMongoDB();


//creo aplicacion/servidor
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params

app.use("/api", router);

//Configuracion para iniciar
const port = 8080;

const ready = console.log("server ready on port: " + port);

//para iniciar el servidor
app.listen(port, ready);
