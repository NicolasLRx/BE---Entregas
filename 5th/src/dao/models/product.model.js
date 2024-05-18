import moongoose from "mongoose";

const productCollection = "products";

const productSchema = new moongoose.productSchema({

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


