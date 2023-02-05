const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema(
  {
        cardNumber: { type: String, unique: true},
        cardType: { type: String, enum: ["REGULAR", "SPECIAL"], required : true },
        customerName: { type: String, required : true },
        status: { type: String, enum: ["ACTIVE", "INACTIVE"], default : "ACTIVE" },
        vision : { type: String },
        customerID : { required : true, type: ObjectId, ref: "Customer" },
    },
  { timestamps: true }
);
module.exports = mongoose.model("Card", cardSchema);