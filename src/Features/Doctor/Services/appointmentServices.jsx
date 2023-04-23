import AxiosService from "../../../Services/AxiosServices.jsx";
import { AppointmentUrls, ServicesUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchAppointmentsByStatus = async (params, header) => {

    const appointmentResponse = await axiosService.post(AppointmentUrls.fetchAppointmentsByStatus(), params, header);

    if (appointmentResponse?.data || appointmentResponse?.response?.data) {
        return appointmentResponse?.data || appointmentResponse?.response.data;
    }
}
export const updateAppointmentById = async (id, status, header) => {

    const appointmentResponse = await axiosService.put(AppointmentUrls.updateAppointmentById(id), status, header);

    if (appointmentResponse?.data || appointmentResponse?.response?.data) {
        return appointmentResponse?.data || appointmentResponse?.response.data;
    }
}
export const fetchDoctorPatientsData = async (id, header) => {

    const patientsResponse = await axiosService.get(ServicesUrls.fetchDoctorPatientsData(id), header);

    if (patientsResponse?.data || patientsResponse?.response?.data) {
        return patientsResponse?.data || patientsResponse?.response.data;
    }
}
export const fetchAppointmentsByDoctor = async (id, header) => {

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