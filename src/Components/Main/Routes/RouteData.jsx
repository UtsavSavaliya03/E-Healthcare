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
import ViewDoctor from '../../../Features/Admin/Features/Doctor/ViewDoctor.jsx';
import DoctorList from '../../../Features/Admin/Features/Doctor/DoctorList.jsx';
import HospitalList from '../../../Features/Admin/Features/Hospital/HospitalList.jsx';
import ViewHospital from '../../../Features/Admin/Features/Hospital/ViewHospital.jsx';
import AddHospital from '../../../Features/Admin/Features/Hospital/AddHospital.jsx';
import DepartmentList from '../../../Features/Admin/Features/Department/DepartmentList.jsx';
import AddDepartment from '../../../Features/Admin/Features/Department/AddDepartment.jsx';
import Appointment from '../../../Features/Admin/Features/Appointment/Appointment.jsx';
import Inquiry from '../../../Features/Admin/Features/Inquiry/Inquiry.jsx';
import Backup from '../../../Features/Admin/Features/Backup/Backup.jsx';
import Error404 from '../../../Features/Error 404/Error404.jsx';

export const routeData = [
    {
        path: "/",
        route: PublicRoute,
        element: Landing,
    },
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
        path: "/dashboard",
        route: AuthorizedRoute,
        element: Dashboard,
    },
    {
        path: "/main",
        route: AuthorizedRoute,
        element: Admin,
        children: [
            {
                path: "dashboard",
                element: AdminDashboard,
            },
            {
                path: "add-doctor",
                element: AddDoctor
            },
            {
                path: "view-doctor/:id",
                element: ViewDoctor
            },
            {
                path: "doctor-list",
                element: DoctorList
            },
            {
                path: "add-hospital",
                element: AddHospital
            },
            {
                path: "hospital-list",
                element: HospitalList
            },
            {
                path: "view-hospital/:id",
                element: ViewHospital
            },
            {
                path: "add-department",
                element: AddDepartment
            },
            {
                path: "department-list",
                element: DepartmentList
            },
            {
                path: "appointment",
                element: Appointment
            },
            {
                path: "inquiries",
                element: Inquiry
            },
            {
                path: "backup",
                element: Backup
            },
        ]
    },
    {
        path: "/*",
        route: PublicRoute,
        element: Error404,
    },
]