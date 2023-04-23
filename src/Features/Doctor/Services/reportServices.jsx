import AxiosService from "../../../Services/AxiosServices.jsx";
import { TestReportUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchTestReportsByDoctor = async (id, header) => {

    const testReportResponse = await axiosService.get(TestReportUrls.fetchTestReportsByDoctor(id), header);

    if (testReportResponse?.data || testReportResponse?.response?.data) {
        return testReportResponse?.data || testReportResponse?.response.data;
    }
}