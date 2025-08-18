import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
// import {getUserData} from "../Service/userApis"
const ProtectedRoute =  ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

// const checkIsVerified = async () => {

//   try{
//     const response = await getUserData();
//     console.log(response);
//   } catch(errr){
//     console.log(`Error fetching user details`)
//   }
// } 

export default ProtectedRoute;
