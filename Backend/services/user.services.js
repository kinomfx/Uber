import  User  from "../models/user.model.js";


export const createUser = async ({firstName , lastName , email , password})=>{
    console.log(firstName , lastName , email , password)
    if(!firstName || !lastName || !email || !password){
        throw new Error("something is wrong")
    }
    const user = await User.create({
        fullName:{
            firstName , 
            lastName
        },
        email,
        password
    })

    return user
}