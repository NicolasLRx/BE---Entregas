import { Router } from "express";
import productController from "../controllers/products.controller.js";
import {
  authorization,
  passportCall,
} from "../middlewares/passport.middleware.js";
import { productDataValidartor } from "../validators/productData.validator.js";
const router = Router();

//solicitudes / peticiones

router.get("/", productController.getAll);
router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  productDataValidartor,
  productController.create
);
router.get("/:pid", productController.getByID);
router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  productController.update
);
router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  productController.del
);

export default router;
