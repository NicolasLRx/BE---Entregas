import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import {createHash ,isValidPassword} from "../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";

const router = Router();

//solicitudes / peticiones
router.post("/register",passport.authenticate("register"), register);
router.post("/login",passport.authenticate("login"),login);
router.post("/login/jwt", jwt);
router.get("/current", current);
router.get("/login/google",passport.authenticate("google",{
    scope:  ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false 
}),login);
router.get("/logout",logout);


//configurar las callbacks

async function register(req, res){

    try {    

        res.status(201).json({status: "success", msg: "Usuario Creado"});


    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
}

async function login(req, res){

    try {
      
      return  res.status(200).json({status: "success", payload: req.user});
           
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
}

async function jwt(req, res){

    try {
      
    const {email, password } =  req.body;

    const user = await userDao.getByEmail(email);
    if(!user || !isValidPassword(user, password)) return res.status(401).json ({ status : "error", msg: "usuario o contraseña no valido"});
    
    const token = createToken(user);

    res.cookie("token", token, {httpOnly: true });

    return  res.status(200).json({status: "success", payload: user , token });

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
}

async function current (req, res){

    try {
        const token = req.cookies.token;
        const checkToken = verifyToken(token);
        if(!checkToken) return res.status(403).json({status: "error", msg: "invalid token"});

        return res.status(200).json({status: "success", payload: checkToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }

}

async function logout(req, res){
    try {
      
        req.session.destroy();

        res.status(200).json({status: "success", payload: "Sesion cerrada"});    

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
}




export default router;