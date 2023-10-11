import mongoose from "mongoose";

const diliverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    diliveryDate: {
        type: Date,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    diliveryAddress: {
        type: String,
        required: true,
    },
    deliveryNote: {
        type: String,
    },
});

const diliveryModel = mongoose.model("Dilivery", diliverySchema);
export default diliveryModel;