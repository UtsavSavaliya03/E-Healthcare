import AuthorizedRoute from '../../../Routers/AuthorizedRoute.jsx';
import PublicRoute from '../../../Routers/PublicRoute.jsx';
import Signup from '../../../Features/Signup/Signup.jsx';
import Login from '../../../Features/Login/Login.jsx';
import ForgotPassword from '../../../Features/ForgotPassword/ForgotPassword.jsx';
import Home from '../../../Features/Home/Home.jsx';
import Dashboard from '../../../Features/Dashboard/Dashboard.jsx';
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
        element: Home,
    },
    {
        path: "/dashboard",
        route: AuthorizedRoute,
        element: Dashboard,
    },
    {
        path: "/*",
        route: PublicRoute,
        element: Error404,
    },
]