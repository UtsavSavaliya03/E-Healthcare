import AxiosService from "../../../Services/AxiosServices.jsx";
import { EnquiryUrls, NewsletterUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const enquiry = async (enquiryParams) => {

    const enquiry = await axiosService.post(EnquiryUrls.enquiry(), enquiryParams);

    if (enquiry.data || enquiry.response.data) {
        return enquiry.data || enquiry.response.data;
    }
}

export const newsletter = async (newsletterParams) => {

    const newsletter = await axiosService.post(NewsletterUrls.subscribe(), newsletterParams);

    if (newsletter.data || newsletter.response.data) {
        return newsletter.data || newsletter.response.data;
    }
}