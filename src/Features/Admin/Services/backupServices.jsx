import AxiosService from "../../../Services/AxiosServices.jsx";
import { BackupUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const backup = async (type, backupCredentials, header) => {

    const backupResponse = await axiosService.post(BackupUrls.backup(type), backupCredentials, header);

    if (backupResponse.data || backupResponse.response.data) {
        return backupResponse.data || backupResponse.response.data;
    }
}