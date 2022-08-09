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

export const getUserEvents = async (id, type) => {
    return await axiosInstance.get(`user/${id}/events/${type}`);
}


export const getCollectionWithFilters = async (id, type, filterConfig, size = 10, page = 1) => {
        if (type === 'ALL' || type === null) {
            return await axiosInstance.get(`boardgames`, {
                params: {
                    ...filterConfig,
                    size,
                    page,
                }
            })}
        else {
            return await axiosInstance.get(`user/${id}/collection/${type}`, {
                params: {
                    ...filterConfig,
                    size,
                    page,
                }
            });
        }
}

export const getUserPlaces = async (id) => {
    return await axiosInstance.get(`user/${id}/places`);
}

export {getUserById, saveUserData, getUserCollection};