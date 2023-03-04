import AxiosService from "../../../Services/AxiosServices.jsx";
import { PasswordUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const sendOtp = async (userCredentials) => {

    const user = await axiosService.post(PasswordUrls.sendOtp(), userCredentials);

    if (user.data || user.response.data) {
        return user.data || user.response.data;
    }
}

export const recoverPassword = async (userCredentials) => {

    const user = await axiosService.post(PasswordUrls.recoverPassword(), userCredentials);

    if (user.data || user.response.data) {
        return user.data || user.response.data;
    }
}