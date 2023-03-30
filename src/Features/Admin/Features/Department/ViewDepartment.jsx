import React, { useEffect, useState } from 'react';
import './ViewDepartment.css';
import departmentImg from '../../../../Assets/Backgrounds/common-department.jpg';
import { fetchDepartmentById } from '../../Services/departmentServices.jsx';
import { useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';


export default function ViewDepartment() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner />
        </div>
      ) : (

        <>
          <div className='container p-3 department-container  w-100  d-flex justify-content-center my-5'>
            <div className="leftbox  p-3 w-100">

              <img src={departmentImg} alt="" className='rounded-0 mt-2 department-img' />
            </div>
            <div className="rightbox p-3 w-100 d-flex align-items-center">
              <div className='info-para'>
                <h2 className='text-blue mb-4 font-weight-bold'>{departmentDetails?.name}</h2>
                <p>{departmentDetails?.description}</p>
              </div>
            </div>
          </div>
          <div className="container p-3 department-doctor-container w-100 my-5" >
            <div className="body-title py-3 px-3">
              <h5 className='text-blue'>Doctors</h5>
              <div className="horizontal-bar"></div>
            </div>
            <div className="row p-3">
              {
                doctorsDetails.map((doctors, index) => (
                  <div className="col-lg-4 my-3 doctor-detail-box d-flex" key={index}>
                    <div className="dpt-doctor-img-container">
                      <Avatar src={doctors?.profileImg} size="50" round={true} name={`${doctors?.fName} ${doctors?.lName}`} />
                    </div>
                    <div className="dpt-doctor-info ml-2">
                      <h5 className='font-weight-bold'>{`${doctors?.fName} ${doctors?.lName}`}</h5>
                      <h6>{doctors?.email}</h6>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
      )}
    </>

  )
}