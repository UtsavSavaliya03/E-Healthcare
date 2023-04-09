import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userState } from "../../Store/globalState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export default function Laboratory() {

  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user?._id) {
      if (user?.role !== 2) {
        if (user?.role === 0) {
          navigate('/main/dashboard');
        } if (user?.role === 1) {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    }
  }, [user]);

  return (
    <div>
      <Outlet />
    </div>
  )
}