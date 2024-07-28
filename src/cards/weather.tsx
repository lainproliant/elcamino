import { WeatherReport } from '../models/weather.ts';
import TimeCard from './time.tsx';
import moment from 'moment';

const toFarenheit = (celsius: number): number => (celsius * 9/5) + 32;

export function CurrentWeatherCard({report}: {report: WeatherReport}) {
    const currentWeather = report.current;

    const celcius = currentWeather.temperature;
    const farenheit = toFarenheit(celcius);

    const render_dt = moment();

    return (
        <div className="capsule flex flex-col row-span-4">
            <TimeCard/>
            <hr />
            <div className="flex">
                <div className="basis-1/5">
                    <img src={currentWeather.info.image_url} alt={currentWeather.info.description} />
                </div>
                <div className="weather-info flex flex-col basis-3/5">
                    <div className="stat-title text-2xl">
                        {currentWeather.info.description}
                    </div>
                    <div className="stat-value py-2">
                        {farenheit.toFixed(0)}°F <span className="text-slate-400">{celcius.toFixed(0)}°C</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="forecast-list text-md grow">
                {report.forecast.map((weather) => {
                    const high_celcius = weather.high_temperature;
                    const high_farenheit = toFarenheit(high_celcius);

                    const low_celcius = weather.low_temperature;
                    const low_farenheit = toFarenheit(low_celcius);

                    return (
                        <>
                        <div className="forecast flex flex-row gap-1">
                            <div className="forecast-day basis-1/5">
                                {weather.dt.format("ddd Do")}
                            </div>
                            <div className="forecast-icon h-4">
                                <img style={{width: "1.5em", height: "1.5em", objectFit: "fill"}} src={weather.info.image_url} alt={weather.info.description} />
                            </div>
                            <div className="forecast-description basis-1/5">
                                {weather.info.description}
                            </div>
                            <div className="forecast-hi basis-1/5">
                                <i className="fas fa-arrow-up text-red-500"></i> {high_farenheit.toFixed(0)}°F <span className="text-slate-400">{high_celcius.toFixed(0)}°C</span>
                            </div>
                            <div className="forecast-lo basis-1/5">
                                <i className="fas fa-arrow-down text-cyan-500"></i> {low_farenheit.toFixed(0)}°F <span className="text-slate-400">{low_celcius.toFixed(0)}°C</span>
                            </div>
                            <div className="forecast-precipitation basis-1/5">
                                <i className="fas fa-droplet text-blue-500"></i> {weather.precipitation}%
                            </div>
                        </div>
                        <hr/>
                        </>
                    );
                })}
            </div>
            <div className="weather-last-updated text-sm italic text-slate-500 self-end">
                last updated {render_dt.format("dddd MMMM D hh:mma").toLowerCase()}
            </div>
        </div>
    )
}
