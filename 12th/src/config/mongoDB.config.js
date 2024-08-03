import mongoose from "mongoose";
import envs from "./env.config.js"


const urlDB = envs.MONGO_URL;

export const connectMongoDB = async () => {

try {

    //conexion con la base de datos

    mongoose.connect(urlDB);
    
} catch (error){
    console.log(error);

}

};