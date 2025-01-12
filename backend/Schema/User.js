import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"admin"
    },
    phoneNumber:{
        type:String,
    },
    items:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Item",
        }
    ],

})
const User=mongoose.model('User',userSchema);
export default User;