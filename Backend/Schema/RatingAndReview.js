import mongoose from "mongoose";

const ratingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"People",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Item",
        index:true,
    }
});
const ratingAndReview=mongoose.model("ratingAndReview",ratingSchema);
export default ratingAndReview;