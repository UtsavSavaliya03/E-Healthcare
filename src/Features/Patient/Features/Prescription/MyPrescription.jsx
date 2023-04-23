import React, { useState, useEffect } from 'react';
import './MyPrescription.css';
import { useRecoilValue } from "recoil";
import { userState } from '../../../../Store/globalState.jsx';
import { fetchPrescription } from '../../Services/userServices.jsx';
import IconButton from '@mui/material/IconButton';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';
import PrescriptionDownloader from '../../../../Components/Common/Prescription/PrescriptionDownloader.jsx';
import { Helmet } from 'react-helmet';

export default function MyPrescription() {

  const prescriptionServices = new PrescriptionDownloader();
  const user = useRecoilValue(userState);
  const token = localStorage.getItem("token") || null;
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortDates = (prescriptionData) => {
    const sortedObjectsArray = [...prescriptionData].sort((a, b) => new Date(b?.prescription?.createdAt) - new Date(a?.prescription?.createdAt));
    return sortedObjectsArray;
  }

  const fetchPrescriptionHandler = async () => {
    setIsLoading(true);
    if (!(user?._id)) {
      setIsLoading(false);
      return;
    }

    const headers = {
      'Authorization': token,
    };

    const prescriptionResponse = await fetchPrescription(user?._id, headers);
    setPrescriptions(sortDates(prescriptionResponse?.data));

    setIsLoading(false);
  }

  useEffect(() => {
    fetchPrescriptionHandler();
  }, []);

  const PrescriptionTable = () => {
    return (<>
      <table className="table prescription-table">
        <thead>
          <tr className="text-light">
            <th className="pre-heading">Serial No</th>
            <th className="pre-heading">Doctor Name</th>
            <th className="pre-heading">mobile No</th>
            <th className="pre-heading">Prescription Date</th>
            <th className="pre-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            prescriptions?.map((prescription, index) => {
              let prescriptionFileName = `${prescription?.patient?.patientId} ${moment(prescription?.prescription?.createdAt).format('LL')}`;
              return (
                < >
                  <tr key={index} className='border-blur'>
                    <td data-title="No" className='pt-3'>{index + 1}</td>
                    <td data-title="Doctor Name" className='pt-3'>{`Dr. ${prescription?.doctor?.fName} ${prescription?.doctor?.lName}`}</td>
                    <td data-title="Doctor Name" className='pt-3'>{`+91 ${prescription?.doctor?.mobileNo}`}</td>
                    <td data-title="Appointment Date" className='pt-3'>{moment(prescription?.prescription?.createdAt).format('LLLL')}</td>
                    <td className="prescription-action">
                      <IconButton
                        onClick={() => prescriptionServices?.viewPdf(prescription?.prescription?._id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        className="ml-3"
                        onClick={() => prescriptionServices?.downloadPdf(prescription?.prescription?._id, prescriptionFileName)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </td>
                  </tr>
                  <PrescriptionDownloader patient={prescription?.patient} doctor={prescription?.doctor} prescription={prescription?.prescription} />
                </>
              )
            })
          }
        </tbody>
      </table>
    </>
    )
  }

  return (
    <div className='prescription-list-container'>
      <Helmet>
        <title>My Prescriptions | Health Horizon</title>
      </Helmet>
      <h2 className='text-blue py-4 px-md-4'>My Prescriptions</h2>
      {
        isLoading ? (
          <div className='d-flex justify-content-center pt-5 mt-5'>
            <Spinner />
          </div>
        ) : (
          <div className="prescription-table-container px-md-4 m-0 p-0">
            {
              prescriptions?.length > 0 ? (
                <PrescriptionTable />
              ) : (
                <h4 className='p-5 text-center text-muted'>
                  No Prescriptions
                </h4>
              )
            }
          </div>
        )
      }
    </div>
  )
}
