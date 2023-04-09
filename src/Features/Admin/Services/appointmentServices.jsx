import AxiosService from "../../../Services/AxiosServices.jsx";
import { AppointmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchAppointments = async (header) => {

    const appointments = await axiosService.get(AppointmentUrls.fetchAppointments(), header);

    if (appointments?.data || appointments?.response.data) {
        return appointments?.data || appointments?.response.data;
    }
}