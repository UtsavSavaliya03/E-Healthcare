import AxiosService from "../../../Services/AxiosServices.jsx";
import { DepartmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const addDepartment = async (departmentCredentials, header) => {

    const department = await axiosService.post(DepartmentUrls.addDepartment(), departmentCredentials, header);

    if (department.data || department.response.data) {
        return department.data || department.response.data;
    }
}

export const fetchDepartments = async (header) => {

    const departments = await axiosService.get(DepartmentUrls.fetchDepartment(), header);

    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}