import { Router } from "express";
import productRouters from "./products.routes.js";
import cartsRoutes from "./cart.routes.js";

const router = Router();

router.use("/products", productRouters);
router.use("/carts", cartsRoutes);

export default router;
