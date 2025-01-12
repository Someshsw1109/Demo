import express from "express"
const router = express.Router();


import {createItem} from "../controllers/Item.js"
import {auth,isAdmin} from "../middlewares/auth.js"
import { createCategory,showAllCategories ,addItemToCategory} from "../controllers/Category.js";
import { getAllItems,deleteItem ,getItemDetails,editItem,getAdminItems} from "../controllers/Item.js";

router.post("/createItem", auth, isAdmin, (req, res) => {
    console.log("admin item successfully authorized");
    createItem(req, res);
  });


router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/addItemToCategory",addItemToCategory)




router.get("/getAllItems", getAllItems)
router.get("/getItemDetails", getItemDetails)
router.get("/getAdminItems",auth,isAdmin,getAdminItems)
router.delete("/deleteItem",auth, deleteItem)
router.put("/editItem",auth,isAdmin,editItem)
export default router