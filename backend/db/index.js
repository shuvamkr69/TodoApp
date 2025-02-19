import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'})

const DB_NAME = 'third_base'
const connectDB= async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !!! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR : ", error);
        process.exit(1);
        
    }
}

export default connectDB;