import  User  from "../models/user.model.js";


export const createUser = async ({firstName , lastName , email , password ,socketId})=>{
    if(!firstName || !lastName || !email || !password ||!socketId){
        throw new Error("something is wrong")
    }
    
    const user = await User.create({
        fullName:{
            firstName , 
            lastName
        },
        email,
        password ,
        socketId
    })

    return user
}