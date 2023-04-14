import AxiosService from "../../../Services/AxiosServices.jsx";
import { TestRequestUrls, TestReportUrls, ServicesUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchTestRequestsByStatus = async (params, header) => {

    const testRequestResponse = await axiosService.post(TestRequestUrls.fetchTestRequestsByStatus(),params,  header);

    if (testRequestResponse?.data || testRequestResponse?.response?.data) {
        return testRequestResponse?.data || testRequestResponse?.response.data;
    }
}

export const updateTestRequestsById = async (id, status, header) => {

    const testRequestResponse = await axiosService.put(TestRequestUrls.updateTestRequestsById(id), status, header);

    if (testRequestResponse?.data || testRequestResponse?.response?.data) {
        return testRequestResponse?.data || testRequestResponse?.response.data;
    }
}

export const searchPatients = async (patientId, header) => {

    const patients = await axiosService.get(TestRequestUrls.searchPatients(patientId), header);

    if (patients.data || patients.response.data) {
        return patients.data || patients.response.data;
    }
}

export const addTestReport = async (reportCredentials, header) => {

    const report = await axiosService.post(TestReportUrls.addTestReport(), reportCredentials, header);

    if (report.data || report.response.data) {
        return report.data || report.response.data;
    }
}

export const fetchTestReportsByLaboratory = async (id, header) => {

    const testReportResponse = await axiosService.get(TestReportUrls.fetchTestReportsByLaboratory(id), header);

    if (testReportResponse?.data || testReportResponse?.response?.data) {
        return testReportResponse?.data || testReportResponse?.response.data;
    }
}

export const fetchLaboratoryReportData = async (id, header) => {

    const testReportResponse = await axiosService.get(ServicesUrls.fetchLaboratoryReportData(id), header);

    if (testReportResponse?.data || testReportResponse?.response?.data) {
        return testReportResponse?.data || testReportResponse?.response.data;
    }
}