import AxiosService from "../../../Services/AxiosServices.jsx";
import { UserUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const updatePatient = async (id, userCredentials, header) => {

    const patient = await axiosService.put(UserUrls.updateUser(id), userCredentials, header);

    if (patient.data || patient.response.data) {
        return patient.data || patient.response.data;
    }
}
export const fetchPrescription = async (id, header) => {

    const prescriptions = await axiosService.get(UserUrls.fetchPrescription(id), header);

    if (prescriptions.data || prescriptions.response.data) {
        return prescriptions.data || prescriptions.response.data;
    }
}
export const fetchTestReportsByUser = async (id, header) => {

    const testReportResponse = await axiosService.get(UserUrls.fetchTestReportsByUser(id), header);

    if (testReportResponse?.data || testReportResponse?.response?.data) {
        return testReportResponse?.data || testReportResponse?.response.data;
    }
}