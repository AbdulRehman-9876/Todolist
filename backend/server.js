const express = require("express");
const mongoose = require("mongoose");
const TodoItem = require("./Schema/todolist");
const app = express();
const cors = require("cors");

require("dotenv").config();
app.use(cors());
app.use(express.json());
const Port = process.env.PORT;

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB using Mongoose!");
    app.listen(Port, () => {
      console.log(`Server started on port ${Port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//add items
app.post("/add_items", async(req, res) => {
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
});
//update list description
app.put("/update_itemDescription/:id", async (req, res) => {
    try{
        const {description} = req.body;
        const todoItemsFromDB = await TodoItem.findByIdAndUpdate(req.params.id,{new:true});
        if(!todoItemsFromDB){
            res.status(404).json({message:"item not found"});
        } else {
            todoItemsFromDB.description = description;
            todoItemsFromDB.save();
            res.status(200).json({message:"updated successfully"});
        }
    }catch(err){
        res.status(400).json({message:"error in updating data"})
    }
});
//update list isComplete
app.put("/update_itemIsCompleted/:id", async(req, res)=>{
    try{
        const todoItemsFromDB = await TodoItem.findByIdAndUpdate(req.params.id,{new:true});
        if(!todoItemsFromDB){
            res.status(404).json({message:"item not found"})
        } else {
            console.log(todoItemsFromDB.id)
            todoItemsFromDB.isCompleted = !todoItemsFromDB.isCompleted;
            todoItemsFromDB.save();
            res.status(200).json({message:"updated successfully"})
        }
    }catch(err){
        res.status(400).json({message:"error in updating data"})
    }
})

//get all items
app.get("/get_items", async(req, res) => {
    try{
    const todoItemsFromDB = await TodoItem.find();
    if(!todoItemsFromDB){
        return res.status(404).json({message: "item not found"})
    } else{
        res.status(200).json(todoItemsFromDB);
    }
    }catch(err){
        res.status(400).json({message:"error in getting items"})
    }
});

//get single item
app.get("/get_item/:id", async(req, res) => {
    try{
    const todoItemsFromDB = await TodoItem.findById(req.params.id);
    if(!todoItemsFromDB){
        res.status(404).json({message:"item not found"})
    } else{
        res.status(200).json(todoItemsFromDB);
    }
} catch(err){
    res.status(400).json({message:"error in getting single item"})
    }
});
//delete single item
app.delete("/delete_item/:id/:isCompleted", async (req, res) => {
  try {
    const { id, isCompleted } = req.params;

    const todoItemsFromDB = await TodoItem.findOneAndDelete({
      _id: id,
      isCompleted: isCompleted === 'true', // convert to boolean
    });

    if (!todoItemsFromDB) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error in deleting item" });
  }
});
