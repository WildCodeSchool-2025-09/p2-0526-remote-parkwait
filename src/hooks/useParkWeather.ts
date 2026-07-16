import { useEffect, useState } from "react";
import type { WeatherData } from "../types";

export function useParkWeather(lat: number, lng: number) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!lat || !lng) return;

        const controller = new AbortController();

        async function fetchWeather() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,is_day`,
                    { signal: controller.signal }
                );
                if (!res.ok) throw new Error("Erreur météo");
                const data = await res.json();
                setWeather({
                    temperature: Math.round(data.current.temperature_2m),
                    weatherCode: data.current.weather_code,
                    isDay: data.current.is_day === 1,
                });
                setError(null);
            } catch (err) {
                if ((err as Error).name !== "AbortError") {
                    setError("Météo indisponible");
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchWeather();
        return () => controller.abort();
    }, [lat, lng]);

    return { weather, isLoading, error };
}