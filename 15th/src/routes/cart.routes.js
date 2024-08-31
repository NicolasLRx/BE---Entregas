import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middlewares.js";
const router = Router();

router.post("/",passportCall("jwt"), authorization("user"), cartsController.createCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"),checkProductAndCart, cartsController.addProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"),checkProductAndCart, cartsController.updateQuantityProductInCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart,cartsController.deleteProductInCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.getCartById);

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.deleteAllProductsInCart);

router.get("/:cid/purchase,");

export default router;