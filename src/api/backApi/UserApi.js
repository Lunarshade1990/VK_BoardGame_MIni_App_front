import axiosInstance from "../../axios/axiosInstance";


const  getUserById = async (id) => {
    return await axiosInstance.get(`user/${id}`);
}

const saveUserData = async (userInfo) => {
    return await axiosInstance.post('auth', userInfo);
}

const getUserCollection = async (id, type) => {
    return await axiosInstance.get(`user/${id}/collection/${type}`);
}


export const getCollectionWithFilters = async (id, type, filterConfig, size = 10, page = 1) => {
    return await axiosInstance.get(`user/${id}/collection/${type}`, {
        params: {
            ...filterConfig,
            size,
            page,
        }
    });
}

export const getUserPlaces = async (id) => {
    return await axiosInstance.get(`user/${id}/places`);
}

export {getUserById, saveUserData, getUserCollection};