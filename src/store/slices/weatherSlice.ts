import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherData {
    city_name: string;
    country_code: string;
    temp: number;
    wind_spd: number;
    sunrise: string;
    sunset: string;
    wind_cdir_full: string;
    aqi: number;
    weather: {
        description: string;
    };
}

interface WeatherState {
    city: string;
    weatherData: WeatherData | null;
    error: string | null;
}

const initialState: WeatherState = {
    city: '',
    weatherData: null,
    error: null,
};

export const fetchWeather = createAsyncThunk<WeatherData, string>('w    eather/fetchWeather', async (city: string) => {
    try {
        const apiKey = 'fc2d94057c7f4983b078d104a52d7315';
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
        return response.data.data[0];
    } catch (error) {
        throw error || 'Error fetching weather data. Please check the city name.';
    }
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.weatherData = null;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.weatherData = action.payload;
                state.error = null;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.weatherData = null;
                state.error = action.error.message || "Unknow error!";
            });
    },
});

export default weatherSlice.reducer;
