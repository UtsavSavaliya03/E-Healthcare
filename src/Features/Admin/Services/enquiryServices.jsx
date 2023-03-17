import AxiosService from "../../../Services/AxiosServices.jsx";
import { EnquiryUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchEnquiry = async (header, query) => {

    const enquiry = await axiosService.get(EnquiryUrls.fetchEnquiry(query), header);

    if (enquiry.data || enquiry.response.data) {
        return enquiry.data || enquiry.response.data;
    }
}

export const replyEnquiry = async (replyObject, header) => {

    const enquiry = await axiosService.post(EnquiryUrls.replyEnquiry(), replyObject, header);

    if (enquiry.data || enquiry.response.data) {
        return enquiry.data || enquiry.response.data;
    }
}