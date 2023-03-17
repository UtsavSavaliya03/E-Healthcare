import {
  FaHome,
  FaCalendarDay,
  FaHospital,
  FaUserMd,
  FaPlus,
  FaListUl,
  FaHospitalUser,
  FaQuestionCircle,
} from "react-icons/fa";

export const sidebarData = [
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
    path: "/main",
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
    path: "/main",
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
]