const axios = require("axios");
import Qs from 'qs'


const buildHeader = () => {
    const headers = {};
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.forEach((value, name) => {
        if (name === "sign") {
            headers.authorization = value
        } else headers[name] = value
    });
    return headers;
}

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: buildHeader(),
    paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'comma'} )
});

export default instance;