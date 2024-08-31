import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import {
  authorization,
  passportCall,
} from "../middlewares/passport.middleware.js";
import { sendMail } from "../utils/sendMails.js";
import { generateUsersMocks } from "../mocks/user.mocks.js";


const router = Router();

//solicitudes / peticiones
router.post("/register", passportCall("register"), sessionController.register);
router.post("/login", passportCall("login"), sessionController.login);
router.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  sessionController.current
);
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  sessionController.loginGoogle
);
router.get("/logout", sessionController.logout);

router.get("/email", async(req, res) =>{
  
  const {name} = req.body;

  const template=  `
  <div>
  
      <h1>Hola ${name}!,Bienvenido a la app!</h1>
  
  </div>
  
  
  `

  await sendMail("", "Test Nodemailer",  "Mail de prueba", template);

  return res.status(200).json({status: "ok", msg: "Email enviado"})
});

router.get("/usersmocks"), async (req,res)=>{

  const users = generateUsersMocks(5);
  console.log(users)
  return res.status(200).json({status: "ok", msg: users})
}



export default router;
