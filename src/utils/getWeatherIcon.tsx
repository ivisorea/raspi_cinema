import { BsCloudDrizzle, BsCloudFog, BsCloudLightningRain, BsCloudRainHeavy, BsCloudSleet, BsCloudSnow, BsCloudSun, BsSun } from "react-icons/bs";
import { WiDaySunny } from "react-icons/wi";

const getWeatherIcon = (code: number, size?: string) => {
    const className = size || "text-4xl";
    
    // Clear sky
    if (code === 0) return <WiDaySunny className={className} />;
    
    // Mainly clear, partly cloudy, and overcast
    if ([1, 2, 3].includes(code)) return <BsCloudSun className={className} />;
    
    // Fog and depositing rime fog
    if ([45, 48].includes(code)) return <BsCloudFog  className={className} />;
    
    // Drizzle: Light, moderate, and dense intensity
    if ([51, 53, 55].includes(code)) return <BsCloudDrizzle className={className} />;
    
    // Freezing Drizzle: Light and dense intensity
    if ([56, 57].includes(code)) return <BsCloudSleet className={className} />;
    
    // Rain: Slight, moderate and heavy intensity
    if ([61, 63, 65, 80, 81, 82].includes(code)) return <BsCloudRainHeavy  className={className} />;
    
    // Freezing Rain: Light and heavy intensity
    if ([66, 67].includes(code)) return <BsCloudSleet className={className} />;
    
    // Snow fall: Slight, moderate, and heavy intensity + Snow grains
    if ([71, 73, 75, 77, 85, 86].includes(code)) return <BsCloudSnow  className={className} />;
    
    // Thunderstorm with slight and heavy hail
    if ([95, 96, 99].includes(code)) return <BsCloudLightningRain className={className} />;
    
    // Default case
    return <BsSun className={className} />;
  };
  export default getWeatherIcon;