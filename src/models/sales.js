import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const salesModel = mongoose.model("Sales", salesSchema);
export default salesModel;
