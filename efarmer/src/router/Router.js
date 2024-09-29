import { createBrowserRouter } from "react-router-dom"; // Use ES6 import syntax
import Signup from "../auth/Signup";
import { Home } from "../home_page/Home";
import UploadComponent from "../prediction/UploadComponent"
import Profile from "../base/Profile";
import AboutUs from "../home_page/AboutUs";
import CropRecommendation from "../prediction/CropRecommendation";
import Admin from "../ecom/Admin";
import Store from "../store/Store";
import Solution from "../solution/Solution";
import Contact from "../home_page/Contact";
import Psolution from "../solution/Psolution";
import Rsolution from "../solution/Rsolution";

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
    },
    {
        path: "/yield",
        element: <CropRecommendation/>
    },
    {
        path: "/ecommerce",
        element: <Admin/>
    },
    {
        path: "/consumer",
        element: <Store/>
    },
    {
        path: "/psolution",
        element: <Psolution/>
    },
    {
        path: "/rsolution",
        element: <Rsolution/>
    },
    {
        path: "/contact",
        element: <Contact/>
    },

]);

export default router;