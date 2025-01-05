import ServiceGrid from './components/ServiceGrid';
import { services } from './config/services';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">🍿 Cinema Paradise 🎬</h1>
        <ServiceGrid services={services} />
      </div>
    </div>
  );
}

export default App;