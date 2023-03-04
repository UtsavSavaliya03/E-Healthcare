import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {},
});

export const mainLoadingState = atom({
    key: 'mainLoadingState',
    default: false,
});