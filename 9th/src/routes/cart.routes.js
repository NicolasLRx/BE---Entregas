import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
import {passportCall, authorization } from "../middlewares/passport.middleware.js"
const router = Router();

//solicitudes / peticiones

router.post("/",  passportCall("jwt"),authorization("user"), add);
router.get("/:cid", passportCall("jwt"),authorization("user"), readOne);
router.post("/:cid/product/:pid", passportCall("jwt"),authorization("user"), addToCart);
router.delete("/:cid/product/:pid", passportCall("jwt"),authorization("user"), deleteOne);


//configurar las callbacks


async function add(req, res) {
  try {
    const cart = await cartDao.create()

    res.status(201).json({status:"success", payload: cart});
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
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);

    if(!cart) return res.status(404).json({status:"Error", msg:`no se encontro carrito con el id ${cid}`});

    res.status(200).json({status:"success", payload: cart});

  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function addToCart(req,res){

try{

  const {cid, pid} = req. params;
  const cart = await cartDao.addProductToCart(cid, pid);

  if(cart.product == false) return res.status(404).json({status:"Error", msg:`no se encontro el producto con el id ${pid}`});
  if(cart.cart == false)  return res.status(404).json({status:"Error", msg:`no se encontro el carrito con el id ${cid}`});

  res.status(200).json({status:"success", payload: cart});

}catch (error) {
  console.log(error);
  return res.json({
    status: error.status || 500,
    response: error.message || "ERROR",
  });
}

}

async function deleteOne(req,res){

  try{
  
    const {cid, pid} = req. params;
    const cart = await cartDao.deleteProductInCart(cid , pid)
    if(cart.product == false) return res.status(404).json({status:"Error", msg:`no se encontro el producto con el id ${pid}`});


  
    res.status(200).json({status:"success", payload: cart});
  
  }catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
  
  }





export default router;
