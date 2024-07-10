import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

//creacion de token

export const createToken = (user) =>{

    const {_id, email } =user;
    const token = jwt.sign({_id, email}, "codigoSecreto", {expiresIn: "1m"});

    return token;

};


//verificar el token

export const verifyToken = (token) => {

    try {
        const decode =jwt.verify(token, "codigoSecreto");
        return decode;
    } catch (error) {
        return null;
    }
   
};