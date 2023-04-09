import React, { Component } from 'react';
import "./TestReportDownloader.css";
import PrescriptionLogo from "../../../Assets/Icons/Prescription-logo.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import TestReportFooter from "./Components/TestReportFooter.jsx";
import moment from 'moment';
import { BloodGlucoseData, CompeleteBloodCellData, UrinalysisData, ElectrolyteData, LipidProfileData } from '../../../Constant/TestReport/TestReportDetails.jsx';

export default class TestReportDownloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: this.props?.reportData?.patient || {},
            doctor: this.props?.reportData?.doctor || {},
            laboratory: this.props?.reportData?.laboratory || {},
            reportRecords: this.props?.reportData?.reportInformation || {},
            reportDate: this.props?.reportData?.createdAt || {},
            reportType: this.props?.reportData?.type || {},
            normalrange: []
        };
    }


    viewPdf = (id) => {
        const input = document.getElementById(`divToPrint-${id}`);
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
                    var imgData = pageCanvas.toDataURL(
                        "image/" + image.type,
                        image.quality
                    );
                    pdf.addImage(
                        imgData,
                        image.type,
                        margin[0],
                        margin[0],
                        innerPageWidth,
                        pageHeight
                    );
                }
                window.open(pdf.output("bloburl"), "_blank");
            }
        );
    }

    downloadPdf = (id, fileName) => {
        const input = document.getElementById(`divToPrint-${id}`);
        html2canvas(input, { useCORS: true, allowTaint: true, scrollY: 0 }).then(
            (canvas) => {
                const image = { type: "jpeg", quality: 0.98 };
                const margin = [0.5, 0.5];
                const filename = fileName || "Prescription.pdf";

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


    displayNormalRange = () => {
        switch (this.state.reportType) {
            case "Urinalysis":
                this.setState({ normalrange: UrinalysisData })
                break;
            case "Electrolyte":
                this.setState({ normalrange: UrinalysisData })
                break;
            case "Lipid Profile":
                this.setState({ normalrange: LipidProfileData })
                break;
            case "Blood Glucose":
                this.setState({ normalrange: BloodGlucoseData })
                break;
            case "Compelete Blood Count":
                this.setState({ normalrange: CompeleteBloodCellData })
                break;
        }
    }

    componentDidMount = () => {
        this.displayNormalRange()
    }
    render() {
        const reportRecordInformation = Object.keys(this.state.reportRecords)
        const normalrange = [];

        return (
            <div className="report-card-container" id={`divToPrint-${this.props?.reportData?._id}`}>
                <div className="prescription-box">
                    <div className="prescription-header ">
                        <div className="px-lg-5 mx-auto d-flex justify-content-between text-white">
                            <div className="prescription-header-content p-lg-5 py-sm-5 pl-lg-0">
                                <h1 className="font-weight-bold break-line-1">{this?.state?.laboratory?.name}</h1>
                                <h4 className="m-0 font-weight-bold break-line-1">
                                    {`${this?.state?.laboratory?.addressLine}, ${this?.state?.laboratory?.city?.name}, ${this?.state?.laboratory?.state?.name}.`}
                                </h4>
                                <h4 className="m-0 mt-2">
                                    <i class="far fa-envelope mr-3"></i>
                                    {this?.state?.laboratory?.email}
                                </h4>
                                <h4 className="m-0 mt-1">
                                    <i class="far fa-address-book mr-3"></i>
                                    +91 {this?.state?.laboratory?.mobileNo}
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
                    <div className="mx-auto py-4 prescription-content-container">
                        <hr className='m-0' /><hr className='m-0' />
                        <div className="prescription-patient-content-container d-flex justify-content-between px-4 py-3">
                            <div className="prescription-patient-content">
                                <table className="table table-borderless m-0 p-0">
                                    <tbody className="m-0 p-0">
                                        <tr>
                                            <th>Patient ID : </th>
                                            <td>{this?.state?.patient?.patientId}</td>
                                        </tr>
                                        <tr>
                                            <th>Mr / Mrs / Ms : </th>
                                            <td>{`${this?.state?.patient?.fName} ${this?.state?.patient?.lName}`}</td>
                                        </tr>
                                        <tr>
                                            <th>Age : </th>
                                            <td>{this?.state?.patient?.age}</td>
                                        </tr>
                                        <tr>
                                            <th>Address :</th>
                                            <td className='break-line-1'>{this?.state?.patient?.addressLine}</td>
                                        </tr>
                                        <tr>
                                            <th>Contact No : </th>
                                            <td>+91 {this?.state?.patient?.mobileNo}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-right">
                                <h5 className="text-muted">{this.state.reportDate ? moment(this?.state?.reportDate).format('LLLL') : null}</h5>
                            </div>
                        </div>
                        <hr className='m-0' /><hr className='m-0' />
                        <div className="prescription-medicine-content-container mt-5 mb-4 p-5 d-flex justify-content-between">
                            <table className="table-borderless">
                                <h2 className='text-blue mb-4'>Test Report Information</h2>
                                <tbody>
                                    {
                                        reportRecordInformation?.map((key, index) => {
                                            const field = key.charAt(0).toLowerCase() + key.slice(1)
                                            
                                            return (<tr>
                                                <th className="font-weight-bold text-blue report-field-name h2">{field}</th>
                                                <td className='report-field-value text-dark'>{this.state.reportRecords[field]}</td>
                                            </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </table>
                            <table className="table-borderless">
                                <h2 className='text-blue mb-4'>Normal Range</h2>
                                <tbody>
                                    {this.state.normalrange?.map((data, index) => {
                                        return (<tr>
                                            <td className='text-center text-secondary report-field-value'>{data.value}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <hr className='m-0' /><hr className='m-0' />
                        <div className="prescription-patient-details px-4 py-3">
                            <table className="table table-borderless m-0 p-0">
                                <tbody className="m-0 p-0">
                                    <tr>
                                        <h2 className="d-inline font-weight-bold prescription-doctor-name m-0">{`Dr. ${this.state?.doctor?.fName} ${this.state?.doctor?.lName}`}</h2>

                                    </tr>
                                    <tr>
                                        <h5 className="mt-2 text-muted break-line-1">{this.state?.doctor?.hospital?.name}</h5>
                                    </tr>
                                    <tr>
                                        <h5 className="mt-3 text-muted">+91 {this.state?.doctor?.mobileNo}</h5>
                                    </tr>
                                    <tr>
                                        <h5 className="m-0 text-muted email">{this.state?.doctor?.email}</h5>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className="prescriptionFooter">
                    <TestReportFooter />
                </div>
            </div>
        )
    }
}