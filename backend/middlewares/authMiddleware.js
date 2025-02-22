import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected route token base
export const requireSignin = async (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin 
export const isAdmin = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if (user.role !== "SuperAdmin") {
            return res.status(401).send({
                success:false,
                message: "UnAuthorized Access"
            });
        } else {
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in Middleware",
        });
    }
};