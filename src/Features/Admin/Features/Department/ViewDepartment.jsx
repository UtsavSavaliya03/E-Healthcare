import React, { useEffect, useState } from 'react';
import './ViewDepartment.css';
import departmentImg from '../../../../Assets/Backgrounds/common-department.jpg';
import { fetchDepartmentById } from '../../Services/departmentServices.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import Alert from '../../../../Components/Common/Alert/SweetAlert.jsx';
import { deleteDepartment } from '../../Services/departmentServices.jsx';
import { IconButton } from '@mui/material';
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from '@mui/icons-material/Delete';
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';

export default function ViewDepartment() {

  const alert = new Alert();
  const notification = new Notificaion;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const pathArray = (location.pathname).split('/');
  const departmentId = atob(pathArray[3]) || null;
  const token = localStorage.getItem('token') || null;
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [doctorsDetails, setDoctorsDetails] = useState([]);

  const fetchDepartmentByIdHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const department = await fetchDepartmentById(departmentId, headers);
    setDepartmentDetails(department.data?.department);
    setDoctorsDetails(department.data?.doctors);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDepartmentByIdHandle();
  }, []);

  const deleteHandler = async () => {
    setIsDeleteLoading(true);
    const headers = {
      'Authorization': token
    }
    const departmentResponse = await deleteDepartment(departmentId, headers);
    if (departmentResponse?.status) {
      alert.alert('success', 'Done!', 'Deleted Ssccessfully!');
      navigate('/main/department-list');
    } else {
      notification.notify(departmentResponse?.status, departmentResponse?.message);
    }
  }

  const openDeletePopup = () => {
    alert.confirmBox('Are you sure?', "You won't be able to revert this!", { deleteHandler })
  }

  const avatarCard = (doctor, index) => {
    return (
      <div className="col-lg-4 col-md-3 col-12 my-3 doctor-detail-box d-flex" key={index}>
        <div className="dpt-doctor-img-container">
          <Avatar
            src={doctor?.profileImg}
            name={`${doctor?.fName} ${doctor?.lName}`}
            round={true}
            size={55}
          />
        </div>
        <div className="dpt-doctor-info ml-2">
          <h5 className="font-weight-bold">{`${doctor?.fName} ${doctor?.lName}`}</h5>
          <h6>{doctor?.email}</h6>
        </div>
      </div>
    )
  }

  return (
    <div className='department-container p-4'>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='departmen-info-card-container d-flex justify-content-center mb-5'>
            <div className="leftbox  p-3 w-100">
              <img src={departmentImg} alt="" className='rounded-0 mt-2 department-img' />
            </div>
            <div className="rightbox p-3 pt-5 w-100">
              <div className='info-para w-100'>
                <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                  <h2 className='text-blue font-weight-bold m-0'>{departmentDetails?.name}</h2>
                  <IconButton
                    className='ml-2 btn-delete-dpt'
                    onClick={openDeletePopup}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div className='mb-4'>
                  {departmentDetails?.status ? (
                    <p className="active-status-tag">Active</p>
                  ) : (
                    <p className="inactive-status-tag">Inactive</p>
                  )}
                </div>
                <p>{departmentDetails?.description}</p>
              </div>
            </div>
          </div>
          <div className="p-md-5 department-doctor-container">
            <div className="body-title p-3">
              <h3 className="font-weight-bold text-blue">Doctors in this department</h3>
              <div className="horizontal-bar"></div>
            </div>
            <div>
              {
                doctorsDetails?.length > 0 ? (
                  <div className="row p-3">
                    {doctorsDetails.map((doctor, index) => (
                      avatarCard(doctor, index)
                    ))}
                  </div>
                ) : (
                  <div className="w-100 p-3">
                    <h5 className="m-0 text-muted text-center">No Doctors</h5>
                  </div>
                )
              }
            </div>
          </div>
        </>
      )}
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoading}
      >
        <Spinner />
      </Backdrop>
    </div>
  )
}