import axiosInstance from "../../axios/axiosInstance";

export const getPublicPlaces = async () => {
    return await axiosInstance.get('places/public');
}

export const getPlaceTables = async (id) => {
    return await axiosInstance.get(`places/${id}/tables`);
}

export const saveNewUserPlace = async (placeInfo) => {
    return await axiosInstance.post(`places`, placeInfo);
}

export const saveNewTable = async (id, tableForm) => {
    return await axiosInstance.post(`places/${id}/tables`, tableForm);
}

export const updateTable = async (tableForm) => {
    return await axiosInstance.post(`tables/${tableForm.id}`, tableForm);
}

export const deleteTable = async (id) => {
    return await axiosInstance.delete(`tables/${id}`);
}