import { useState, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import { Weather } from '../interfaces/Weather';
import { DailyWeather } from '../interfaces/Dailyweather';

const params = {
  "latitude": 52.52,
  "longitude": 13.41,
  current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
  hourly: 'temperature_2m,precipitation',
  daily: 'weather_code,temperature_2m_max,temperature_2m_min'
};

const url = "https://api.open-meteo.com/v1/forecast";

 const useWeather = () => {
    const [weather, setWeather] = useState<Weather>({ temperature: -0, weatherCode: 0 });
    const [dailyWeather, setDailyWeather] = useState<DailyWeather>({
        time: [],
        weatherCode: [],
        temperatureMax: [],
        temperatureMin: []
    });

    useEffect(() => {
        const fetchWeather = async () => {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;
        const utcOffsetSeconds = response.utcOffsetSeconds();
        
        const weatherData = {
            current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: Math.round(current.variables(0)!.value()),
            weatherCode: current.variables(1)!.value(),
            },
            hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature: hourly.variables(0)!.valuesArray()!.map(Math.round),
            },
            daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: Array.from(daily.variables(0)!.valuesArray()!),
            temperatureMax: Array.from(daily.variables(1)!.valuesArray()!).map(Math.round),
            temperatureMin: Array.from(daily.variables(2)!.valuesArray()!).map(Math.round),
            }
        };

        setWeather({ 
            temperature: Math.round(weatherData.current.temperature),
            weatherCode: weatherData.current.weatherCode 
        });
        setDailyWeather({
            time: weatherData.daily.time,
            weatherCode: weatherData.daily.weatherCode,
            temperatureMax: weatherData.daily.temperatureMax,
            temperatureMin: weatherData.daily.temperatureMin
        });
        };

        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 3600000);

        return () => clearInterval(weatherInterval);
    }, []);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  return { weather, dailyWeather };
};

export default useWeather;