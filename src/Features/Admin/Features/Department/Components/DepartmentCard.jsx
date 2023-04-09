import React from "react";
import "./DepartmentCard.css";
import Avatar from '@mui/material/Avatar';
import { useNavigate} from "react-router-dom";
import backgroundPicture from '../../../../../Assets/Backgrounds/bg-dpt.jpg';

export default function DepartmentCard(props) {

  const { department } = props;
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate(`/main/view-department/${btoa(department?._id)}`);
  }

  return (
    <div className="col-4 my-3">
      <div
        className="department-card"
        onClick={redirectHandler}
      >
        <div className="department-card-banner" style={{backgroundImage: `url(${department?.backgroundImg || backgroundPicture})`}}>
          <Avatar
            alt={department?.name}
            className="department-card-svg"
            src={department?.profileImg}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <h2 className="department-card-name pt-4 mt-5 text-center font-weight-bold">
          {department?.name}
        </h2>
        <div className="department-card-title text-center">
          {department?.status ? (
            <p className="active-status-tag">Active</p>
          ) : (
            <p className="inactive-status-tag">Inactive</p>
          )}
        </div>
        <div className="m-4 break-line-5">
          {department?.description}
        </div>
      </div>
    </div>
  );
}
