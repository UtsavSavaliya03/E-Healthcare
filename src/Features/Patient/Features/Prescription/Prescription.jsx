import React from "react";
import "./Prescription.css";
import PrescriptionLogo from "../../../../Assets/Icons/Prescription-logo.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PrescriptionFooter from "./Components/PrescriptionFooter.jsx";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

export default function Prescription() {
  const downloadpdf = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input, { useCORS: true, allowTaint: true, scrollY: 0 }).then(
      (canvas) => {
        const image = { type: "jpeg", quality: 0.98 };
        const margin = [0.5, 0.5];
        const filename = "myfile.pdf";

        var imgWidth = 8.5;
        var pageHeight = 11;

        var innerPageWidth = imgWidth - margin[0] * 2;
        var innerPageHeight = pageHeight - margin[1] * 2;

        // Calculate the number of pages.
        var pxFullHeight = canvas.height;
        var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
        var nPages = Math.ceil(pxFullHeight / pxPageHeight);

        // Define pageHeight separately so it can be trimmed on the final page.
        var pageHeight = innerPageHeight;

        // Create a one-page canvas to split up the full image.
        var pageCanvas = document.createElement("canvas");
        var pageCtx = pageCanvas.getContext("2d");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pxPageHeight;

        // Initialize the PDF.
        var pdf = new jsPDF("p", "in", [8.5, 11]);

        for (var page = 0; page < nPages; page++) {
          // Trim the final page to reduce file size.
          if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
            pageCanvas.height = pxFullHeight % pxPageHeight;
            pageHeight =
              (pageCanvas.height * innerPageWidth) / pageCanvas.width;
          }

          // Display the page.
          var w = pageCanvas.width;
          var h = pageCanvas.height;
          pageCtx.fillStyle = "white";
          pageCtx.fillRect(0, 0, w, h);
          pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

          // Add the page to the PDF.
          if (page > 0) pdf.addPage();
          debugger;
          var imgData = pageCanvas.toDataURL(
            "image/" + image.type,
            image.quality
          );
          pdf.addImage(
            imgData,
            image.type,
            margin[1],
            margin[0],
            innerPageWidth,
            pageHeight
          );
        }

        pdf.save(filename);
      }
    );
  };
  const viewpdf = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input, { useCORS: true, allowTaint: true, scrollY: 0 }).then(
      (canvas) => {
        const image = { type: "jpeg", quality: 0.98 };
        const margin = [0.5, 0.5];

        var imgWidth = 8.5;
        var pageHeight = 11;

        var innerPageWidth = imgWidth - margin[0] * 2;
        var innerPageHeight = pageHeight - margin[1] * 2;

        // Calculate the number of pages.
        var pxFullHeight = canvas.height;
        var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
        var nPages = Math.ceil(pxFullHeight / pxPageHeight);

        // Define pageHeight separately so it can be trimmed on the final page.
        var pageHeight = innerPageHeight;

        // Create a one-page canvas to split up the full image.
        var pageCanvas = document.createElement("canvas");
        var pageCtx = pageCanvas.getContext("2d");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pxPageHeight;

        // Initialize the PDF.
        var pdf = new jsPDF("p", "in", [8.5, 11]);

        for (var page = 0; page < nPages; page++) {
          // Trim the final page to reduce file size.
          if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
            pageCanvas.height = pxFullHeight % pxPageHeight;
            pageHeight =
              (pageCanvas.height * innerPageWidth) / pageCanvas.width;
          }

          // Display the page.
          var w = pageCanvas.width;
          var h = pageCanvas.height;
          pageCtx.fillStyle = "white";
          pageCtx.fillRect(0, 0, w, h);
          pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

          // Add the page to the PDF.
          if (page > 0) pdf.addPage();
          debugger;
          var imgData = pageCanvas.toDataURL(
            "image/" + image.type,
            image.quality
          );
          pdf.addImage(
            imgData,
            image.type,
            margin[1],
            margin[0],
            innerPageWidth,
            pageHeight
          );
        }
        window.open(pdf.output("bloburl"), "_blank");
      }
    );
  };

  const prescriptionPdf = () => {
    return (
      <div className="prescription-card-container" id="divToPrint">
        <div className="prescription-box">
          <div className="prescription-header ">
            <div className="w-75 mx-auto d-flex justify-content-between my-5 text-white">
              <div className="prescription-header-content p-lg-5 py-sm-5">
                <h1 className="font-weight-bold">Texas Hospital</h1>
                <h4 className="m-0 font-weight-bold">
                  G G Hospital, Pandit Nehru Marg - 361008
                </h4>
                <h4 className="m-0 mt-2">
                  <i class="far fa-envelope mr-2"></i>
                  healthhorizon.life@gmail.com
                </h4>
                <h4 className="m-0 mt-1">
                  <i class="far fa-address-book mr-2"></i>
                  02612541814
                </h4>
              </div>
              <div className="prescription-header-logo p-lg-5 d-flex justify-content-end">
                <img
                  src={PrescriptionLogo}
                  className="w-25"
                  alt="prescription-header-logo"
                />
              </div>
            </div>
          </div>
          <div className="w-75 mx-auto my-5 py-5 prescription-content-container">
            <hr></hr>
            <div className="prescription-doctor-content-container d-flex justify-content-between">
              <div className="prescription-doctor-content px-5 py-3">
                <h2 className="font-weight-bold prescription-doctor-name">
                  Dr. Minish Patel
                </h2>
                <h4 className="font-weight-bold">Neurologist</h4>
                <h4 className="mt-2 font-weight-bold">+91 9939778772</h4>
              </div>
              <div className="text-right px-5 py-3">
                <h4 className="font-weight-bold">Date : 19/03/2023</h4>
                <h4 className="mt-2 font-weight-bold">Monday</h4>
              </div>
            </div>
            <hr></hr>
            <div className="prescription-medicine-content-container my-4 py-5">
              <div className="prescription-medicine-content px-5 py-3">
                <p className="font-weight-bold h4 mb-4">
                  Paracetamol 500 mg [ 5 Tablets, Once a day ]
                </p>
              </div>
            </div>
            <div className="prescription-patient-details-container">
              <div className="prescription-patient-details px-5 pb-5 mb-5">
                <table className="table table-borderless m-0 p-0">
                  <tbody className="m-0 p-0">
                    <tr>
                      <th>Patient ID : </th>
                      <td>300214</td>
                    </tr>
                    <tr>
                      <th>Mr / Mrs / Ms : </th>
                      <td>Kaushal Navapara</td>
                    </tr>
                    <tr>
                      <th>Age : </th>
                      <td>20</td>
                    </tr>
                    <tr>
                      <th>Address :</th>
                      <td>A - 1202, Twin Tower, A K Road</td>
                    </tr>
                    <tr>
                      <th>Contact No : </th>
                      <td>+91 9876543210</td>
                    </tr>
                    <tr>
                      <th>Next Consultancy Date : </th>
                      <td>30/03/2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="prescriptionFooter">
          <PrescriptionFooter />
        </div>
      </div>
    );
  };
  return (
    <div className="prescription-table-container px-md-5 m-0 p-0">
      <div className="section-title pt-5 pb-4">
        <h2 className="text-center m-0 font-weight-bold">Prescriptions</h2>
      </div>
      <table className="table rounded table-stripped prescription-table">
        <thead>
          <tr className="text-light">
            <th className="pre-heading">Serial No</th>
            <th className="pre-heading">Hospital Name</th>
            <th className="pre-heading">Doctor Name</th>
            <th className="pre-heading">Prescription Date</th>
            <th className="pre-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-title="No">15</td>
            <td data-title="Hospital Name" className="break-line1">Apolo hospital</td>
            <td data-title="Doctor Name">Kyle Rivera</td>
            <td data-title="Appointment Date">
              11<sup>th</sup> December 2018
            </td>
            <td className="prescription-action">
              <IconButton aria-label="view" className="prescription-action-btn">
                <VisibilityIcon className="prescription-action-btn"/>
              </IconButton>
              <IconButton aria-label="view" className="prescription-action-btn">
                <DownloadIcon className="prescription-action-btn"/>
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
