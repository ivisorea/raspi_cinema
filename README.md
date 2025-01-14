# Weather Dashboard & Streaming Services Hub

A modern React application that combines a weather dashboard with quick access to popular streaming services.

## Features

- Real-time clock display
- Current weather information including:
  - Temperature
  - Apparent temperature ("feels like")
  - Weather conditions with icons
- 7-day weather forecast showing:
  - Daily min/max temperatures
  - Weather conditions per day
- Streaming services hub with quick links to:
  - Netflix
  - Disney+
  - YouTube

## Technical Details

### Weather Data
Weather information is pulled from the [Open-Meteo API](https://api.open-meteo.com), a free and open-source weather API that provides:
- Current weather conditions
- Hourly forecasts
- Daily forecasts

The weather data is currently set to coordinates: 
- Latitude: 52.12774658531398
- Longitude: 11.612282009326043

### Built With

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Icons
- OpenMeteo API client

## Getting Started

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Start the development server
```
npm run dev
```
4. Build for production
```
npm run build
```


