import AxiosService from "../../../Services/AxiosServices.jsx";
import { HospitalUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchHospitals = async (header) => {

    const hospitals = await axiosService.get(HospitalUrls.fetchHospital(), header);

    if (hospitals.data || hospitals.response.data) {
        return hospitals.data || hospitals.response.data;
    }
}

export const searchHospitals = async (hospitalCredentials, header) => {

    const hospitals = await axiosService.post(HospitalUrls.searchHospitals(), hospitalCredentials, header);

    if (hospitals.data || hospitals.response.data) {
        return hospitals.data || hospitals.response.data;
    }
}

export const fetchHospitalById = async (id, header) => {

    const hospitals = await axiosService.get(HospitalUrls.fetchHospitalById(id), header);

    if (hospitals.data || hospitals.response.data) {
        return hospitals.data || hospitals.response.data;
    }
}