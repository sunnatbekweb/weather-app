import { configureStore } from '@reduxjs/toolkit';
import weatherReducer, { fetchWeather } from './slices/weatherSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { fetchWeather };
export default store;
