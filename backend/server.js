import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import auth from './routes/auth.js';

dotenv.config();

//database config
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {

    res.setEncoding({
        message:'Welcome to Halal Express'
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});