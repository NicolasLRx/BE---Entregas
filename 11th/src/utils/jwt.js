import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import envs from "../config/env.config.js"

//creacion de token

export const createToken = (user) =>{

    const {_id, email, role } =user;
    const token = jwt.sign({_id, email,role}, envs.JWT, {expiresIn: "1m"});

    return token;

};


//verificar el token

export const verifyToken = (token) => {

    try {
        const decode =jwt.verify(token, envs.JWT);
        return decode;
    } catch (error) {
        return null;
    }
   
};