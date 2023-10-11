import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  Address: {
    type: String,
    required: true,
  },
  Manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Allocated_budget: {
    type: Number,
    required: true,
  },
  Contact_number: {
    type: String,
  },
  Remaining_Budget: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Site = mongoose.model("Site", siteSchema);

export default Site;
