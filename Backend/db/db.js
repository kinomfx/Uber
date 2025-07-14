import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
}

export default ConnectDB;