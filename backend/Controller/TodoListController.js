const TodoItem = require("../Schema/todolist")

//add items
const addItem = async (req, res) => {
  try {
    const { description } = req.body;
    const todoItem = new TodoItem({
      description: description,
      isCompleted: false,
    });
    await todoItem.save();
    res.status(200).json(todoItem);
  } catch (err) {
    res.status(400).json({ message: "error in adding item" });
  }
};

//update list description
const updateListDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const todoItemsFromDB = await TodoItem.findByIdAndUpdate(req.params.id, {
      new: true,
    });
    if (!todoItemsFromDB) {
      res.status(404).json({ message: "item not found" });
    } else {
      todoItemsFromDB.description = description;
      todoItemsFromDB.save();
      res.status(200).json({ message: "updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "error in updating data" });
  }
};

//update list isComplete
const updateIsComplete = async (req, res) => {
  try {
    const todoItemsFromDB = await TodoItem.findByIdAndUpdate(req.params.id, {
      new: true,
    });
    if (!todoItemsFromDB) {
      res.status(404).json({ message: "item not found" });
    } else {
      todoItemsFromDB.isCompleted = !todoItemsFromDB.isCompleted;
      todoItemsFromDB.save();
      res.status(200).json({ message: "updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "error in updating data" });
  }
};

//get all items
const getAllItems = async (req, res) => {
  try {
    const todoItemsFromDB = await TodoItem.find();
    if (!todoItemsFromDB) {
      return res.status(404).json({ message: "item not found" });
    } else {
      res.status(200).json(todoItemsFromDB);
    }
  } catch (err) {
    res.status(400).json({ message: "error in getting items" });
  }
};

//get single item
const getSingleItem = async (req, res) => {
  try {
    const todoItemsFromDB = await TodoItem.findById(req.params.id);
    if (!todoItemsFromDB) {
      res.status(404).json({ message: "item not found" });
    } else {
      res.status(200).json(todoItemsFromDB);
    }
  } catch (err) {
    res.status(400).json({ message: "error in getting single item" });
  }
};

//delete single item
const deleteItem = async (req, res) => {
  try {
    const { id, isCompleted } = req.params;

    const todoItemsFromDB = await TodoItem.findOneAndDelete({
      _id: id,
      isCompleted: isCompleted === "true", // convert to boolean
    });

    if (!todoItemsFromDB) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error in deleting item" });
  }
};

module.exports = {
  addItem,
  updateListDescription,
  updateIsComplete,
  getAllItems,
  getSingleItem,
  deleteItem
}