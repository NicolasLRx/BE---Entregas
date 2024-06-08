import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";


const router = Router();

//solicitudes / peticiones
router.post("/register", register);
router.post("/login",login);
router.get("/logout",logout);



//configurar las callbacks

async function register(req, res){


    try {
        const userData = req.body;
        const newUser = await userDao.create(userData);

        if(!newUser) return res.status(400).json({ status: "Error", msg: "No se pudo crear el usuario" });

        res.status(201).json({status: "success", payload: newUser});


    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
}


async function login(req, res){


    try {
      
        const { email, password } = req.body;

        //verificar rol admin

        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
            req.session.user = {
                email,
                role: "admin"
            }
            return  res.status(200).json({status: "success", payload: req.session.user});

        }

        // Users !admin

        const user = await userDao.getByEmail(email);


        if(!user || user.password !== password){
            return res.status(404).json({ status: "Error", msg: "Email o Password no validos" });
        }

        req.session.user = {
            email,
            role: "user"
        }
    
        res.status(200).json({status: "success", payload: req.session.user});



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