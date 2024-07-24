import moment from 'moment';
import {WeatherCodeInfo, get_weather_code_info} from './wmo.ts';
import { fetchWeatherApi } from 'openmeteo';
import * as Config from '../config.ts';

// ------------------------------------------------------------------
const OPENMETEO_PARAMS = {
    "apikey": Config.OPENMETEO_API_KEY,
    "current": ["temperature_2m", "relative_humidity_2m", "is_day", "precipitation", "weather_code"],
    "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "weather_code"],
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"],
};

// ------------------------------------------------------------------
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// ------------------------------------------------------------------
export interface Weather {
    dt: moment.Moment;
    code: number;
    info: WeatherCodeInfo;
    daytime: boolean;
    temperature: number;
    high_temperature: number;
    low_temperature: number;
    humidity: number;
    precipitation: number;
}

// ------------------------------------------------------------------
export interface WeatherReport {
    current: Weather;
    forecast: Weather[];
}

// ------------------------------------------------------------------
export async function get_weather_report(): Promise<WeatherReport> {
    const params = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        latitude: Config.LATITUDE,
        longitude: Config.LONGITUDE,
        ...OPENMETEO_PARAMS
    };
    const responses = await fetchWeatherApi(Config.OPENMETEO_URL, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            isDay: current.variables(2)!.value(),
            precipitation: current.variables(3)!.value(),
            weatherCode: current.variables(4)!.value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
            precipitationProbability: hourly.variables(2)!.valuesArray()!,
            weatherCode: hourly.variables(3)!.valuesArray()!,
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            precipitationProbabilityMax: daily.variables(3)!.valuesArray()!,
        },
    };

    const forecast: Weather[] = [];

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const dt = moment(weatherData.daily.time[i]);
        const code = weatherData.daily.weatherCode[i];
        const info = get_weather_code_info(code, "day");
        const daytime = true;
        const high_temperature = weatherData.daily.temperature2mMax[i];
        const low_temperature = weatherData.daily.temperature2mMin[i];
        const temperature = (high_temperature + low_temperature) / 2;
        const humidity = 0;
        const precipitation = weatherData.daily.precipitationProbabilityMax[i];

        forecast.push({
            dt,
            code,
            info,
            daytime,
            temperature,
            high_temperature,
            low_temperature,
            humidity,
            precipitation,
        })
    }

    const currentWeather: Weather = {
        dt: moment(weatherData.current.time),
        code: weatherData.current.weatherCode,
        info: get_weather_code_info(weatherData.current.weatherCode, weatherData.current.isDay ? "day" : "night"),
        daytime: weatherData.current.isDay > 0,
        temperature: weatherData.current.temperature2m,
        high_temperature: forecast[0].high_temperature,
        low_temperature: forecast[0].low_temperature,
        humidity: weatherData.current.relativeHumidity2m,
        precipitation: weatherData.current.precipitation,
    };

    return {
        current: currentWeather,
        forecast
    };
}
