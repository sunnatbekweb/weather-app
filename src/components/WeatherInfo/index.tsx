import React from 'react';
import { useSelector } from 'react-redux';
import { Cloud, CloudQueue, WbSunny, Opacity, FlashOn } from '@mui/icons-material'; // Import icons from Material-UI
import { RootState } from '../../store/store';
import './style.scss';

const WeatherInfo: React.FC = () => {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData);
    const error = useSelector((state: RootState) => state.weather.error);

    const iconStyle = {
        fontSize: '4rem',
    };

    const getWeatherIcon = (weatherDescription: string): JSX.Element => {
        const iconStyle = {
            fontSize: '8rem',
        };

        const iconMapping: Record<string, { icon: JSX.Element, style: React.CSSProperties }> = {
            'clear': {
                icon: <WbSunny />,
                style: { color: 'yellow' }
            },
            'clouds': {
                icon: <Cloud />,
                style: { color: 'gray' }
            },
            'rain': {
                icon: <CloudQueue />,
                style: { color: 'blue' }
            },
            'snow': {
                icon: <Opacity />,
                style: { color: 'white' }
            },
            'thunderstorm': {
                icon: <FlashOn />,
                style: { color: 'purple' }
            },
        };

        const { icon, style } = iconMapping[weatherDescription] || { icon: <WbSunny />, style: {} };
        return React.cloneElement(icon, { style: { ...iconStyle, ...style } });
    };



    return (
        <div className='weather_info'>
            <div>
                <>
                    {weatherData ? (
                        <div>
                            <span className=' flex w-full justify-center '>
                                {getWeatherIcon(weatherData.weather.description)}
                            </span>
                            <h2>{weatherData.city_name}, {weatherData.country_code}</h2>
                            <p>Temperature: {weatherData.temp} °C</p>
                            <div>
                                <p>Description: {weatherData.weather.description}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No weather data available</p>
                    )}
                </>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    )
}

export default WeatherInfo