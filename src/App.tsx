import React, { useState, useEffect } from 'react';
// import ServiceGrid from './components/ServiceGrid';
// import { services } from './config/services';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Home 🏠</h1>
        <div className="text-center text-white text-6xl mb-8">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        {/* <ServiceGrid services={services} /> */}
      </div>
    </div>
  );
}

export default App;