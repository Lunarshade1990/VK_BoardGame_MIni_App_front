import axiosInstance from "../../axios/axiosInstance";


const  getUserById = async (id) => {
    return await axiosInstance.get(`user/${id}`);
}

const saveUserData = async (userInfo) => {
    return await axiosInstance.post('auth', userInfo);
}

const getUserCollection = async (id) => {
    return await axiosInstance.get(`user/${id}/collection`);
}

export {getUserById, saveUserData, getUserCollection};