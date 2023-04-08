import React, { useEffect } from "react";
import "./ViewLaboratory.css";
import LaboratoryIcon from "../../../../Assets/Icons/LaboratoryIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchLaboratoryById,deleteLaboratoryById } from "../../Services/laboratoryServices.jsx";
import { useState } from "react";
import Avatar from "react-avatar";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '../../../../Components/Common/Alert/SweetAlert.jsx';
import Backdrop from "@mui/material/Backdrop";
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';


export default function ViewLaboratory() {
  const alert = new Alert();
  const location = useLocation();
  const notification = new Notificaion;
  const navigate = useNavigate();
  const pathArray = location.pathname.split("/");
  const token = localStorage.getItem("token") || null;
  const laboratoryId = atob(pathArray[3]) || null;
  const [Laboratory, setLaboratory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);


  const fetchLaboratoryHandler = async () => {
    setIsLoading(true);

    const headers = {
      'Authorization': token,
    };

    const laboratory = await fetchLaboratoryById(laboratoryId, headers);
    setLaboratory(laboratory?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLaboratoryHandler();
  }, []);

  const deleteHandler = async () => {
    setIsDeleteLoading(true);
    const headers = {
      'Authorization': token
    }
    const laboratoryResponse = await deleteLaboratoryById(laboratoryId, headers);
    if (laboratoryResponse?.status) {
      alert.alert('success', 'Done!', 'Deleted Successfully!');
      navigate('/main/laboratory-list');
    } else {
      notification.notify(laboratoryResponse?.status, laboratoryResponse?.message);
    }
    setIsDeleteLoading(false);
  }

  const openDeletePopup = () => {
    alert.confirmBox('Are you sure?', "You won't be able to revert this!", { deleteHandler })
  }

  return (
    <div className="p-4 view-hospital-container">
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row m-0 view-hospital-card">
            <div className="col-12 text-center pt-5 pb-3">
              <div className="d-flex align-items-center justify-content-center pl-2">
                <h1 className="text-blue text-center font-weight-bold ml-4 view-hospital-title my-0">
                  Laboratory Profile
                </h1>
                <div className="hospital-action-btn-container ml-auto">
                  <IconButton
                    className='m-2 btn-edit-hospital'
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className='m-2 btn-delete-hospital'
                  onClick={openDeletePopup}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              <hr className="mt-5" />
            </div>
            <div className="col-lg-3 col-md-6 p-md-5">
              <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
                Details
              </h3>
              <p className="font-weight-bold h5">Contact No :</p>
              <p className="h5">{Laboratory?.mobileNo}</p>
              <p className="font-weight-bold h5 mt-md-4">Email :</p>
              <p className="h5">{Laboratory?.email}</p>
            </div>
            <div className="col-lg-5 col-md-6 p-md-5 mt-4 mt-md-0">
              <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
                About Us
              </h3>
              <p className="h5">{Laboratory?.shortBio}</p>
            </div>
            <div className="col-lg-4 col-md-12 p-md-5 py-5 py-md-0 view-hospital-profile-container text-light d-flex justify-content-center align-items-center flex-column">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <img
                  src={LaboratoryIcon}
                  alt="Laboratory Icon"
                  className="hospital-icon"
                />
              </div>
              <div>
                <h2 className="font-weight-bold mb-5 text-center">
                  {Laboratory.name}
                </h2>
                <p className="font-weight-bold h5">Address Line :</p>
                <p className="h5">{Laboratory?.addressLine}</p>
                <p className="font-weight-bold h5 mt-4">City :</p>
                <p className="h5">{Laboratory?.city?.name}</p>
                <p className="font-weight-bold h5 mt-4">State :</p>
                <p className="h5">{Laboratory?.state?.name}</p>
                <p className="font-weight-bold h5 mt-4">Pincode :</p>
                <p className="h5">{Laboratory?.pincode}</p>
              </div>
            </div>
          </div>

        </>
      )}
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isDeleteLoading}
      >
        <Spinner />
      </Backdrop>
    </div>
  );
}
