import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({

    product: {
        type: Array,
        default:[],
    }

});

export const cartModel = mongoose.model(cartCollection, cartSchema);


