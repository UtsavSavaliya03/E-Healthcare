import AxiosService from "../../../Services/AxiosServices.jsx";
import { EnquiryUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const enquiry = async (enquiryCredentials) => {

    const enquiry = await axiosService.post(EnquiryUrls.enquiry(), enquiryCredentials);

    if (enquiry.data || enquiry.response.data) {
        return enquiry.data || enquiry.response.data;
    }
}