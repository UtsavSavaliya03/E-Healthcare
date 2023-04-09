import AxiosService from "../../../Services/AxiosServices.jsx";
import { DepartmentUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const addDepartment = async (departmentCredentials, header) => {

    const department = await axiosService.post(DepartmentUrls.addDepartment(), departmentCredentials, header);

    if (department.data || department.response.data) {
        return department.data || department.response.data;
    }
}

export const fetchActiveDepartments = async (header) => {

    const departments = await axiosService.get(DepartmentUrls.fetchActiveDepartment(), header);

    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}

export const fetchDepartments = async (header) => {

    const departments = await axiosService.get(DepartmentUrls.fetchDepartment(), header);

    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}

export const searchDepartments = async (searchValue, header) => {

    const departments = await axiosService.post(DepartmentUrls.searchDepartments(), searchValue, header);

    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}

export const fetchDepartmentById = async (id, header) => {

    const departments = await axiosService.get(DepartmentUrls.fetchDepartmentById(id), header);
    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}

export const deleteDepartment = async (id, header) => {

    const departments = await axiosService.delete(DepartmentUrls.deleteDepartment(id), header);
    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}

export const updateDepartment = async (id, department, header) => {

    const departments = await axiosService.post(DepartmentUrls.updateDepartment(id),department, header);
    if (departments.data || departments.response.data) {
        return departments.data || departments.response.data;
    }
}