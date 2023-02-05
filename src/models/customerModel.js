const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    DOB : { type: Date, required: true },
    emailID: { type: String },
    address: { type: String },
    customerID: { type: String},
    status : { type: String, enum: ["ACTIVE", "INACTIVE"] },
  },
  { timestamps: true }  
);
module.exports = mongoose.model("Customer", customerSchema);