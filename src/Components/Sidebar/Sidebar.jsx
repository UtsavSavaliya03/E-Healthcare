// import React from 'react';
// import './Sidebar.css';
import { useRecoilState } from 'recoil';
// import { Link } from "react-router-dom";
import { sidebarData } from './SidebarData/SidebarData.jsx';
// import { useLocation } from 'react-router-dom';
import { sidebarStateAtom } from '../../Store/globalState.jsx';
import useHeader from '../Header/Hooks/useHeader.jsx';

// export default function Sidebar({ children }) {

//     const location = useLocation();

//     return (
//         <>
//             <div className={`sidebar_container ${isOpenSidebar ? '' : 'hide-sidebar'}`}>
//                 <ul className='p-2 m-0'>
//                     {
//                         sidebarData?.map((sidebar, index) => {
//                             return (
//                                 <li key={index} className={`d-flex w-100 align-items-center ${location.pathname === sidebar.path ? 'active_element' : ''}`}>
//                                     {sidebar.icon}
//                                     <Link className='py-2 w-100' to={sidebar.path}>{sidebar.title}</Link>
//                                 </li>
//                             )
//                         })
//                     }
//                 </ul>
//             </div>
//             <main className={`${isOpenSidebar ? 'main-toggle' : '' }`}>{children}</main>
//         </>
//     )
// }





import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './Sidebar.css';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useRecoilState(sidebarStateAtom);

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
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar sidebar_container ${isOpen ? '' : 'hide-sidebar'}`}
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
        <main className='main-toggle'>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;

//export default function Sidebar({ children }) {

  //  const location = useLocation();
//    const isOpenSidebar = useRecoilValue(sidebarStateAtom);
//    const isHeader = useHeader();

//    return (
//        <>
//            <div className={`sidebar-container ${isOpenSidebar ? '' : 'hide-sidebar'}`}>
//               <ul className='p-2 m-0'>
 //                   {
   //                     sidebarData?.map((sidebar, index) => {
//                            return (
 //                               <li key={index} className={`d-flex w-100 align-items-center ${location.pathname === sidebar.path ? 'active_element' : ''}`}>
//                                    {sidebar.icon}
 //                                   <Link className='py-2 w-100' to={sidebar.path}>{sidebar.title}</Link>
//                                </li>
//                            )
 //                       })
//                    }
//                </ul>
//            </div>
//            <main className={`${isOpenSidebar ? 'main-toggle' : ''} ${isHeader ? 'sidebar-container-main' : 'sidebar-container-main-full'}`}>{children}</main>
 //       </>
//    )
//}
