import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({

      title:{
        type: String,
        requiere : true

      } , 

      description:{
        type: String,
        requiere : true

      } ,

      thumbnail:{
        type: Array,
        default: []

      } ,

      code:{
        type: String,
        requiere : true

      } ,
      stock:{
        type: Number,
        requiere : true

      } ,
      status:{
        type: Boolean,
        default : true

      } ,

      price:{
        type:Number,
        requiere: true,

      }

});

export const productModel = mongoose.model(productCollection, productSchema);


