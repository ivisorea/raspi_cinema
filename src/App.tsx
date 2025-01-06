import { useState, useEffect } from 'react';
import ServiceGrid from './components/ServiceGrid';
import { services } from './config/services';

function App() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temperature: '', humidity: '' });
  const [showServiceGrid, setShowServiceGrid] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const latitude = 52.1316;
      const longitude = 11.6393;
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherResponse.json();
      setWeather({ temperature: weatherData.current_weather.temperature, humidity: weatherData.current_weather.relative_humidity });
    };
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {!showServiceGrid && (
          <>
            <h1 className="mb-8 text-center text-4xl font-bold text-white">🏠 Home </h1>
            <div className="text-center text-white text-6xl mb-8">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-center text-white text-2xl mb-4">
              Magdeburg Stadtfeld Ost, Germany
            </div>
            <div className="text-center text-white text-2xl mb-4">
              Temperature: {weather.temperature}°C
            </div>
            <div className="text-center text-white text-2xl mb-8">
              Humidity: {weather.humidity}%
            </div>
            <div className="text-center mb-8">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded" 
                onClick={() => setShowServiceGrid(true)}
              >
                Cinema
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