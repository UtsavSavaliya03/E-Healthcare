import AxiosService from "../../../Services/AxiosServices.jsx";
import { NewsletterUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const sendMail = async (emailContent,header) => {

    const mailResponse = await axiosService.post(NewsletterUrls.sendMail(),emailContent, header);

    if (mailResponse.data || mailResponse.response.data) {
        return mailResponse.data || mailResponse.response.data;
    }
}

