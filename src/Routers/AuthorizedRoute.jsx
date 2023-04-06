import React from 'react';
import useLogin from '../Components/Header/Hooks/useLogin.jsx';
import { Navigate, Outlet } from "react-router-dom";;

export default function AuthorizedRoute() {

    const isLogin = useLogin();

    return (isLogin ? <Outlet /> : <Navigate to='/' />);
}