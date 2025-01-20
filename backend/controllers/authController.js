//import Users from "../models/Users.js"; // Import Users model
import { hashPassword } from "../helpers/authHelper.js"; // Import hashPassword helper
import userModel from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
  
    const { firstName, lastName, email, password, phone, address } = req.body;

    if (!firstName) return res.send({ error: "First name is required" });
    if (!lastName) return res.send({ error: "Last name is required" });
    if (!email) return res.send({ error: "Email is required" });
    if (!password) return res.send({ error: "Password is required" });
    if (!phone) return res.send({ error: "Phone number is required" });
    if (!address) return res.send({ error: "Address is required" });

    const existingUser = await userModel.findOne({ email });
    console.log("Existing user:", existingUser); // Debug existing user check
    //existing user
    if (existingUser) {
      return res.status(409).send({
        success: true,
        message: "Account is already registered",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword); // Debug hashed password

    const user = await new userModel({
      firstName,
      lastName,
      email,
      phone,
      address,
      password: hashedPassword}).save();

    

    res.status(201).send({
      success: true,
      message: "User registration successful",
      user,
    });
  } catch (error) {
    console.log(error); // Log the full error
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};
