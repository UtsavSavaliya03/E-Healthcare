const baseUrl = process.env.REACT_APP_API_URL;

export const SignupUrls = {
    signup: () => {
        return baseUrl + '/users/signup';
    }
}

export const LoginUrls = {
    login: () => {
        return baseUrl + '/users/login';
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

export const EnquiryUrls = {
    enquiry: () => {
        return baseUrl + `/enquiry`;
    },
    fetchEnquiry: (query) => {
        return baseUrl + `/enquiry?status=${query}`;
    },
    replyEnquiry: () => {
        return baseUrl + `/enquiry/reply`;
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
        return baseUrl + `/doctor/${id}`;
    },
    deleteDoctor: (id) => {
        return baseUrl + `/doctor/${id}`;
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
}

