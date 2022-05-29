import React from "react";
  
import { Route ,Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login, { userId } from "../Pages/Login";
import Register from "../Pages/Register";
import View from "../Pages/View";
import {userContext} from "../Pages/UserContext"
 

function App() {

const [value ,setValue]=React.useState(null);



 
 
  return (
<userContext.Provider value={{value ,setValue}} >
   <Routes> 
 
   <Route path="/Home"  element={<Home/>}                         />
   <Route   path="/"        element={<Login/>}                /> 
   <Route   path="/Register"  element={<Register/>}   />
   <Route   path="/View"  element={<View/>}   />
    

  </Routes>
</userContext.Provider>

  );
}

export default App;
