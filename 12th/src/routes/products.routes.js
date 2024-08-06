import { Router, json } from "express";
import productDao from "../dao/mongoDao/product.dao.js";
import {passportCall, authorization} from "../middlewares/passport.middleware.js";
import { productDataValidartor } from "../validators/productData.validator.js";
import productController from "../controllers/products.controller.js"
const router = Router();

//solicitudes / peticiones

router.get("/", productController.getAll);
router.post("/", passportCall("jwt"),authorization("admin"),productDataValidartor, productController.create);
router.get("/:pid", productController.getByID);
router.put("/:pid", passportCall("jwt"),authorization("admin"), productController.update);
router.delete("/:pid", passportCall("jwt"),authorization("admin"), productController.del);

export default router;
