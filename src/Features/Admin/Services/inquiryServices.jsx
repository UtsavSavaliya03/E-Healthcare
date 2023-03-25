import AxiosService from "../../../Services/AxiosServices.jsx";
import { InquiryUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchInquiry = async (header, query) => {

    const inquiry = await axiosService.get(InquiryUrls.fetchInquiry(query), header);

    if (inquiry.data || inquiry.response.data) {
        return inquiry.data || inquiry.response.data;
    }
}

export const replyInquiry = async (replyObject, header) => {

    const inquiry = await axiosService.post(InquiryUrls.replyInquiry(), replyObject, header);

    if (inquiry.data || inquiry.response.data) {
        return inquiry.data || inquiry.response.data;
    }
}

export const deleteInquiry = async (id, header) => {

    const inquiry = await axiosService.delete(InquiryUrls.deleteInquiry(id), header);

    if (inquiry.data || inquiry.response.data) {
        return inquiry.data || inquiry.response.data;
    }
}