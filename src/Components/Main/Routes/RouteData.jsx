import AuthorizedRoute from '../../../Routers/AuthorizedRoute.jsx';
import PublicRoute from '../../../Routers/PublicRoute.jsx';
import Signup from '../../../Features/Signup/Signup.jsx';
import Login from '../../../Features/Login/Login.jsx';
import ForgotPassword from '../../../Features/ForgotPassword/ForgotPassword.jsx';
import Landing from '../../../Features/Landing/Landing.jsx';
import Dashboard from '../../../Features/Dashboard/Dashboard.jsx';
import Admin from '../../../Features/Admin/Admin.jsx';
import AdminDashboard from '../../../Features/Admin/Features/Dashboard/Dashboard.jsx';
import AddDoctor from '../../../Features/Admin/Features/Doctor/AddDoctor.jsx';
import UpdateDoctor from '../../../Features/Admin/Features/Doctor/UpdateDoctor.jsx';
import ViewDoctor from '../../../Features/Admin/Features/Doctor/ViewDoctor.jsx';
import Error404 from '../../../Features/Error 404/Error404.jsx';

export const routeData = [
    {
        path: "/signup",
        route: PublicRoute,
        element: Signup,
    },
    {
        path: "/login",
        route: PublicRoute,
        element: Login,
    },
    {
        path: "/forgotPassword",
        route: PublicRoute,
        element: ForgotPassword,
    },
    {
        path: "/",
        route: PublicRoute,
        element: Landing,
    },
    {
        path: "/dashboard",
        route: AuthorizedRoute,
        element: Dashboard,
    },
    {
        path: "admin",
        route: AuthorizedRoute,
        element: Admin,
        children: [
            {
                path: "",
                element: AdminDashboard,
            },
            {
                path: "add-doctor",
                element: AddDoctor
            },
            {
                path: "update-doctor",
                element: UpdateDoctor
            },
            {
                path: "view-doctor",
                element: ViewDoctor
            },
        ]
    },
    {
        path: "/*",
        route: PublicRoute,
        element: Error404,
    },
]