import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";
import sessionController from "../controllers/session.controller.js";

const router = Router();

//solicitudes / peticiones
router.post("/register",passportCall("register"), sessionController.register);
router.post("/login",passport.authenticate("login"),sessionController.login);
router.post("/login/jwt",userLoginValidator, sessionController.jwt);
router.get("/current", passportCall("jwt"), authorization("user"), sessionController.current);
router.get("/login/google",passport.authenticate("google",{
    scope:  ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false 
}),sessionController.login);
router.get("/logout",sessionController.logout);





export default router;