import AxiosService from "../../../Services/AxiosServices.jsx";
import { AppointmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchAppointmentsByStatus = async (params, header) => {

    const appointmentResponse = await axiosService.post(AppointmentUrls.fetchAppointmentsByStatus(),params, header);

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

    const patientsResponse = await axiosService.get(AppointmentUrls.fetchDoctorPatientsData(id), header);

    if (patientsResponse?.data || patientsResponse?.response?.data) {
        return patientsResponse?.data || patientsResponse?.response.data;
    }
}