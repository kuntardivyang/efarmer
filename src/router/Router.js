import { createBrowserRouter } from "react-router-dom"; // Use ES6 import syntax
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { Home } from "../home_page/Home";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <Home />, // Pass as an element inside the array
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    }
]);

export default router;
