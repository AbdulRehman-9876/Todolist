import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const getAllItems = async () => {
  try {
    const response = await axios.get(BASE_URL + "get_items");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getSIngleItem = async (id) => {
    try{
    const response = await axios.get(BASE_URL + `/get_item/${id}`);
    return response.data;
    } catch(err){
        console.log(err);
    }
   
}

const createItem = async () => {
 try {
    const response = await axious.post(BASE_URL + "add_items");
    return response.data;
 } catch(err){
    console.log(err);
 }
}

const deleteAllItems = async() => {
    try{
        const response = await axious.delete(BASE_URL+"delete_item");
        return response.data;
    }catch(err){
        console.log(err);
    }
}

const updateDescription = async(id) => {
    try {
        const respose = await axious.put(BASE_URL+`update_itemDescription/${id}`);
        return response.data;
    } catch(err){
        console.log(err)
    }
}

const updateIsCompleted = async(id) => {
    try{
        const reponse = await axious.put(BASE_URL+`update_itemIsCompleted/${id}`);
        return response.data;
    } catch(err){
        console.log(err);
    }
}
 

const TodoListApis = {
getAllItems,
getSIngleItem,
createItem,
deleteAllItems,
updateDescription,
updateIsCompleted
}

export default TodoListApis;
