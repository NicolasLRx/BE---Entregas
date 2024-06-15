import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import {createHash ,isValidPassword} from "../utils/hashPassword.js";
import passport from "passport";

const router = Router();

//solicitudes / peticiones
router.post("/register",passport.authenticate("register"), register);
router.post("/login",passport.authenticate("login"),login);
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