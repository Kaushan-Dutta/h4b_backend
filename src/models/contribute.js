const mongoose = require("mongoose");

const contributeSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      ref: "OrderModel",
    },
    percent: {
      type: Number,
      required: true,
    },
    pantryId: {
      type: String,
      ref: "PantryModel",
    },
  },
  { timestamps: true }
);
const contributeModel = new mongoose.model("ContributeModel", contributeSchema);
module.exports = { contributeModel };
