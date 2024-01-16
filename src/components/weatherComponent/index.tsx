import React, { useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchWeather } from '../../store/store';
import { RootState } from '../../store/store';
import WeatherInfo from '../WeatherInfo';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const WeatherComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  const error = useSelector((state: RootState) => state.weather.error);

  const [city, setCity] = useState('');

  const handleFetchWeather = () => {
    dispatch(fetchWeather(city));
  };

  return (
    <div className='weather_comp'>
      <div className='image_container'>
        <img src="../../public/Group6.svg" alt="Background image" className='bg_image' />
      </div>

      <h2 className='title'>Seeing the weather of the world!</h2>

      <div className='input_container'>
        <input type="text"
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='country_inp'
        />
        <button className='btn' onClick={handleFetchWeather}>Get Weather</button>
        <button className='btn2' onClick={handleFetchWeather}><TravelExploreIcon /></button>
      </div>

      <div className='wrapper'>
        {weatherData && (
          <WeatherInfo key={weatherData.temp} />

        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}

export default WeatherComponent;