import AxiosService from "../../../Services/AxiosServices.jsx";
import { PrescriptionUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const addPrescription = async (prescription, header) => {

    const prescriptionResponse = await axiosService.post(PrescriptionUrls.addPrescription(), prescription, header);

    if (prescriptionResponse.data || prescriptionResponse.response.data) {
        return prescriptionResponse.data || prescriptionResponse.response.data;
    }
}