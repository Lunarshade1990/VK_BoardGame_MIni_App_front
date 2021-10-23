const axios = require("axios");


const token = '61f43ab4e665ded98b58328cb66904a037d338d3';
const secret = '574217824db9dc78222072431b721bc435fadb37'

export const suggests = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
});


export const geo = axios.create({
    baseURL: 'var url = "https://cleaner.dadata.ru/api/v1/clean/address"',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token,
        "X-Secret": secret
    }
})