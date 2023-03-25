import AxiosService from "../../../Services/AxiosServices.jsx";
import { InquiryUrls, NewsletterUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const inquiry = async (inquiryParams) => {

    const inquiry = await axiosService.post(InquiryUrls.inquiry(), inquiryParams);

    if (inquiry.data || inquiry.response.data) {
        return inquiry.data || inquiry.response.data;
    }
}

export const newsletter = async (newsletterParams) => {

    const newsletter = await axiosService.post(NewsletterUrls.subscribe(), newsletterParams);

    if (newsletter.data || newsletter.response.data) {
        return newsletter.data || newsletter.response.data;
    }
}