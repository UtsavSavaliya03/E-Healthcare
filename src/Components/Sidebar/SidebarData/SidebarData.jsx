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
  FaList,
  FaHospitalAlt,
  FaBookMedical,
  FaEnvelope,
  FaMicroscope
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
    icon: <FaHospitalAlt />,
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: <FaUserMd />,
  },
  {
    name: "Appointment",
    icon: <FaCalendarDay />,
    subRoutes: [
      {
        path: "/book-appointment",
        name: "Book Appointment",
        icon: <FaBookMedical />,
      },
      {
        path: "main/add-hospital",
        name: "My Appointments",
        icon: <FaList />,
      },
    ],
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
    path: "doctor/appointments",
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
    name: "Laboratories",
    icon: <FaMicroscope />,
    subRoutes: [
      {
        path: "main/doctor-list",
        name: "Laboratory List",
        icon: <FaListUl />,
      },
      {
        path: "main/add-laboratory",
        name: "Add Laboratory",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "main/appointments",
    name: "Appointments",
    icon: <FaCalendarDay />,
  },
  {
    path: "main/inquiries",
    name: "Inquiries",
    icon: <FaQuestionCircle />,
  },
  {
    path: "main/newsletter",
    name: "Newsletter",
    icon: <FaEnvelope />,
  },
  {
    path: "main/backup",
    name: "Backup",
    icon: <FaDatabase />,
  },
]