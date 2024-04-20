import express, { response } from "express";
import {
  getProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} from "./data/fs/products.fs.js";
//creo aplicacion/servidor
const app = express();

//Configuracion para iniciar
const port = 8080;

const ready = console.log("server ready on port: " + port);

//para iniciar el servidor
app.listen(port, ready);

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params

//solicitudes / peticiones
app.get("/", index);
app.get("/products", read);
app.get("/products/:nid", readOne);

//configurar las callbacks

function index(req, res) {
  try {
    const message = "Welcome to Product-Mananger";
    return res.json({ status: 200, response: message });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}

async function read(req, res) {
  try {
    let limit = req.query.limit;
    let all = await getProducts();

    if (limit && !isNaN(limit)) {
      all = all.slice(0, parseInt(limit));
    }

    return res.json({ status: 200, response: all });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function readOne(req, res) {
  try {
    const { nid } = req.params;
    const one = await getProductByID(nid);
    if (one) {
      return res.json({ status: 200, response: one });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}
