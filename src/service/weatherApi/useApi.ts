import api from "../axios";
const apiKey = "fc2d94057c7f4983b078d104a52d7315";
const city = "Tashkent";

const useWeatherApi = {
    getWeather: () => api.get(`?city=${city}&key=${apiKey}`)
};

export default useWeatherApi;
