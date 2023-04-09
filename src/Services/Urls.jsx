const baseUrl = process.env.REACT_APP_API_URL;

export const SignupUrls = {
    signup: () => {
        return baseUrl + '/users/signup';
    }
}

export const LoginUrls = {
    login: (type) => {
        return baseUrl + `/users/login/${type}`;
    },
    doctorLogin: () => {
        return baseUrl + '/users/doctorLogin';
    }
}

export const UserUrls = {
    findUser: (userId) => {
        return baseUrl + `/users/${userId}`;
    },
    updateUser: (userId) => {
        return baseUrl + `/users/${userId}`;
    },
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
    sendMail: () => {
        return baseUrl + `/newsletter/sendMail`;
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
export const LaboratoryUrls = {
    addLaboratory: () => {
        return baseUrl + `/laboratory`;
    },
    fetchLaboratories: () => {
        return baseUrl + `/laboratory`;
    },
    fetchLaboratoryById: (id) => {
        return baseUrl + `/laboratory/${id}`;
    },
    deleteLaboratoryById: (id) => {
        return baseUrl + `/laboratory/${id}`;
    },
    searchLaboratories: () => {
        return baseUrl + `/laboratory/search`;
    },
    fetchLaboratoryByPincode: (pincode) => {
        return baseUrl + `/laboratory/pincode/${pincode}`;
    },


}
export const TestRequestUrls = {
    addTestRequest: () => {
        return baseUrl + `/testRequest`;
    },
    fetchTestRequestsByStatus: (status) => {
        return baseUrl + `/testRequest/status/${status}`;
    },
    updateTestRequestsById: (id) => {
        return baseUrl + `/testRequest/${id}`;
    },
    searchPatients: (patientId) => {
        return baseUrl + `/testRequest/search/${patientId}`;
    },
}
export const TestReportUrls = {
    addTestReport: () => {
        return baseUrl + `/testReport`;
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
    fetchActiveDepartment: () => {
        return baseUrl + `/department/active`;
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
    },
    updateDepartment: (id) => {
        return baseUrl + `/department/update/${id}`;
    }
}

export const PatientsUrls = {
    fetchPatients: () => {
        return baseUrl + `/patient`;
    },
    searchPatients: (patientId) => {
        return baseUrl + `/patient/search/${patientId}`;
    },

}

export const PrescriptionUrls = {
    addPrescription: () => {
        return baseUrl + `/prescription`;
    },
    fetchPrescription: (id) => {
        return baseUrl + `/prescription/${id}`;
    }
}

export const BackupUrls = {
    backup: (type) => {
        return baseUrl + `/backup/${type}`;
    }
}

export const AppointmentUrls = {
    bookAppointment: () => {
        return baseUrl + `/appointment`;
    },
    fetchAppointments: () => {
        return baseUrl + `/appointment`;
    }
}