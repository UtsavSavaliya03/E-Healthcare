import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { patientSidebarData, doctorSidebarData, adminSidebarData, laboratorySidebarData } from './SidebarData/SidebarData.jsx';
import { sidebarStateAtom, userState } from '../../Store/globalState.jsx';
import useHeader from '../Header/Hooks/useHeader.jsx';
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './Sidebar.css';

const Sidebar = ({ children }) => {

  const isHeader = useHeader();
  const [sidebarData, setSidebarData] = useState([])
  const [isOpen, setIsOpen] = useRecoilState(sidebarStateAtom);
  const user = useRecoilValue(userState);
  const userRole = user?.role;

  useEffect(() => {
    if (userRole === 0) {
      setSidebarData(adminSidebarData);
    } else if (userRole === 1) {
      setSidebarData(doctorSidebarData);
    } else if (userRole === 2) {
      setSidebarData(laboratorySidebarData);
    } else if (userRole === 3) {
      setSidebarData(patientSidebarData);
    } else {
      setSidebarData([]);
    }
  }, [user])


  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="sidebar-main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "0px",
            transition: {
              duration: 0.5,
              damping: 10,
            },
          }}
          className={`sidebar ${isOpen ? '' : 'hide-sidebar'}`}
        >
          <section className="sidebar-routes">
            {sidebarData?.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="sidebar-link"
                  activeClassName="active"
                >
                  <div className="sidebar-icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="sidebar-link-text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <main className={`main-toggle ${isHeader ? 'sidebar-container-main' : 'sidebar-container-main-full'}`}>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;