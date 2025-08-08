const express = require("express");
const router = express.Router();
const {
  addItem,
  updateListDescription,
  updateIsComplete,
  getAllItems,
  getSingleItem,
  deleteItem,
} = require("../Controller/TodoListController");

router.post("/add_items", addItem); //add items
router.put("/update_itemDescription/:id", updateListDescription); //update list description
router.put("/update_itemIsCompleted/:id", updateIsComplete); //update list isComplete
router.get("/get_items", getAllItems); //get all items
router.get("/get_item/:id", getSingleItem); //get single item
router.delete("/delete_item/:id/:isCompleted", deleteItem); //delete single item

module.exports = router;
