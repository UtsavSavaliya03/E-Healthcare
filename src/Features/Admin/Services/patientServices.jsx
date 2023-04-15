import AxiosService from "../../../Services/AxiosServices.jsx";
import { PatientsUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchPatients = async (header) => {

    const patients = await axiosService.get(PatientsUrls.fetchPatients(), header);

    if (patients.data || patients.response.data) {
        return patients.data || patients.response.data;
    }
}

export const searchPatients = async (patientId, header) => {

    const patients = await axiosService.get(PatientsUrls.searchPatients(patientId), header);

    if (patients.data || patients.response.data) {
        return patients.data || patients.response.data;
    }
}

export const updateUserStatus = async (statusInfo, header) => {

    const patients = await axiosService.post(PatientsUrls.updateUserStatus(),statusInfo, header);

    if (patients.data || patients.response.data) {
        return patients.data || patients.response.data;
    }
}