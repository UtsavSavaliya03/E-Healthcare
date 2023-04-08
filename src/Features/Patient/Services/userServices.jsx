import AxiosService from "../../../Services/AxiosServices.jsx";
import { UserUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const updatePatient = async (id, userCredentials, header) => {

    const patient = await axiosService.put(UserUrls.updateUser(id), userCredentials, header);

    if (patient.data || patient.response.data) {
        return patient.data || patient.response.data;
    }
}