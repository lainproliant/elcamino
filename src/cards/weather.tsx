import { WeatherReport, Weather } from '../models/weather.ts';

const toFarenheit = (celsius: number): number => (celsius * 9/5) + 32;

export function CurrentWeatherCard({report}: {report: WeatherReport}) {
    const currentWeather = report.current;

    const celcius = currentWeather.temperature;
    const farenheit = toFarenheit(celcius);

    const high_celcius = currentWeather.high_temperature;
    const high_farenheit = toFarenheit(high_celcius);

    const low_celcius = currentWeather.low_temperature;
    const low_farenheit = toFarenheit(low_celcius);

    return (
        <div className="capsule-double flex flex-col row-span-2">
            <div className="flex justify-between">
                <div className="flex-none">
                    <img src={currentWeather.info.image_url} alt={currentWeather.info.description} />
                </div>
                <div className="weather-info flex flex-col">
                    <div className="stat-title text-2xl">
                        {currentWeather.info.description}
                    </div>
                    <div className="stat-value py-2">
                        {farenheit.toFixed(0)}°F <span className="text-slate-400">{celcius.toFixed(0)}°C</span>
                    </div>
                </div>
                <div className="weather-extra-info flex flex-col text-md m-1">
                    <div className="py-1">
                        <i className="fas fa-arrow-up text-red-500"></i> {high_farenheit.toFixed(0)}°F <span className="text-slate-400">{high_celcius.toFixed(0)}°C</span>
                    </div>
                    <div className="py-1">
                        <i className="fas fa-arrow-down text-cyan-500"></i> {low_farenheit.toFixed(0)}°F <span className="text-slate-400">{low_celcius.toFixed(0)}°C</span>
                    </div>
                    <div className="py-1">
                        <i className="fas fa-droplet text-blue-500"></i> {currentWeather.precipitation}%
                    </div>
                </div>
            </div>
            <hr />
            {report.forecast.map((weather) => (
                <div className="text-xs">{weather.temperature}</div>
            ))}
        </div>
    )
}
