import { Router } from "express";
import productRouters from "./products.routes.js";
import cartsRoutes from "./cart.routes.js";
import sessionRouters from "./session.routes.js";
import {isLogin} from "../middlewares/isLogin.middlewares.js";

const router = Router();

router.use("/products", productRouters);
router.use("/carts", cartsRoutes);
router.use("/session",  sessionRouters);

export default router;
