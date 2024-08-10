import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middlewares.js";
const router = Router();

router.post("/",passportCall("jwt"), authorization("admin"), cartsController.createCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("admin"),checkProductAndCart, cartsController.addProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("admin"),checkProductAndCart, cartsController.updateQuantityProductInCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("admin"), checkProductAndCart,cartsController.deleteProductInCart);

router.get("/:cid", passportCall("jwt"), authorization("admin"), cartsController.getCartById);

router.delete("/:cid", passportCall("jwt"), authorization("admin"), cartsController.deleteAllProductsInCart);

export default router;