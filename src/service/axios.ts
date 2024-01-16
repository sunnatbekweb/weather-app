import axios from "axios";

const api = axios.create({
    baseURL: "https://api.weatherbit.io/v2.0/current"
})


export default api;