import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String ,
            required:true,
            minLength:[3 , "First name must be at least 3 characters"]

        },
        lastName:{
            type:String , 
        },
    },
    email:{
            type:String , 
            required:true , 
            unique:true,
        },
        password:{
            type:String , 
            required:true,
            select:false,
        },
        socketId:{
            type:String,
        }
} , {timestamps:true})



userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET , {expiresIn:"24h"}); // Token expires in 24 hours
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    const gen = await bcrypt.genSalt(10)
    return await bcrypt.hash(password , gen)
}

const User = mongoose.model("User",  userSchema);
export default User;