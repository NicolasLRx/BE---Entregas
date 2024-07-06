import mongoose from "mongoose";

const urlDB = "mongodb+srv://admin:admin123456@e-commerce.bhmfzw2.mongodb.net/ecommerce"

export const connectMongoDB = async () => {

try {

    //conexion con la base de datos

    mongoose.connect(urlDB);
    
} catch (error){
    console.log(error);

}

};