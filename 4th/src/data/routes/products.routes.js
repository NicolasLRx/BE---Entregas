import { Router, json } from "express";
import productsManager from "../../managers/productsManager.js";

const router = Router();

//solicitudes / peticiones

router.get("/", read);
router.post("/", add);
router.get("/:pid", readOne);
router.put("/:pid", update);
router.delete(":pid", del);

//configurar las callbacks

async function read(req, res) {
  try {
    const { limit } = req.query;
    let product = await productsManager.getProducts(limit);

    res.status(200).json(product);
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
    const { pid } = req.params;
    const product = await productsManager.getProductByID(+pid);
    if (product) {
      return res.json({ status: 200, response: product });
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

async function add(req, res) {
  try {
    const product = req.body;
    const newProduct = await productsManager.addProduct(product);
    res.status(201), json(newProduct);
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function update(req, res) {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updateProduct = await productsManager.updateProduct(pid, product);
    res.status(201), json(updateProduct);
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function del(req, res) {
  try {
    const { pid } = req.params;

    await productsManager.deleteProduct(pid);

    res.status(201), json({ message: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

export default router;
