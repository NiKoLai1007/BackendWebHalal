import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: 'Client',  // Set the default value to 'Client' (as a string)
      enum: ['Admin', 'Supplier', 'Vendor', 'Client']
    }
  }, { timestamps: true });
  
  export default mongoose.model('users', userSchema);
  