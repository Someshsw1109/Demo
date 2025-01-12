import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    name: { 
        type: String 
    },
    description:{
        type:String
    },
    price: { 
        type: Number 
    },
    category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
    Admin:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ratingAndReview",
		},
	],
    thumbnail: {
		type: String,
	},
    status: {
		type: String,
		enum: ["Draft", "Published"],
	}, 
    
},
{timestamps:true});

const Item = mongoose.model('Item', itemSchema);
export default Item;