import AxiosService from "../../../Services/AxiosServices.jsx";
import { LoginUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const login = async (type, loginCredentials) => {

    const user = await axiosService.post(LoginUrls.login(type), loginCredentials);

    if (user?.data || user?.response?.data) {
        return user?.data || user?.response?.data;
    }
}

export const doctorLogin = async (loginCredentials) => {

    const user = await axiosService.post(LoginUrls.doctorLogin(), loginCredentials);

    if (user?.data || user?.response?.data) {
        return user?.data || user?.response?.data;
    }
}