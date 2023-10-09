import mongoose from "mongoose";

const paidSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  delivered:{
    type: Boolean,  
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  paidBy: {
    type: String,
    required: true,
    trim: true,
  },
  paidTo: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
  paidFor: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

let Dataset = mongoose.models.paid || mongoose.model("paid", paidSchema);
export default Dataset;
