import { Router } from "express";
import cartManager from "../../managers/cartManager.js";

const router = Router();

router.post("/", add);
router.get("/:cid", readOne);
async function add(req, res) {
  try {
    const cart = await cartManager.createCart();

    res.status(201) - json(cart);
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
    const cart = await cartManager.createCart();

    res.status(200) - json(cart);
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

export default router;
