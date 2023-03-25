import {
  FaHome,
  FaCalendarDay,
  FaHospital,
  FaUserMd,
  FaPlus,
  FaListUl,
  FaHospitalUser,
  FaQuestionCircle,
  FaDatabase,
  FaFilePrescription,
  FaDesktop,
} from "react-icons/fa";

export const patientSidebarData = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/hospitals",
    name: "Hospitals",
    icon: <FaHospitalUser />,
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: <FaUserMd />,
  },
  {
    path: "/appointment",
    name: "My Appointment",
    icon: <FaCalendarDay />,
  },
  {
    path: "/prescription",
    name: "My Prescription",
    icon: <FaFilePrescription />,
  },
]

export const doctorSidebarData = [
  {
    path: "doctor/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "doctor/workspace",
    name: "Workspace",
    icon: <FaDesktop />,
  },
  {
    path: "/hospitals",
    name: "Hospitals",
    icon: <FaHospitalUser />,
  },
  {
    path: "/appointment",
    name: "My Appointment",
    icon: <FaCalendarDay />,
  },
]

export const adminSidebarData = [
  {
    path: "main/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    name: "Hospitals",
    icon: <FaHospital />,
    subRoutes: [
      {
        path: "main/hospital-list",
        name: "Hospital List",
        icon: <FaListUl />,
      },
      {
        path: "main/add-hospital",
        name: "Add Hospital",
        icon: <FaPlus />,
      },
    ],
  },
  {
    name: "Departments",
    icon: <FaHospitalUser />,
    subRoutes: [
      {
        path: "main/department-list",
        name: "Department List",
        icon: <FaListUl />,
      },
      {
        path: "main/add-department",
        name: "Add Department",
        icon: <FaPlus />,
      },
    ],
  },
  {
    name: "Doctors",
    icon: <FaUserMd />,
    subRoutes: [
      {
        path: "main/doctor-list",
        name: "Doctor List",
        icon: <FaListUl />,
      },
      {
        path: "main/add-doctor",
        name: "Add Doctor",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "main/appointment",
    name: "Appointments",
    icon: <FaCalendarDay />,
  },
  {
    path: "main/inquiries",
    name: "Inquiries",
    icon: <FaQuestionCircle />,
  },
  {
    path: "main/backup",
    name: "Backup",
    icon: <FaDatabase />,
  },
]