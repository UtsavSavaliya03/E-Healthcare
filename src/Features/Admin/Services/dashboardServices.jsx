import AxiosService from "../../../Services/AxiosServices.jsx";
import { ServicesUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchAdminDashboardData = async (header) => {

    const  adminDashboardData= await axiosService.get(ServicesUrls.fetchAdminDashboardData(), header);

    if (adminDashboardData?.data || adminDashboardData?.response.data) {
        return adminDashboardData?.data || adminDashboardData?.response.data;
    }
}