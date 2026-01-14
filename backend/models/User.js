import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true
    }, 
    email:{
        type:String, 
        required:true, 
        unique:true
    }, 
    password:{
        type:String
    }, 
    provider:{
        type:String, 
        enum:["local","google","github"], 
        default:"local", 
    },

},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User