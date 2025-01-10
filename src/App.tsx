import { useState, useEffect } from 'react';
import ServiceGrid from './components/ServiceGrid';
import { services } from './config/services';
import { fetchWeatherApi } from 'openmeteo';
import { RiMovie2Fill } from 'react-icons/ri';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm, 
  WiDayFog,
  WiNightClear,
  WiDayCloudy
} from 'react-icons/wi';

const params = {
	"latitude": 52.52,
	"longitude": 13.41,
	current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
  hourly: 'temperature_2m,precipitation',
  daily: 'weather_code,temperature_2m_max,temperature_2m_min'
};
const url = "https://api.open-meteo.com/v1/forecast";

const getWeatherIcon = (code: number, size?: string) => {
  // Códigos según la documentación de Open-Meteo
  if (code === 0) return <WiDaySunny className={size ? size:"text-3xl"} />;  // Clear sky
  if (code === 1 || code === 2) return <WiDayCloudy className={size ? size:"text-3xl"} />; // Partly cloudy
  if (code === 3) return <WiCloudy className={size ? size:"text-3xl"} />; // Overcast
  if ([45, 48].includes(code)) return <WiDayFog className={size ? size:"text-3xl"} />; // Foggy
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(code)) return <WiRain className={size ? size:"text-3xl"} />; // Rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <WiSnow className={size ? size:"text-3xl"} />; // Snow
  if ([95, 96, 99].includes(code)) return <WiThunderstorm className={size ? size:"text-3xl"} />; // Thunderstorm
  return <WiDaySunny className={size ? size:"text-3xl"} />; // Default
};

function App() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temperature: -0, humidity: '', weatherCode: 0 });
  interface DailyWeather {
    time: Date[];
    weatherCode: number[];
    temperatureMax: number[];
    temperatureMin: number[];
  }
  
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>({
    time: [],
    weatherCode: [],
    temperatureMax: [],
    temperatureMin: []
  });
  const [showServiceGrid, setShowServiceGrid] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        temperature: Math.round(current.variables(0)!.value()), // Current is only 1 value, therefore `.value()`
        weatherCode: current.variables(1)!.value(),
        windSpeed: current.variables(2)!.value(),
        precipitacion: current.variables(4)!.value(),
        rain: current.variables(0)!.value(),
        showers: current.variables(1)!.value(),
        snowfall: current.variables(2)!.value(),
        },
        hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature: hourly.variables(0)!.valuesArray()!.map(Math.round), // `.valuesArray()` get an array of floats
        precipitation: hourly.variables(1)!.valuesArray()!,
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
      console.log('===  === ===', weatherData.current);
      // Sort daily weather by Monday
      const sortByMonday = (dates: Date[]) => {
        const orderedDays = dates.map((date, index) => ({
          date,
          weatherCode: weatherData.daily.weatherCode[index],
          tempMax: weatherData.daily.temperatureMax[index],
          tempMin: weatherData.daily.temperatureMin[index]
        }));

        orderedDays.sort((a, b) => {
          const dayA = a.date.getDay() || 7; // Convierte domingo (0) a 7
          const dayB = b.date.getDay() || 7;
          return dayA - dayB;
        });

        weatherData.daily.time = orderedDays.map(d => d.date);
        weatherData.daily.weatherCode = orderedDays.map(d => d.weatherCode);
        weatherData.daily.temperatureMax = orderedDays.map(d => d.tempMax);
        weatherData.daily.temperatureMin = orderedDays.map(d => d.tempMin);
      };

      sortByMonday(weatherData.daily.time);
      setWeather({ 
        temperature: Math.round(weatherData.current.temperature),
        humidity: 'N/A',
        weatherCode: weatherData.current.weatherCode 
      });
      setDailyWeather(weatherData.daily);
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 3600000); // Update every hour

    return () => clearInterval(weatherInterval);
  }, []);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {!showServiceGrid && (
          <>
            <div className="text-center text-white text-8xl mb-8 mt-8">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-center text-white text-6xl mb-12 mt-12 flex items-center justify-center gap-4">
              <span>{weather.temperature} °C</span>
              {getWeatherIcon(weather.weatherCode, "text-6xl")}
            </div>
            <div className="text-center text-white text-2xl mb-8">
            </div>
            <div className="text-center text-white text-2xl mb-8">
              <div className="flex justify-center space-x-8">
                {dailyWeather.time && dailyWeather.time.map((day, index) => {
                  const isToday = new Date().toDateString() === day.toDateString();
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={isToday ? "text-red-500" : ""}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      {getWeatherIcon(dailyWeather.weatherCode[index])}
                      <div>{dailyWeather.temperatureMax[index]}° / {dailyWeather.temperatureMin[index]}°</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-center mb-8">
              <button 
                className="fixed top-6 right-6 px-4 py-2 text-white rounded-lg flex items-center space-x-2 transition-colors" 
                onClick={() => setShowServiceGrid(true)}
              >
               <RiMovie2Fill fill='white' size={24} />
              </button>
            </div>
          </>
          )}
        {showServiceGrid && (
          <>
            <h1 className="mb-8 text-center text-4xl font-bold text-white">🍿 Cinema Paradise 🎬</h1>
            <ServiceGrid services={services} />
            <div className="text-center mt-8">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded" 
                onClick={() => setShowServiceGrid(false)}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;