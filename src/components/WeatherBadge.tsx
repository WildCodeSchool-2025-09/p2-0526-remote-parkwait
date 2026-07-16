
import { useParkWeather } from "../hooks/useParkWeather";


function getWeatherIcon(code: number, isDay: boolean): string {
    if (code === 0) return isDay ? "☀️" : "🌙";
    if ([1, 2].includes(code)) return isDay ? "🌤️" : "🌥️";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️";
    if ([71, 73, 75, 77].includes(code)) return "❄️";
    if ([80, 81, 82].includes(code)) return "🌦️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌡️";
}

export default function WeatherBadge({ lat, lng }: { lat: number; lng: number }) {
    const { weather, isLoading, error } = useParkWeather(lat, lng);

    if (isLoading) return null;
    if (error || !weather) return null;

    return (
        <div className="weather-badge">
            <span>{getWeatherIcon(weather.weatherCode, weather.isDay)}</span>
            <span>{weather.temperature}°C</span>
        </div>
    );
}