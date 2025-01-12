import Item from "../Schema/Item.js";
import User from "../Schema/User.js";
import dotenv from "dotenv"
dotenv.config()
import uploadImageToCloudinary from "../utils/ImageUploader.js";
import Category from "../Schema/Category.js"

const createItem = async (req, res) => {
	
    try {
        const userId = req.user.id;
		console.log("userID:",userId);

        // Destructure request body
        let {
            name,
            description,
            price,
            category,
            status
        } = req.body;
        console.log("name",name);
		console.log("descriptiom",description);
		console.log("price",price);
		console.log("category",category);

		// fetch file from request
		const thumbnail = req.files.thumbnailImage;
		console.log("file aaagyi",thumbnail);

        // Validation
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !thumbnail
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }



        // Check for instructor status
        if (!status || status === undefined) {
            status = "Draft";
        }

        // Check if the user is an instructor
        const adminDetails = await User.findOne({
            _id: userId,
            role: "admin",
        });

        if (!adminDetails) {
            return res.status(404).json({
                success: false,
                message: "admin details not found",
            });
		}

        // Check if category is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }


        // Upload the image to cloudinary
        const response = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
		console.log(response);

        // Create an entry for the new course
        const newItem = await Item.create({
            name,
            description,
            price,
            category: categoryDetails._id,
            Admin: adminDetails._id,
            thumbnail: thumbnail.secure_url,
            status: status,
        });

        // Add the new course to the instructor's user schema
        await User.findByIdAndUpdate(
            { _id: adminDetails._id },
            { $push: { item: newItem._id } },
            { new: true }
        );

        // Update the category schema
        await Category.findByIdAndUpdate(
            { _id: category },
            { $push: { item: newItem._id } }, // Ensure it's courses if the field name is correct
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Item created successfully",
            data: newItem,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};
export { createItem };






const getAllItems=async(req,res)=>{
    try {
		const allItems = await Item.find(
			{},
			{
				itemName: true,
				price: true,
			}
		)
			// .populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allItems,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Item Data`,
			error: error.message,
		});
	}
}
export {getAllItems};








const getItemDetails=async(req,res)=>{
    try {
        
        const {itemId}=req.query;
        
        const itemsDetails=await Item.find({_id: itemId})
            .populate("category")
            .exec();
        
            if(!itemsDetails){
                return res.status(404).json({
                    success:false,
                    message:"item Not Found"
                })
            }
            return res.status(200).json({
                success:true,
                message:"item fetched successfully now",
                data:itemsDetails
            });
                
            }  catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Can't Fetch item Data`,
            error:error.message
        })   
    }
}
export {getItemDetails};








const editItem = async (req, res) => {
    try {
      const { itemId, ...updateFields } = req.body; // Extract itemId and other fields
      console.log("Item ID:", itemId);
  
      // Validate itemId
      if (!itemId) {
        return res.status(400).json({ success: false, message: "Item ID is required" });
      }
  
      // Fetch the item
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
  
      // If Thumbnail Image is provided, update it
      if (req.files && req.files.thumbnailImage) {
        console.log("Updating thumbnail...");
        const thumbnail = req.files.thumbnailImage;
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        );
        item.thumbnail = thumbnailImage.secure_url;
      }
  
      // Update other fields dynamically
      Object.assign(item, updateFields);
  
      // Save updated item
      await item.save();
  
      // Populate fields if needed
      const updatedItem = await Item.findById(itemId)
        .populate("category")
        .exec();
  
      res.json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  
  export { editItem };







const deleteItem = async (req, res) => {
	try {
	  const { itemId } = req.body
	  // Find the course
	  const item = await Item.findById(itemId)
	  if (!item) {
		return res.status(404).json({ message: "item not found" })
	  }
  
	  // Delete the course
	  await Item.findByIdAndDelete(itemId)

	  //Delete course id from Category
	  await Category.findByIdAndUpdate(item.category._id, {
		$pull: { item: itemId },
	     })
	
	//Delete course id from Instructor
	// await User.findByIdAndUpdate(item.instructor._id, {
	// 	$pull: { courses: courseId },
	// 	 })
  
	  return res.status(200).json({
		success: true,
		message: "item deleted successfully",
	  })
	} catch (error) {
	  console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
	}
  }
export {deleteItem}




// 6.searchItem
// const searchItem = async (req, res) => {
// 	try {
// 	const  { searchQuery }  = req.body
// 	//   console.log("searchQuery : ", searchQuery)
// 	const items = await Item.find({
// 		$or: [
// 		  { itemName: { $regex: searchQuery, $options: "i" } },
// 		  { description: { $regex: searchQuery, $options: "i" }}
// 		],
//   })
//   .populate("category")
//   .exec();

//   return res.status(200).json({
// 	success: true,
// 	data: items,
// 	  })
// 	} catch (error) {
// 	  return res.status(500).json({
// 		success: false,
// 		message: error.message,
// 	  })
// 	}		
// }	
// export {searchItem}







const getAdminItems = async (req, res) => {
    try {
      // Validate user ID
      if (!req.user || !req.user.id) {
        return res.status(400).json({
          success: false,
          message: "User ID not found in request",
        });
      }
  
      const userId = req.user.id;
  
      // Fetch items created by the admin
      const adminItems = await Item.find({ Admin: userId });
  
      if (!adminItems.length) {
        return res.status(404).json({
          success: false,
          message: "No items found for this admin",
        });
      }
  
      // Return items successfully
      res.status(200).json({
        success: true,
        data: adminItems,
      });
    } catch (error) {
      // Error handling
      console.error("Error fetching admin items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch items",
        error: error.message,
      });
    }
  };
  export {getAdminItems}









