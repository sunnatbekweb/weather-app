import React from 'react';
import { useSelector } from 'react-redux';
import { Cloud, CloudQueue, WbSunny, FlashOn, Air } from '@mui/icons-material';
import SpeedIcon from '@mui/icons-material/Speed';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { RootState } from '../../store/store';
import './style.scss';

const WeatherInfo: React.FC = () => {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData);
    const error = useSelector((state: RootState) => state.weather.error);

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
                icon: <AcUnitIcon />,
                style: { color: 'white' }
            },
            'thunderstorm': {
                icon: <FlashOn />,
                style: { color: 'purple' }
            },
        };

        const words = weatherDescription.toLowerCase().split(' ');

        for (const word of words) {
            if (iconMapping[word]) {
                const { icon, style } = iconMapping[word];
                return React.cloneElement(icon, { style: { ...iconStyle, ...style } });
            }
        }

        return React.cloneElement(<WbSunny />, { style: { ...iconStyle } });
    };



    return (
        <div className='weather_info'>
            {weatherData ? (
                <div>
                    <span className=' flex w-full justify-center '>
                        {getWeatherIcon(weatherData.weather.description)}
                    </span>
                    <h2>{weatherData.city_name}, {weatherData.country_code}</h2>
                    <p className='temperature'>{weatherData.temp.toFixed()} °C</p>
                    <p className='desc'>{weatherData.weather.description}</p>
                    <div className='sun'>
                        <div className='sun_container'>
                            <WbTwilightIcon style={{ color: 'orange', fontSize: '4em' }} />
                            <p>Sunrise:
                                <span>{weatherData.sunrise} </span>
                            </p>
                        </div>
                        <div className='sun_container'>
                            <WbTwilightIcon style={{ color: 'orangered', fontSize: '4em' }} />
                            <p>Sunset:
                                <span>{weatherData.sunset} </span>
                            </p>
                        </div>
                    </div>

                    <div className='wind_aqi'>
                        <div className='wind'>
                            <Air style={{ fontSize: "4em" }} />
                            <div className='text'>
                                <span>{weatherData.wind_spd.toFixed()} m/s</span>
                                <span>{weatherData.wind_cdir_full}</span>
                            </div>
                        </div>

                        <div className='aqi'>
                            <SpeedIcon style={{ fontSize: "4em" }} />
                            <div className='text'>
                                <span>{weatherData.aqi}</span>
                                <span>
                                    {
                                        weatherData.aqi < 50 ? "Good" : "" ||
                                            weatherData.aqi > 51 && weatherData.aqi < 100 ? "Moderate" : "" ||
                                                weatherData.aqi > 101 && weatherData.aqi < 150 ? "Unhealthy for Sentensive Groups" : "" ||
                                                    weatherData.aqi > 151 && weatherData.aqi < 200 ? "Unhealthy" : "" ||
                                                        weatherData.aqi > 201 && weatherData.aqi < 300 ? "Very Unhealthy" : "" ||
                                                            weatherData.aqi > 300 ? "" : "Hazardous"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No weather data available</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default WeatherInfo