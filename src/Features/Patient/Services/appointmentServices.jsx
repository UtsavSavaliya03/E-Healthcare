import AxiosService from "../../../Services/AxiosServices.jsx";
import { AppointmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const bookAppointment = async (params, header) => {

    const appoinment = await axiosService.post(AppointmentUrls.bookAppointment(), params, header);

    if (appoinment?.data || appoinment?.response?.data) {
        return appoinment?.data || appoinment?.response?.data;
    }
}