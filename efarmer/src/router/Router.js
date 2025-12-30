import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { Home } from "../home_page/Home";
import UploadComponent from "../prediction/UploadComponent";
import Profile from "../base/Profile";
import AboutUs from "../home_page/AboutUs";
import CropRecommendation from "../prediction/CropRecommendation";
import Admin from "../ecom/Admin";
import Store from "../store/Store";
import Contact from "../home_page/Contact";
import Psolution from "../solution/Psolution";
import Rsolution from "../solution/Rsolution";
import { ProtectedRoute, FarmerRoute, PublicOnlyRoute } from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: (
            <PublicOnlyRoute>
                <Login />
            </PublicOnlyRoute>
        )
    },
    {
        path: "/signup",
        element: (
            <PublicOnlyRoute>
                <Signup />
            </PublicOnlyRoute>
        )
    },
    {
        path: "/predictDisease",
        element: (
            <ProtectedRoute>
                <UploadComponent />
            </ProtectedRoute>
        )
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
    },
    {
        path: "/about",
        element: <AboutUs />
    },
    {
        path: "/yield",
        element: (
            <ProtectedRoute>
                <CropRecommendation />
            </ProtectedRoute>
        )
    },
    {
        path: "/ecommerce",
        element: (
            <FarmerRoute>
                <Admin />
            </FarmerRoute>
        )
    },
    {
        path: "/consumer",
        element: <Store />
    },
    {
        path: "/psolution",
        element: <Psolution />
    },
    {
        path: "/rsolution",
        element: <Rsolution />
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "*",
        element: <NotFound />
    },
]);

export default router;
