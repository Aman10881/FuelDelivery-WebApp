import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  // Load variables from .env


export const dbconnect=async()=>{
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
        .then(() => console.log("Mongodb started")) 
        .catch((err) => console.log(err))

}

