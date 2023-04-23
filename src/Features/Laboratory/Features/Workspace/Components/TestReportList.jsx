import React, { useState, useEffect } from 'react';
import './TestReportList.css';
import { useRecoilValue } from "recoil";
import { userState } from '../../../../../Store/globalState.jsx';
import { fetchTestReportsByLaboratory } from '../../../../Laboratory/Services/laboratoryServices.jsx';
import IconButton from '@mui/material/IconButton';
import { Spinner } from '../../../../../Components/Common/Spinners/Spinners.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';
import TestReportDownloader from '../../../../../Components/Common/TestReport/TestReportDownloader.jsx';
import Backdrop from "@mui/material/Backdrop";

export default function TestReportList() {

  const testReportsServices = new TestReportDownloader();
  const laboratory = useRecoilValue(userState);
  const token = localStorage.getItem("token") || null;
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);

  const sortDates = (reports) => {
    const sortedObjectsArray = [...reports].sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    return sortedObjectsArray;
  }

  const fetchTestReportsHandler = async () => {
    setIsLoading(true);
    if (!(laboratory?._id)) {
      return;
    }

    const headers = {
      'Authorization': token,
    };

    const reportResponse = await fetchTestReportsByLaboratory(laboratory?._id, headers);
    setReports(sortDates(reportResponse?.data));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTestReportsHandler();
  }, [laboratory]);

  const ReportsTable = () => {
    return (
      <table className="table prescription-table">
        <thead>
          <tr className="text-light">
            <th className="pre-heading">Serial No</th>
            <th className="pre-heading">Patient Name</th>
            <th className="pre-heading">Test Type</th>
            <th className="pre-heading">Test Date</th>
            <th className="pre-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            reports?.map((report, index) => {
              let testReportFileName = `${report?.patient?.patientId} ${moment(report?.createdAt).format('LL')}`;
              return (
                < >
                  <tr key={index} className='border-blur'>
                    <td data-title="No" className='pt-3'>{index + 1}</td>
                    <td data-title="Hospital Name" className="break-line1 pt-3">{`${report?.patient?.fName} ${report?.patient?.lName}`}</td>
                    <td data-title="Doctor Name" className='pt-3'>{`${report?.type}`}</td>
                    <td data-title="Appointment Date" className='pt-3'>{moment(report?.createdAt).format('LLLL')}</td>
                    <td className="prescription-action">
                      <IconButton
                        onClick={() => testReportsServices?.viewPdf(report?._id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        className="ml-3"
                        onClick={() => testReportsServices?.downloadPdf(report?._id, testReportFileName)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </td>
                  </tr>
                  <TestReportDownloader reportData={report} />
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
              reports?.length > 0 ? (
                <ReportsTable />
              ) : (
                <div className='p-5 text-center text-muted'>
                  No Reports
                </div>
              )
            }
          </div>
        )
      }
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoadingBackdrop}
      >
        <Spinner />
      </Backdrop>
    </div>
  )
}
