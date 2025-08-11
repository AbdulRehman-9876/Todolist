import axios from "axios";

const BASE_URL = "http://localhost:3003/todos/";

const getAllItems = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(BASE_URL + "get_items",{
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
     
    return response.data;
  } catch (err) {
    console.log("Error in fetching data from database (frontend) " + err);
    return [];
  }
};

const getSIngleItem = async (id) => {
    try{
    const response = await axios.get(BASE_URL + `get_item/${id}`);
    return response.data;
    } catch(err){
        console.log(err);
    }
   
}

const createItem = async (description) => {
 try {
    const response = await axios.post(BASE_URL + "add_items", {description});
    return response.data;
 } catch(err){
    console.log(err);
 }
}

const deleteItem = async(id, isCompleted) => {
    try{
        console.log("ID insie delete item func: ", typeof(id), id);
        const response = await axios.delete(BASE_URL+`delete_item/${id}/${isCompleted}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

const updateDescription = async(id, description) => {
    try {
        const response = await axios.put(BASE_URL+`update_itemDescription/${id}`, {description});
        return response.data;
    } catch(err){
        console.log(err)
    }
}

const updateIsCompleted = async(id) => {
    try{
        const response = await axios.put(BASE_URL+`update_itemIsCompleted/${id}`);
        return response.data;
    } catch(err){
        console.log(err);
    }
}
 

export {
getAllItems,
getSIngleItem,
createItem,
deleteItem,
updateDescription,
updateIsCompleted
}
