import React from "react";
import "./Prescription.css";
import PrescriptionLogo from "../../../../Assets/Icons/Prescription-logo.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PrescriptionFooter from "./Components/PrescriptionFooter.jsx";

export default function Prescription() {
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#divToPrint"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save("Prescription.pdf");

    window.open(pdf.output("bloburl"), "_blank");
  };
  return (
    <>
      <button onClick={createPDF}>Print</button>
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
            <div className="prescription-medicine-content-container my-5 py-5">
              <div className="prescription-medicine-content px-5 py-3">
                <p className="font-weight-bold h4 mb-4">
                  Paracetamol 500 mg [ 5 Tablets, Once a day ]
                </p>
                <p className="font-weight-bold h4 mb-4">
                  Acetaminophen 1000 mg [ 12 Tablets, Thrice a day ]
                </p>
                <p className="font-weight-bold h4 mb-4">
                  Bismuth subsalicylate 600 mg [ 2 Tablets, Once a day, After
                  meal ]
                </p>
              </div>
            </div>
            <div className="prescription-patient-details-container">
              <div className="prescription-patient-details px-5">
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
    </>
  );
}
