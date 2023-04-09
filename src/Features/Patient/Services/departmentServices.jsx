import AxiosService from "../../../Services/AxiosServices.jsx";
import { DepartmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchActiveDepartments = async (header) => {

    const departments = await axiosService.get(DepartmentUrls.fetchActiveDepartment(), header);

    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}