import AxiosService from "../../../Services/AxiosServices.jsx";
import { LoginUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const login = async (loginCredentials) => {

    const user = await axiosService.post(LoginUrls.login(), loginCredentials);

    if (user.data || user.response.data) {
        return user.data || user.response.data;
    }
}