import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Avatar from "react-avatar";
import { useRecoilState } from "recoil";
import {
  mainLoadingState,
  userState,
  sidebarStateAtom,
  changePasswordModal,
} from "../../Store/globalState";
import useHeader from "./Hooks/useHeader.jsx";
import useLogin from "./Hooks/useLogin.jsx";
import { findMe } from "./Services/userServices.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaSignOutAlt, FaUserAlt, FaUnlockAlt } from "react-icons/fa";
import logo from "../../Assets/Logos/Logo.png";
import PasswordModal from "./Components/PasswordModal";

export default function Header() {
  const navigate = useNavigate();
  const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(sidebarStateAtom);
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useRecoilState(mainLoadingState);
  const userId = atob(localStorage.getItem("userId")) || null;
  const token = localStorage.getItem("token") || null;
  const isVisibleHeader = useHeader();
  const isLogin = useLogin();
  const [userName, setUserName] = useState('');
  const [openPasswordChange, setOpenPasswordChange] = useRecoilState(changePasswordModal);

  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    if (user.role == 2) {
      setUserName(user?.name)
    } else {
      setUserName(user?.fName + " " + user?.lName);
    }
  }, [user])

  const findUser = async () => {
    if (isLogin) {
      const headers = {
        'Authorization': token,
      };
      setIsLoading(true);
      const userResponse = await findMe(userId, headers);
      if (userResponse) {
        if (userResponse?.data) {
          setUser({ ...userResponse?.data, isLogin: true });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        logoutHandler();
      }
    }
  };

  const logoutHandler = () => {
    setIsOpenSidebar(false);
    localStorage.clear();
    setUser({});
    navigate("/");
  };

  const sidebarHandler = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const myAccountHandler = () => {
    if (user?.role === 0) {
      navigate('/main/my-account');
    } else if (user?.role === 1) {
      navigate('/doctor/my-account');
    } else if (user?.role === 2) {
      navigate('/laboratory/my-account');
    } else {
      navigate('patient/my-account');
    }
  }

  const chnagePasswordHandler = () => {
    setOpenPasswordChange(true);
  }

  return (
    <>
      {isVisibleHeader && (
        <div className="header-container d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <i
              class="fas fa-bars fa-2x mx-2 header-bar"
              onClick={sidebarHandler}
            ></i>
            <a className="navbar-brand mx-3" href="/">
              <img src={logo} className="header-logo-img" alt="Logo" />
            </a>
          </div>
          <div>
            {isLoading ? (
              <div className="user-icon-skeleton-container">
                <Skeleton circle={true} height={40} width={40} />
              </div>
            ) : (
              <div className="user-avatar">
                <Avatar
                  size="40"
                  round
                  name={userName}
                  src={user?.profileImg}
                />
                <div className="dropdown">
                  <ul className="dropdown-content">
                    <div className="user d-flex justify-content-start align-items-center px-4 py-2">
                      <div>
                        <Avatar
                          className="dropdown-avatar"
                          size="50"
                          round={true}
                          name={userName}
                          src={user?.profileImg}
                        />
                      </div>
                      <div className="pl-3">
                        <h6 className="m-0 dropdown-title break-title-1">
                          {userName}
                        </h6>
                        <p className="m-0 text-muted break-title-1">
                          {user?.email}
                        </p>
                      </div>
                      <div className="clear"></div>
                    </div>
                    <hr className="my-2" />
                    <button
                      className="btn-logout py-2 px-4 align-items-center d-flex"
                      onClick={myAccountHandler}
                    >
                      <FaUserAlt size={20} className="mr-2" />
                      My Account
                    </button>
                    <button
                      className="btn-logout py-2 px-4 align-items-center d-flex"
                      onClick={chnagePasswordHandler}
                    >
                      <FaUnlockAlt size={20} className="mr-2" />
                      Change Password
                    </button>
                    <hr className="my-2" />
                    <button
                      className="btn-logout py-2 px-4 align-items-center d-flex"
                      onClick={logoutHandler}
                    >
                      <FaSignOutAlt size={20} className="mr-2" />
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <PasswordModal open={openPasswordChange} />
        </div>
      )}
    </>
  );
}
