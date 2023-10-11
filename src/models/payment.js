import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Card"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
    },
    paymentDate: {
      type: Date,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel;
