import AxiosService from "../../../Services/AxiosServices.jsx";
import { DoctorUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchDoctors = async (header) => {

    const doctor = await axiosService.get(DoctorUrls.fetchDoctors(), header);

    if (doctor.data || doctor.response.data) {
        return doctor.data || doctor.response.data;
    }
}

export const searchDoctor = async (searchingValue, header) => {

    const doctor = await axiosService.post(DoctorUrls.searchDoctor(), searchingValue, header);

    if (doctor.data || doctor.response.data) {
        return doctor.data || doctor.response.data;
    }
}
export const fetchDoctorById = async (id, header) => {

    const doctor = await axiosService.get(DoctorUrls.fetchDoctorById(id), header);

    if (doctor.data || doctor.response.data) {
        return doctor.data || doctor.response.data;
    }
}