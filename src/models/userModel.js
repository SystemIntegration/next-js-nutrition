import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique: false, // Allow duplicate usernames
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    age: {
        type: Number,
        required: [true, "Please provide an age"],
    },
    weight: {
        type: Number,
        required: [true, "Please provide a weight"],
    },
    height: {
        type: Number,
        required: [true, "Please provide a height"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Please provide a gender"],
    },
   
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

},{timestamps:true})

const User=mongoose.models.users || mongoose.model("users",userSchema)

export default User;
