import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    item:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }],
});
const Category=mongoose.model("Category",categorySchema);
export default Category;