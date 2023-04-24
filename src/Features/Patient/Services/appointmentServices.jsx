import AxiosService from "../../../Services/AxiosServices.jsx";
import { AppointmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const bookAppointment = async (params, header) => {

    const appoinment = await axiosService.post(AppointmentUrls.bookAppointment(), params, header);

    if (appoinment?.data || appoinment?.response?.data) {
        return appoinment?.data || appoinment?.response?.data;
    }
}
export const fetchAppointmentsByUser = async (id, header) => {

    const appointmentsResponse = await axiosService.get(AppointmentUrls.fetchAppointmentsByUser(id), header);

    if (appointmentsResponse?.data || appointmentsResponse?.response?.data) {
        return appointmentsResponse?.data || appointmentsResponse?.response.data;
    }
}
export const fetchAppointmentsByDate = async (params, header) => {

    const appointmentsResponse = await axiosService.post(AppointmentUrls.fetchAppointmentsByDate(), params, header);

    if (appointmentsResponse?.data || appointmentsResponse?.response?.data) {
        return appointmentsResponse?.data || appointmentsResponse?.response.data;
    }
}
export const fetchNonEmptyAppointmentSlots = async (params, header) => {

    const appointmentsResponse = await axiosService.post(AppointmentUrls.fetchNonEmptyAppointmentSlots(), params, header);

    if (appointmentsResponse?.data || appointmentsResponse?.response?.data) {
        return appointmentsResponse?.data || appointmentsResponse?.response.data;
    }
}