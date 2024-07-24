import './app.css';
import * as Config from './config.ts';
import Bulletin from './models/bulletin.ts';
import BulletinCard from './cards/bulletin.tsx';
import TimeCard from './cards/time.tsx';
import moment from 'moment';
import { CurrentWeatherCard } from './cards/weather.tsx';
import { WeatherReport } from './models/weather.ts';
import { get_weather_report } from './models/weather.ts';
import { useEffect, useState } from 'react';

const test_bulletin: Bulletin = {
    id: "abcdefg1234",
    message: "This is a test message!",
    author: "lainproliant",
    thumbnail_url: "https://avatars.githubusercontent.com/u/126726862?v=4",
    expiry_dt: moment().add(10, 'minutes')
};

function App() {
    const [weatherReport, setWeatherReport] = useState<WeatherReport | null>(null);

    async function doUpdateWeatherReport() {
        setWeatherReport(await get_weather_report());
    }

    useEffect(() => {
        doUpdateWeatherReport();

        const timer = setInterval(() => {
            doUpdateWeatherReport();
        }, Config.WEATHER_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [])

    return (
        <div className="w-full overflow-hidden">
            <main role="main" className="w-full grid grid-cols-3 grid-rows-6 gap-3 p-1">
                { weatherReport != null ? <CurrentWeatherCard report={weatherReport!} /> : <></> }
                <TimeCard/>
                <BulletinCard bulletin={test_bulletin} />
                <BulletinCard bulletin={test_bulletin} />
                <BulletinCard bulletin={test_bulletin} />
                <BulletinCard bulletin={test_bulletin} />
                <BulletinCard bulletin={test_bulletin} />
                <BulletinCard bulletin={test_bulletin} />
                <BulletinCard bulletin={test_bulletin} />
            </main>
        </div>
    );
}

export default App;
