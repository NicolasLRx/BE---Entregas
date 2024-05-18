import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.cartSchema({

    product: {
        type: Array,
        default:[],
    }

});

export const cartModel = mongoose.model(cartCollection, cartSchema);


