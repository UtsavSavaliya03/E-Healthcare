import AxiosServices from '../../../Services/AxiosServices.jsx';
import { UserUrls } from '../../../Services/Urls.jsx';

const axiosServices = new AxiosServices;

export const findMe = async (userId, headers) => {
    var { data } = await axiosServices.get(UserUrls.findUser(userId), headers);
    return data;
}

export const changePassword = async (type, userParams, headers) => {

    const user = await axiosServices.post(UserUrls.changePassword(type), userParams, headers);

    if (user?.data || user?.response.data) {
        return user?.data || user?.response.data;
    }
}