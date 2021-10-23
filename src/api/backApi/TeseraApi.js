import axiosInstance from "../../axios/axiosInstance";

const  importGameCollection = async (nick) => {
    return await axiosInstance.get(`tesera/import`, {
        params: {
            nickname: nick
        },
        timeout: 100000
    });
}

export {importGameCollection}