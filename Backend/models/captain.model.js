import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String ,
            required:true,
            minLength:[3 , "First name must be at least 3 characters"]
        },
        lastName:{
            type:String , 
            minLength:[3 , "First name must be at least 3 characters"]
        }
    },
    email:{
        type:String , 
        required:true , 
        unique:true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , "Please fill a valid email address"]

    },
    password:{
        type:String , 
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    isActive:{
        type:String,
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String , 
            required:true,
            minLength:[3 , "Color must be at least 3 characters"]
        },
        plate:{
            type:String , 
            required:true,
            unique:true,
            minLength:[3 , "Plate must be at least 3 characters"]
        },
        capacity:{
            type:Number , 
            required:true,
            min:1,
            max:10
        } , 
        vehicleType:{
            type:String , 
            required:true,
            enum:["bike" , "car" , "auto"]
        },
        location:{
            latitude:{
                type:Number,
            } ,
            longitude:{
                type:Number,
            }
        }
    }   
} ,{timestamps:true});

captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET , {expiresIn:"24h"}); // Token expires in 24 hours
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}
captainSchema.statics.updateLocationById = async function (id, lat, lng) {
  return await this.updateOne(
    { _id: id },
    { $set: { "location.latitude": lat, "location.longitude": lng } }
  );
};

captainSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password , salt)
}


const Captain = mongoose.model("Captain" , captainSchema);
export default Captain;
