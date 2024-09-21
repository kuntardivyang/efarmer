import { createBrowserRouter } from "react-router-dom"; // Use ES6 import syntax
import Signup from "../auth/Signup";
import { Home } from "../home_page/Home";
import UploadComponent from "../prediction/UploadComponent"
import Profile from "../base/Profile";
import AboutUs from "../home_page/AboutUs";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <Home />, // Pass as an element inside the array
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/predictDisease",
        element: <UploadComponent/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
    {
        path: "/about",
        element: <AboutUs/>
    }
]);

export default router;
