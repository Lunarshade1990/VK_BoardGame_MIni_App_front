import axiosInstance from "../../axios/axiosInstance";

export const saveNewGameEvent = async (gameEvent) => {
    return await axiosInstance.post(`events`, gameEvent);
}