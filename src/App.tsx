import { useState, useEffect } from 'react';
import ServiceGrid from './components/ServiceGrid';
import { services } from './config/services';
// import { fetchWeatherApi } from 'openmeteo';
import { RiMovie2Fill } from 'react-icons/ri';
import useWeather from './hooks/useWeather';
import getWeatherIcon from './utils/getWeatherIcon';

const App = () => {
  const [time, setTime] = useState(new Date());
  const [showServiceGrid, setShowServiceGrid] = useState(false);
  const { weather, dailyWeather } = useWeather();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {!showServiceGrid && (
          <>
            <div className="text-center text-white text-8xl mb-8">
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
                    <div key={index} className="flex flex-col items-center space-y-4">
                      <div className={isToday ? "text-red-500" : ""}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="my-2">
                        {getWeatherIcon(dailyWeather.weatherCode[index])}
                      </div>
                      <div>
                        {dailyWeather.temperatureMax[index]}° / {dailyWeather.temperatureMin[index]}°
                      </div>
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