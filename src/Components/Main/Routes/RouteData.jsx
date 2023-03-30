/* --------- Common Components --------- */
import AuthorizedRoute from '../../../Routers/AuthorizedRoute.jsx';
import PublicRoute from '../../../Routers/PublicRoute.jsx';
import Signup from '../../../Features/Signup/Signup.jsx';
import Login from '../../../Features/Login/Login.jsx';
import ForgotPassword from '../../../Features/ForgotPassword/ForgotPassword.jsx';
import Landing from '../../../Features/Landing/Landing.jsx';
import Error404 from '../../../Features/Error 404/Error404.jsx';

/* --------- Admin Components --------- */
import Admin from '../../../Features/Admin/Admin.jsx';
import AdminDashboard from '../../../Features/Admin/Features/Dashboard/Dashboard.jsx';
import AddDoctor from '../../../Features/Admin/Features/Doctor/AddDoctor.jsx';
import ViewDoctor from '../../../Features/Admin/Features/Doctor/ViewDoctor.jsx';
import DoctorList from '../../../Features/Admin/Features/Doctor/DoctorList.jsx';
import AddHospital from '../../../Features/Admin/Features/Hospital/AddHospital.jsx';
import ViewHospital from '../../../Features/Admin/Features/Hospital/ViewHospital.jsx';
import HospitalList from '../../../Features/Admin/Features/Hospital/HospitalList.jsx';
import AddDepartment from '../../../Features/Admin/Features/Department/AddDepartment.jsx';
import DepartmentList from '../../../Features/Admin/Features/Department/DepartmentList.jsx';
import viewDepartment from '../../../Features/Admin/Features/Department/ViewDepartment.jsx';
import AdminAppointmentList from '../../../Features/Admin/Features/Appointment/Appointment.jsx';
import Inquiry from '../../../Features/Admin/Features/Inquiry/Inquiry.jsx';
import Backup from '../../../Features/Admin/Features/Backup/Backup.jsx';

/* --------- Doctor Components --------- */
import Doctor from '../../../Features/Doctor/Doctor.jsx';
import DoctorDashboard from '../../../Features/Doctor/Features/Dashboard/Dashboard.jsx';
import Workspace from '../../../Features/Doctor/Features/Workspace/Workspace.jsx';
import DoctorAppointmentList from '../../../Features/Doctor/Features/Appointment/Appointment.jsx';
import AddPrescription from '../../../Features/Doctor/Features/Prescription/Prescription.jsx';

/* --------- Patient Components --------- */
import Dashboard from '../../../Features/Patient/Features/Dashboard/Dashboard.jsx';
import BookAppointment from '../../../Features/Patient/Features/Appointment/BookAppointment.jsx';
import Prescription from '../../../Features/Patient/Features/Prescription/Prescription.jsx';



export const routeData = [
    /* --------- Common routes --------- */
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
        path: "/*",
        route: PublicRoute,
        element: Error404,
    },

    /* --------- Admin routes --------- */
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
                path: "view-department/:id",
                element: viewDepartment
            },
            {
                path: "appointments",
                element: AdminAppointmentList
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

    /* --------- Doctor routes --------- */
    {
        path: "/doctor",
        route: AuthorizedRoute,
        element: Doctor,
        children: [
            {
                path: "dashboard",
                element: DoctorDashboard,
            },
            {
                path: "workspace",
                element: Workspace,
            },
            {
                path: "appointments",
                element: DoctorAppointmentList,
            },
            {
                path: "add-prescription",
                element: AddPrescription,
            },
        ]
    },

    /* --------- Patient routes --------- */
    {
        path: "/book-appointment",
        route: AuthorizedRoute,
        element: BookAppointment,
    },
    {
        path: "/dashboard",
        route: AuthorizedRoute,
        element: Dashboard,
    },
    {
        path: "/prescription",
        route: AuthorizedRoute,
        element: Prescription,
    },
]
