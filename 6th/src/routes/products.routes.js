import { Router, json } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

//solicitudes / peticiones

router.get("/", read);
router.post("/", add);
router.get("/:pid", readOne);
router.put("/:pid", update);
router.delete("/:pid", del);

//configurar las callbacks

async function read(req, res) {
  try {

    const { limit, page, sort, category, status}= req.query;
    const options ={
      limit: limit || 10,
      page: page || 1,
      sort:{
        price: sort ==="asc"? 1: -1,
        },
        lean:true,
    };

    if(status){
      const products = await productDao.getAll({status: status}, options);
      return res.status(200).json({ products })
    }

    if(category){
      const products = await productDao.getAll({category: category}, options);
      return res.category(200).json({ products })
    }

    const products = await productDao.getAll({},options);
  
  
  res.status(200).json({status: "success", payload: products});

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
    const product = await productDao.getById(pid);
    if (product) {
      return res.status(201).json({ status: "success", payload: product });
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
    const newProduct = await productDao.create(product);

    res.status(200).json({status:"success", payload: newProduct });
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
    const productData = req.body;

    const updateProduct = await productDao.update(pid , productData);
    if (updateProduct) {
      return res.status(201).json({ status: "success", payload: updateProduct });
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

async function del(req, res) {
  try {
    const { pid } = req.params;

    const  product = await productDao.deleteOne(pid);
if(!product){
    return res.status(404).json({status:"Error", msg: `Producto con el id ${pid} no encontrado`});
}
    res.status(200).json({status:"Producto Eliminado"});
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

export default router;
