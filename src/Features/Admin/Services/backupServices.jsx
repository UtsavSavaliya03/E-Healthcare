import AxiosService from "../../../Services/AxiosServices.jsx";
import { BackupUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const backup = async (type, backupCredentials, header) => {

    const department = await axiosService.post(BackupUrls.backup(type), backupCredentials, header);

    if (department.data || department.response.data) {
        return department.data || department.response.data;
    }
}