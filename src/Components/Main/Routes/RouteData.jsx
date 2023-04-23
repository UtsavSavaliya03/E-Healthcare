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
import AdminPatients from '../../../Features/Admin/Features/Patients/Patients.jsx';
import Inquiry from '../../../Features/Admin/Features/Inquiry/Inquiry.jsx';
import Backup from '../../../Features/Admin/Features/Backup/Backup.jsx';
import Newsletter from '../../../Features/Admin/Features/Newsletter/Newsletter.jsx';

/* --------- Doctor Components --------- */
import Doctor from '../../../Features/Doctor/Doctor.jsx';
import DoctorDashboard from '../../../Features/Doctor/Features/Dashboard/Dashboard.jsx';
import Workspace from '../../../Features/Doctor/Features/Workspace/Workspace.jsx';
import DoctorAppointmentList from '../../../Features/Doctor/Features/Appointment/Appointment.jsx';
import DoctorPrescriptionList from '../../../Features/Doctor/Features/Prescriptions/Prescriptions.jsx';
import DoctorReportstList from '../../../Features/Doctor/Features/Reports/Reports.jsx';
import DoctorProfile from '../../../Features/Doctor/Features/Profile/Profile.jsx';

/* --------- Laboratory Components --------- */
import Laboratory from '../../../Features/Laboratory/Laboratory.jsx';
import LaboratoryDashboard from '../../../Features/Laboratory/Features/Dashboard/Dashboard.jsx'
import AddLaboratory from '../../../Features/Admin/Features/Laboratory/AddLaboratory.jsx';
import LaboratoryList from '../../../Features/Admin/Features/Laboratory/LaboratoryList.jsx';
import ViewLaboratory from '../../../Features/Admin/Features/Laboratory/ViewLaboratory.jsx';
import LaboratoryWorkspace from '../../../Features/Laboratory/Features/Workspace/Workspace.jsx';
import LaboratoryProfile from '../../../Features/Laboratory/Features/Profile/Profile.jsx';

/* --------- Patient Components --------- */
import Patient from '../../../Features/Patient/Patient.jsx';
import Dashboard from '../../../Features/Patient/Features/Dashboard/Dashboard.jsx';
import PatientDoctors from '../../../Features/Patient/Features/Doctors/Doctors.jsx';
import PatientHospitals from '../../../Features/Patient/Features/Hospitals/Hospitals.jsx';
import BookAppointment from '../../../Features/Patient/Features/Appointment/BookAppointment.jsx';
import MyAppointments from '../../../Features/Patient/Features/Appointment/MyAppointments.jsx';
import MyPrescription from '../../../Features/Patient/Features/Prescription/MyPrescription.jsx';
import MyReports from '../../../Features/Patient/Features/MyReports/MyReports.jsx';
import PatientViewHospital from '../../../Features/Patient/Features/Hospitals/ViewHospital.jsx';
import PatientViewDoctor from '../../../Features/Patient/Features/Doctors/ViewDoctor.jsx';
import PatientProfile from '../../../Features/Patient/Features/Profile/Profile.jsx';



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
                path: "laboratory-list",
                element: LaboratoryList
            },
            {
                path: "view-laboratory/:id",
                element: ViewLaboratory
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
                path: "patients",
                element: AdminPatients
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
            {
                path: "my-account",
                element: PatientProfile
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
                path: "prescriptions",
                element: DoctorPrescriptionList,
            },
            {
                path: "reports",
                element: DoctorReportstList,
            },
            {
                path: "my-account",
                element: DoctorProfile
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
            },
            {
                path: "workspace",
                element: LaboratoryWorkspace,
            },
            {
                path: "my-account",
                element: LaboratoryProfile
            },
        ]
    },

    /* --------- Patient routes --------- */

    {
        path: "/patient",
        route: AuthorizedRoute,
        element: Patient,
        children: [
            {
                path: "dashboard",
                element: Dashboard,
            },
            {
                path: "doctors",
                element: PatientDoctors,
            },
            {
                path: "hospitals",
                element: PatientHospitals,
            },
            {
                path: "book-appointment",
                element: BookAppointment,
            },
            {
                path: "my-appointments",
                element: MyAppointments,
            },
            {
                path: "my-prescriptions",
                element: MyPrescription,
            },
            {
                path: "my-reports",
                element: MyReports,
            },
            {
                path: "view-hospital/:id",
                element: PatientViewHospital
            },
            {
                path: "view-doctor/:id",
                element: PatientViewDoctor
            },
            {
                path: "my-account",
                element: PatientProfile
            },
        ]
    },
]
