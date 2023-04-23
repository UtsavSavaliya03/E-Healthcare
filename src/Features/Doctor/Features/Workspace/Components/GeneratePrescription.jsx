import React, { useEffect, useState } from "react";
import "./GeneratePrescription.css";
import { useFormik } from "formik";
import {
    doseData,
    intakeTimeData,
    medicinesData
} from "../../../../../Constant/Prescription/PrescriptionDetails.jsx";
import { TextField, MenuItem } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Notificaion from "../../../../../Components/Common/Notification/Notification.jsx";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import MedicineModal from "./MedicineModal";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { addPrescription, fetchLaboratoryByPincode, addTestRequest } from "../../../Services/prescriptionServices.jsx";
import { updateAppointmentById } from "../../../Services/appointmentServices.jsx";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../../Store/globalState.jsx";
import { testTypeData } from "../../../../../Constant/TestReport/TestReportDetails.jsx"

export default function GeneratePrescription(props) {

    const { patient } = props;
    const doctor = useRecoilValue(userState);
    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;
    const [medicineData, setMedicineData] = useState([]);
    const [editMedicine, setEditMedicine] = useState();
    const [laboratories, setLaboratories] = useState([]);

    const getUniqueListBy = (arr, key) => {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
    };

    const handleMedicineData = (medicine) => {
        setMedicineData(async (current) => [...current, medicine]);
        setMedicineData(getUniqueListBy([...medicineData, medicine], "name"));
    };

    const onchangeHandler = (event) => {
        setEditMedicine((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    };

    const fetchLaboratories = async () => {
        const headers = {
            'Authorization': token
        }
        const availableLaboratories = await fetchLaboratoryByPincode(patient.pincode, headers)
        setLaboratories(availableLaboratories?.data)
    }

    useEffect(() => {
        if (!patient) {
            navigate(-1);
        }

        fetchLaboratories();

        return () => {
            setMedicineData([]);
        };
    }, []);

    const removeMedicine = (id) => {
        let updatedArray = medicineData?.filter((medicine) => {
            if (medicine?.id !== id) {
                return medicine;
            }
        });
        setMedicineData(updatedArray);
    };

    const editMedicineHandler = (medicine) => {
        setEditMedicine(medicine);
    };

    const initialValues = {
        testType: "None",
        laboratory: "",
        suggestion: "",
        nextVisitDate: "",
    };

    const PrescriptionSchema = Yup.object().shape({
        testType: Yup.string().trim(),
        laboratory: Yup.string().trim(),
        suggestion: Yup.string().trim(),
        nextVisitDate: Yup.date().min(
            moment(new Date()).format("YYYY-MM-DD"),
            "Date must be later than today's date"
        ),
    });

    const submitHandler = async (values) => {
        if (values?.testType !== 'None' || values?.laboratory !== '') {
            const testRequestData = {
                patient: patient?._id,
                doctor: doctor?._id,
                laboratory: values?.laboratory,
                type: values?.testType
            }
            const headers = {
                'Authorization': token,
            };
            await addTestRequest(testRequestData, headers);
        }

        const params = {
            patient: patient?._id,
            doctor: doctor?._id,
            medicines: medicineData,
            suggestion: values?.suggestion,
            nextVisitDate: values?.nextVisitDate == "" ? null : values?.nextVisitDate,
        };

        const headers = {
            'Authorization': token,
        };

        const prescription = await addPrescription(params, headers);
        notification.notify(prescription?.status, prescription?.message);
        if (prescription?.status) {

            if (props.appointmentId) {
                const param = {
                    status: 2
                }
                const headers = {
                    'Authorization': token
                }

                await updateAppointmentById(props.appointmentId, param, headers);
            }
            navigate('/doctor/prescriptions');
        }
    };

    const editHandler = () => {
        let updateMedicineData = medicineData?.map((medicine) => {
            if (medicine?.id === editMedicine?.id) {
                return editMedicine;
            } else {
                return medicine;
            }
        });
        setEditMedicine(null);
        setMedicineData(getUniqueListBy(updateMedicineData, "name"));
    };

    const AddPrescriptionForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: PrescriptionSchema,
            onSubmit: (values) => {
                submitHandler(values);
            },
        });

        return (
            <div className="px-2">
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="body-title py-3 px-3">
                        <h5>Test Information</h5>
                        <div className="horizontal-bar"></div>
                    </div>
                    <div className="row px-3 my-md-1">
                        <div className="col-sm-6 col-md-4 my-3 my-md-0">
                            <TextField
                                className="w-100"
                                name="testType"
                                label="Test Type"
                                select
                                value={formik.values.testType}
                                error={
                                    formik.touched.testType &&
                                    Boolean(formik.errors.testType)
                                }
                                onChange={formik.handleChange}
                            >
                                {testTypeData?.map((testType, index) => (
                                    <MenuItem key={index} value={testType?.value}>
                                        {testType?.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div className="add-doctor-error-message text-right mr-1">
                                {formik.touched.testType ? formik.errors.testType : null}
                            </div>
                        </div>
                        {formik.values.testType !== 'None' &&
                            <div className="col-sm-6 col-md-4 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="laboratory"
                                    label="Laboratory"
                                    select
                                    value={formik.values.laboratory}
                                    error={
                                        formik.touched.laboratory &&
                                        Boolean(formik.errors.laboratory)
                                    }
                                    onChange={formik.handleChange}
                                >
                                    {laboratories?.map((laboratory, index) => (
                                        <MenuItem key={index} value={laboratory?._id}>
                                            {laboratory?.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.laboratory ? formik.errors.laboratory : null}
                                </div>
                            </div>}
                    </div>
                    <div className="body-title py-3 px-3">
                        <h5>Additional Suggestion</h5>
                        <div className="horizontal-bar"></div>
                    </div>
                    <div className="row px-3 my-md-1">
                        <div className="col-12 my-3 my-md-0">
                            <TextField
                                multiline
                                rows={5}
                                className="w-100"
                                name="suggestion"
                                label="Suggestion"
                                value={formik.values.suggestion}
                                error={
                                    formik.touched.suggestion && Boolean(formik.errors.suggestion)
                                }
                                onChange={formik.handleChange}
                            />
                            <div className="add-hospital-error-message text-right mr-1">
                                {formik.touched.suggestion ? formik.errors.suggestion : null}
                            </div>
                        </div>
                    </div>
                    <div className="row px-3 my-md-1">
                        <div className="col-md-3">
                            <TextField
                                type="date"
                                className="w-100 date-input"
                                name="nextVisitDate"
                                label="Next Visit"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.nextVisitDate}
                                error={
                                    formik.touched.nextVisitDate &&
                                    Boolean(formik.errors.nextVisitDate)
                                }
                                onChange={formik.handleChange}
                            />
                            <div className="add-doctor-error-message text-right mr-1">
                                {formik.touched.nextVisitDate
                                    ? formik.errors.nextVisitDate
                                    : null}
                            </div>
                        </div>
                    </div>

                    <div className="w-100 text-right px-4">
                        <button
                            className="btn-create-department"
                            type="submit"
                            disabled={medicineData?.length < 1 ? true : false}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div>
            <div className="add-prescription-container px-4">
                <div className="add-prescription-card pb-4">
                    <div className="add-prescription-header px-0">
                        <h3 className="m-0 py-4 px-3 text-blue">Add Prescription</h3>
                        <hr className="m-0" />
                    </div>

                    <div className="row px-4 my-md-1">
                        <div className="col-12 body-title pt-3 pb-4 px-3">
                            <h5>Patient Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                            <p>
                                Name:{" "}
                                <span className="text-blue ml-2">{`${patient?.fName} ${patient?.lName}`}</span>
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                            <p>
                                Age: <span className="text-blue ml-2">{patient?.age}</span>
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                            <p>
                                Contact:{" "}
                                <span className="text-blue ml-2">+91 {patient?.mobileNo}</span>
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                            <p>
                                Address:{" "}
                                <span className="text-blue ml-2">{patient?.addressLine}</span>
                            </p>
                        </div>
                    </div>

                    <div className="px-4 my-md-2">
                        <div className="body-title pt-3 pb-4">
                            <h5>Medicine Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div>
                            {medicineData?.length > 0 ? (
                                <div className="row px-3">
                                    <table className="w-100 table">
                                        <thead className="text-blue">
                                            <tr>
                                                <th>Medicine Name</th>
                                                <th>Medicine Quantity</th>
                                                <th>Medicine Dose</th>
                                                <th>Intake Time</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicineData?.map((medicine, index) => (
                                                <>
                                                    {medicine?.id === editMedicine?.id ? (
                                                        <tr
                                                            key={index}
                                                            className="align-items-center edit-medicine-container"
                                                        >
                                                            <td className="pb-2">
                                                                <TextField
                                                                    autoComplete="off"
                                                                    type="text"
                                                                    className="w-100"
                                                                    name="name"
                                                                    variant="outlined"
                                                                    select
                                                                    value={editMedicine?.name}
                                                                    onChange={(e) => onchangeHandler(e)}
                                                                    InputProps={{
                                                                        inputProps: { min: 0 },
                                                                    }}
                                                                > {
                                                                        medicinesData?.map((medicine, index) => (
                                                                            <MenuItem key={index} value={medicine?.value}>{medicine?.label}</MenuItem>
                                                                        ))
                                                                    }</TextField>
                                                            </td>
                                                            <td className="pb-2">
                                                                <TextField
                                                                    autoComplete="off"
                                                                    type="number"
                                                                    className="w-100"
                                                                    name="qty"
                                                                    variant="outlined"
                                                                    value={editMedicine?.qty}
                                                                    onChange={(e) => onchangeHandler(e)}
                                                                    InputProps={{
                                                                        inputProps: { min: 0 },
                                                                    }}
                                                                />
                                                            </td>
                                                            <td className="pb-2">
                                                                <TextField
                                                                    select
                                                                    className="w-100"
                                                                    name="dose"
                                                                    variant="outlined"
                                                                    value={editMedicine?.dose}
                                                                    onChange={(e) => onchangeHandler(e)}
                                                                >
                                                                    {doseData?.map((dose, index) => (
                                                                        <MenuItem key={index} value={dose?.value}>
                                                                            {dose?.label}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </td>
                                                            <td className="pb-2">
                                                                <TextField
                                                                    select
                                                                    className="w-100"
                                                                    name="time"
                                                                    variant="outlined"
                                                                    value={editMedicine?.time}
                                                                    onChange={(e) => onchangeHandler(e)}
                                                                >
                                                                    {intakeTimeData?.map((time, index) => (
                                                                        <MenuItem key={index} value={time?.value}>
                                                                            {time?.label}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </td>
                                                            <td className="pb-2">
                                                                <IconButton
                                                                    className={`${editMedicine?.name?.length < 1 ||
                                                                        parseInt(editMedicine?.qty) < 1
                                                                        ? "btn-remove-medicine"
                                                                        : "btn-add-medicine"
                                                                        }`}
                                                                    size="small"
                                                                    onClick={editHandler}
                                                                    disabled={
                                                                        editMedicine?.name?.length < 1 ||
                                                                            parseInt(editMedicine?.qty) < 1
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    <DoneIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <tr key={index} className="align-items-center">
                                                            <td className="pb-1">{medicine?.name}</td>
                                                            <td className="pb-1">{medicine?.qty}</td>
                                                            <td className="pb-1">{medicine?.dose}</td>
                                                            <td className="pb-1">{medicine?.time}</td>
                                                            <td className="py-2">
                                                                <IconButton
                                                                    className="btn-edit-medicine"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        editMedicineHandler(medicine);
                                                                    }}
                                                                >
                                                                    <ModeEditOutlineIcon fontSize="inherit" />
                                                                </IconButton>
                                                                <IconButton
                                                                    className="btn-remove-medicine ml-3"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        removeMedicine(medicine?.id);
                                                                    }}
                                                                >
                                                                    <CloseIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="w-100 text-right text-danger pr-3">
                                    Add Medicines
                                </div>
                            )}
                        </div>
                    </div>
                    <MedicineModal addMedicine={handleMedicineData} />
                    <AddPrescriptionForm />
                </div>
            </div>
        </div>
    );
}
