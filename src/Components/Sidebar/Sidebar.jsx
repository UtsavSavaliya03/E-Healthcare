import React from 'react';
import './Sidebar.css';
import { useRecoilValue } from 'recoil';
import { Link } from "react-router-dom";
import { sidebarData } from './SidebarData/SidebarData.jsx';
import { useLocation } from 'react-router-dom';
import { sidebarStateAtom } from '../../Store/globalState.jsx';

export default function Sidebar({ children }) {

    const location = useLocation();
    const isOpenSidebar = useRecoilValue(sidebarStateAtom);

    return (
        <>
            <div className={`sidebar_container ${isOpenSidebar ? '' : 'hide-sidebar'}`}>
                <ul className='p-2 m-0'>
                    {
                        sidebarData?.map((sidebar, index) => {
                            return (
                                <li key={index} className={`d-flex w-100 align-items-center ${location.pathname === sidebar.path ? 'active_element' : ''}`}>
                                    {sidebar.icon}
                                    <Link className='py-2 w-100' to={sidebar.path}>{sidebar.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <main className={`${isOpenSidebar ? 'main-toggle' : '' }`}>{children}</main>
        </>
    )
}