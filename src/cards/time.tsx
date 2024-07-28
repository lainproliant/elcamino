import {useEffect, useState} from "react";
import moment from 'moment';
import * as Config from '../config.ts';

function TimeCard() {
    const [timeString, setTimeString] = useState<string>("");
    const [dateString, setDateString] = useState<string>("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = moment();

            setTimeString(now.format("hh:mm:ss a"));
            setDateString(now.format("dddd, MMM Do YYYY"))
        }, Config.TIMECARD_INTERVAL_MS);

        return () => clearInterval(timer);
    });

    return (
        <div className="flex flex-col text-center">
            <div className="text-2xl text-zinc-100">{dateString}</div>
            <div className="text-4xl font-mono font-bold">{timeString}</div>
        </div>
    );
}

export default TimeCard;
