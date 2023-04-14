import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {},
});

export const mainLoadingState = atom({
    key: 'mainLoadingState',
    default: false,
});

export const sidebarStateAtom = atom({
    key: 'sidebarStateAtom',
    default: false,
});

export const editDoctorStateAtom = atom({
    key: 'editDoctorStateAtom',
    default: false,
});

export const selectedDoctorStateAtom = atom({
    key: 'selectedDoctorStateAtom',
    default: null,
});

export const editHospitalStateAtom = atom({
    key: 'editHospitalStateAtom',
    default: false,
});

export const changePasswordModal = atom({
    key: 'changePasswordModal',
    default: false,
});