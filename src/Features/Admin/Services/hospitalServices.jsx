import AxiosService from "../../../Services/AxiosServices.jsx";
import { HospitalUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const addHospital = async (hospitalCredentials, header) => {

    const hospital = await axiosService.post(HospitalUrls.addHospital(), hospitalCredentials, header);

    if (hospital.data || hospital.response.data) {
        return hospital.data || hospital.response.data;
    }
}

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

export const deleteHospital = async (id, header) => {

    const hospitals = await axiosService.delete(HospitalUrls.deleteHospital(id), header);

    if (hospitals.data || hospitals.response.data) {
        return hospitals.data || hospitals.response.data;
    }
}

export const updateHospital = async (id, hospitalParams, header) => {

    const hospitals = await axiosService.post(HospitalUrls.updateHospital(id),hospitalParams, header);

    if (hospitals.data || hospitals.response.data) {
        return hospitals.data || hospitals.response.data;
    }
}