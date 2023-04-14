import AxiosService from "../../../Services/AxiosServices.jsx";
import { LaboratoryUrls } from '../../../Services/Urls.jsx';


const axiosService = new AxiosService();

export const addLaboratory = async (laboratoryCredentials, header) => {

    const laboratory = await axiosService.post(LaboratoryUrls.addLaboratory(), laboratoryCredentials, header);

    if (laboratory.data || laboratory.response.data) {
        return laboratory.data || laboratory.response.data;
    }
}
export const fetchLaboratories = async (header) => {

    const laboratory = await axiosService.get(LaboratoryUrls.fetchLaboratories(), header);

    if (laboratory.data || laboratory.response.data) {
        return laboratory.data || laboratory.response.data;
    }
}
export const fetchLaboratoryById = async (id, header) => {

    const laboratory = await axiosService.get(LaboratoryUrls.fetchLaboratoryById(id), header);

    if (laboratory.data || laboratory.response.data) {
        return laboratory.data || laboratory.response.data;
    }
}
export const deleteLaboratoryById = async (id, header) => {

    const laboratory = await axiosService.delete(LaboratoryUrls.deleteLaboratoryById(id), header);

    if (laboratory.data || laboratory.response.data) {
        return laboratory.data || laboratory.response.data;
    }
}

export const searchLaboratories = async (laboratoryCredentials, header) => {

    const laboratory = await axiosService.post(LaboratoryUrls.searchLaboratories(), laboratoryCredentials, header);

    if (laboratory.data || laboratory.response.data) {
        return laboratory.data || laboratory.response.data;
    }
}

export const updateLaboratories = async (id, laboratoryCredentials, header) => {

    const laboratory = await axiosService.post(LaboratoryUrls.updateLaboratory(id), laboratoryCredentials, header);

    if (laboratory.data || laboratory.response.data) {
        return laboratory.data || laboratory.response.data;
    }
}
