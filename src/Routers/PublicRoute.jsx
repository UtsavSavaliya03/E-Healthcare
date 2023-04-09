import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import useLogin from '../Components/Header/Hooks/useLogin.jsx';

export default function PublicRoute() {
    const isLogin = useLogin();

    return ((!isLogin) ? <Outlet /> : <Navigate to='/patient/dashboard' />);
}