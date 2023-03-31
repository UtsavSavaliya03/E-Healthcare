const baseUrl = process.env.REACT_APP_API_URL;

export const SignupUrls = {
    signup: () => {
        return baseUrl + '/users/signup';
    }
}

export const LoginUrls = {
    login: () => {
        return baseUrl + '/users/login';
    },
    doctorLogin: () => {
        return baseUrl + '/users/doctorLogin';
    }
}

export const UserUrls = {
    findUser: (userId) => {
        return baseUrl + `/users/${userId}`;
    }
}

export const PasswordUrls = {
    sendOtp: () => {
        return baseUrl + `/users/sendOtp`;
    },
    recoverPassword: () => {
        return baseUrl + `/users/recoverPassword`;
    }
}

export const InquiryUrls = {
    inquiry: () => {
        return baseUrl + `/inquiry`;
    },
    fetchInquiry: (query) => {
        return baseUrl + `/inquiry?status=${query}`;
    },
    replyInquiry: () => {
        return baseUrl + `/inquiry/reply`;
    },
    deleteInquiry: (id) => {
        return baseUrl + `/inquiry/${id}`;
    },
}

export const NewsletterUrls = {
    subscribe: () => {
        return baseUrl + `/newsletter`;
    },
}

export const DoctorUrls = {
    addDoctor: () => {
        return baseUrl + `/doctor`;
    },
    fetchDoctors: () => {
        return baseUrl + `/doctor`;
    },
    fetchDoctorById: (id) => {
        return baseUrl + `/doctor/${id}`;
    },
    updateDoctor: (id) => {
        return baseUrl + `/doctor/update/${id}`;
    },
    deleteDoctor: (id) => {
        return baseUrl + `/doctor/${id}`;
    },
    searchDoctor: () => {
        return baseUrl + `/doctor/search`;
    },
}

export const HospitalUrls = {
    addHospital: () => {
        return baseUrl + `/hospital`;
    },
    fetchHospital: () => {
        return baseUrl + `/hospital`;
    },
    searchHospitals: () => {
        return baseUrl + `/hospital/search`;
    },
    fetchHospitalById: (id) => {
        return baseUrl + `/hospital/${id}`;
    },
    updateHospital: (id) => {
        return baseUrl + `/hospital/${id}`;
    },
    deleteHospital: (id) => {
        return baseUrl + `/hospital/${id}`;
    },
}

export const DepartmentUrls = {
    addDepartment: () => {
        return baseUrl + `/department`;
    },
    fetchDepartment: () => {
        return baseUrl + `/department`;
    },
    searchDepartments: (searchValue) => {
        return baseUrl + `/department/search`;
    },
    fetchDepartmentById: (id) => {
        return baseUrl + `/department/${id}`;
    },
    deleteDepartment: (id) => {
        return baseUrl + `/department/${id}`;
    }
}

export const BackupUrls = {
    backup: (type) => {
        return baseUrl + `/backup/${type}`;
    }
}