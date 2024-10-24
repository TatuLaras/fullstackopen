import { fetchWeatherApi } from 'openmeteo';
import { useEffect, useState } from 'react';

interface WeatherData {
    temp: number;
    windSpeed: number;
}

interface Props {
    country: any;
}

export default function CountryInfo({ country }: Props) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const languages: string[] = [];

    for (const [_, value] of Object.entries(country.languages)) {
        languages.push(value as string);
    }

    useEffect(() => {
        const [latitude, longitude] = country.capitalInfo.latlng;

        const params = {
            latitude,
            longitude,
            current: ['temperature_2m', 'wind_speed_10m'],
        };
        const url = 'https://api.open-meteo.com/v1/forecast';

        fetchWeatherApi(url, params).then((responses) => {
            const res = responses[0];
            const current = res.current()!;

            setWeatherData({
                temp: current.variables(0)!.value(),
                windSpeed: current.variables(1)!.value(),
            });
        });
    }, [country]);

    const capital = country.capital.length > 0 && country.capital[0];

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img
                src={country.flags.svg}
                width={200}
                alt={`Flag of ${country.name.common}`}
            />
            {weatherData && (
                <>
                    <h2>Weather in {capital}</h2>
                    <p>Temperature {weatherData.temp.toFixed(1)} ℃</p>
                    <p>Wind speed {weatherData.windSpeed.toFixed(1)} ℃</p>
                </>
            )}
        </>
    );
}
