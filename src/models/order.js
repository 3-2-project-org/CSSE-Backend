import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    sellerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Delivered", "Cancelled"],
    },
    deliveryAddress: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    requiredDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
