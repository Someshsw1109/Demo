import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    }
    catch(error){
        console.error("DB connection issue");
        console.error(err);
        process.exit(1);
    }
};
export default dbConnect;
