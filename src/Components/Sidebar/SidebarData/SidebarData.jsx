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
  FaMicroscope,
  FaUserInjured,
  FaFileMedical
} from "react-icons/fa";

export const patientSidebarData = [
  {
    path: "patient/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "patient/hospitals",
    name: "Hospitals",
    icon: <FaHospitalAlt />,
  },
  {
    path: "patient/doctors",
    name: "Doctors",
    icon: <FaUserMd />,
  },
  {
    name: "Appointment",
    icon: <FaCalendarDay />,
    subRoutes: [
      {
        path: "patient/book-appointment",
        name: "Book Appointment",
        icon: <FaBookMedical />,
      },
      {
        path: "patient/my-appointments",
        name: "My Appointments",
        icon: <FaList />,
      },
    ],
  },
  {
    path: "patient/my-prescriptions",
    name: "My Prescription",
    icon: <FaFilePrescription />,
  },
  {
    path: "patient/my-reports",
    name: "My Reports",
    icon: <FaFileMedical />,
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
    path: "doctor/appointments",
    name: "My Appointment",
    icon: <FaCalendarDay />,
  },
]
export const laboratorySidebarData = [
  {
    path: "laboratory/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "laboratory/workspace",
    name: "Workspace",
    icon: <FaDesktop />,
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
        path: "main/laboratory-list",
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
    path: "main/patients",
    name: "Patients",
    icon: <FaUserInjured />,
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