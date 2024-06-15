import { Router } from "express";
import productRouters from "./products.routes.js";
import cartsRoutes from "./cart.routes.js";
import sessionRouters from "./session.routes.js";
import {isLogin} from "../middlewares/isLogin.middlewares.js";

const router = Router();

router.use("/products", isLogin , productRouters);
router.use("/carts", isLogin , cartsRoutes);
router.use("/session",  sessionRouters);

export default router;
