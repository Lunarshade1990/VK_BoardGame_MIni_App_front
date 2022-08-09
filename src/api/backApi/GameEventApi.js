import axiosInstance from "../../axios/axiosInstance";

export const saveNewGameEvent = async (gameEvent) => {
    return await axiosInstance.post(`events`, gameEvent);
}

export const changeEventLastUpdateDate = async (eventId, date) => {
    return await axiosInstance.post(`events/${eventId}/latUpdateDate`, date);
}

export const updatePlay = async (playRq) => {
    return await axiosInstance.post(`plays/${playRq.id}`, playRq);
}

export const addPlay = async (eventId, playRq) => {
    return await axiosInstance.post(`events/${eventId}/plays`, playRq);
}