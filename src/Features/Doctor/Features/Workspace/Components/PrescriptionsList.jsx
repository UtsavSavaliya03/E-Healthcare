import React, { useState, useEffect } from 'react';
import './PrescriptionsList.css';
import { useRecoilValue } from "recoil";
import { userState } from '../../../../../Store/globalState.jsx';
import { fetchPrescription } from '../../../Services/prescriptionServices.jsx';
import IconButton from '@mui/material/IconButton';
import { Spinner } from '../../../../../Components/Common/Spinners/Spinners.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';
import PrescriptionDownloader from '../../../../../Components/Common/Prescription/PrescriptionDownloader';

export default function PrescriptionsList() {

  const prescriptionServices = new PrescriptionDownloader();
  const doctor = useRecoilValue(userState);
  const token = localStorage.getItem("token") || null;
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortDates = (prescriptionData) => {
    const sortedObjectsArray = [...prescriptionData].sort((a, b) => new Date(b?.prescription?.createdAt) - new Date(a?.prescription?.createdAt));
    return sortedObjectsArray;
  }

  const fetchPrescriptionHandler = async () => {
    setIsLoading(true);
    if (!(doctor?._id)) {
      return;
    }

    const headers = {
      'Authorization': token,
    };

    const prescriptionResponse = await fetchPrescription(doctor?._id, headers);
    setPrescriptions(sortDates(prescriptionResponse?.data));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPrescriptionHandler();
  }, [doctor]);

  const PrescriptionTable = () => {
    return (
      <table className="table prescription-table">
        <thead>
          <tr className="text-light">
            <th className="pre-heading">Serial No</th>
            <th className="pre-heading">Patient Name</th>
            <th className="pre-heading">Doctor Name</th>
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
                    <td data-title="Hospital Name" className="break-line1 pt-3">{`${prescription?.patient?.fName} ${prescription?.patient?.lName}`}</td>
                    <td data-title="Doctor Name" className='pt-3'>{`Dr. ${doctor?.fName} ${doctor?.lName}`}</td>
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
    )
  }

  return (
    <div className='prescription-list-container'>
      {
        isLoading ? (
          <div className='d-flex justify-content-center pt-5'>
            <Spinner />
          </div>
        ) : (
          <div className="prescription-table-container px-md-4 m-0 p-0">
            {
              prescriptions?.length > 0 ? (
                <PrescriptionTable />
              ) : (
                <div className='p-5 text-center text-muted'>
                  No Prescriptions
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}
