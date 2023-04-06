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
import Newsletter from '../../../Features/Admin/Features/Newsletter/Newsletter.jsx';

/* --------- Doctor Components --------- */
import Doctor from '../../../Features/Doctor/Doctor.jsx';
import DoctorDashboard from '../../../Features/Doctor/Features/Dashboard/Dashboard.jsx';
import Workspace from '../../../Features/Doctor/Features/Workspace/Workspace.jsx';
import DoctorAppointmentList from '../../../Features/Doctor/Features/Appointment/Appointment.jsx';

/* --------- Laboratory Components --------- */
import Laboratory from '../../../Features/Laboratory/Laboratory.jsx';
import LaboratoryDashboard from '../../../Features/Laboratory/Features/Dashboard/Dashboard.jsx'
import AddLaboratory from '../../../Features/Admin/Features/Laboratory/AddLaboratory.jsx';

/* --------- Patient Components --------- */
import Dashboard from '../../../Features/Patient/Features/Dashboard/Dashboard.jsx';
import BookAppointment from '../../../Features/Patient/Features/Appointment/BookAppointment.jsx';



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
                path: "DoctorDashboard",
                element: DoctorDashboard
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
                path: "add-laboratory",
                element: AddLaboratory
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
                path: "newsletter",
                element: Newsletter
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
        ]
    },

    /* --------- Laboratory routes --------- */
    {
        path: "/laboratory",
        route: AuthorizedRoute,
        element: Laboratory,
        children: [
            {
                path: "dashboard",
                element: LaboratoryDashboard,
            }
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
]
