import AxiosService from "../../../Services/AxiosServices.jsx";
import { PrescriptionUrls, LaboratoryUrls, TestRequestUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const addPrescription = async (prescription, header) => {

    const prescriptionResponse = await axiosService.post(PrescriptionUrls.addPrescription(), prescription, header);

    if (prescriptionResponse?.data || prescriptionResponse?.response?.data) {
        return prescriptionResponse?.data || prescriptionResponse?.response.data;
    }
}

export const fetchPrescription = async (id, header) => {

    const prescriptionResponse = await axiosService.get(PrescriptionUrls.fetchPrescription(id), header);

    if (prescriptionResponse?.data || prescriptionResponse?.response?.data) {
        return prescriptionResponse?.data || prescriptionResponse?.response.data;
    }
}

export const fetchLaboratoryByPincode = async (pincode, header) => {

    const laboratories = await axiosService.get(LaboratoryUrls.fetchLaboratoryByPincode(pincode), header);

    if (laboratories.data || laboratories.response.data) {
        return laboratories.data || laboratories.response.data;
    }
}

export const addTestRequest = async (testRequestCredential, header) => {

    const testRequest = await axiosService.post(TestRequestUrls.addTestRequest(), testRequestCredential, header);

    if (testRequest.data || testRequest.response.data) {
        return testRequest.data || testRequest.response.data;
    }
}