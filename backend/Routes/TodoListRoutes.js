const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middelware/authMiddleware"); //middleware to protect routes
const {
  addItem,
  updateListDescription,
  updateIsComplete,
  getAllItems,
  getSingleItem,
  deleteItem,
} = require("../Controller/TodoListController");

router.post("/add_items",authMiddleware, addItem); //add items
router.put("/update_itemDescription/:id",authMiddleware, updateListDescription); //update list description
router.put("/update_itemIsCompleted/:id",authMiddleware, updateIsComplete); //update list isComplete
router.get("/get_items",authMiddleware, getAllItems); //get all items
router.get("/get_item/:id",authMiddleware, getSingleItem); //get single item
router.delete("/delete_item/:id/:isCompleted",authMiddleware, deleteItem); //delete single item

module.exports = router;
