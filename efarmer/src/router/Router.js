import { createBrowserRouter } from "react-router-dom"; // Use ES6 import syntax
import Signup from "../auth/Signup";
import { Home } from "../home_page/Home";
import UploadComponent from "../prediction/UploadComponent"

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
        path: "/predict",
        element: <UploadComponent/>
    }
]);

export default router;
