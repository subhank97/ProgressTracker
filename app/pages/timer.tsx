"use client"
import { useEffect, useState } from "react";

function parseTime(
    time: number
): { hours: number; minutes: number; seconds: number; milliseconds: number } {
    const date = new Date(time);
    const hours = date.getHours() + date.getTimezoneOffset() / 60 - 24;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return {
        hours,
        minutes,
        seconds,
        milliseconds
    };
}

export default function App() {
    const [running, setRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [lastTime, setLastTime] = useState(0);

    const time = parseTime(currentTime);

    useEffect(() => {
        let frame: number;
        function tick() {
            if (running) {
                setCurrentTime(prevTime => prevTime + Date.now() - lastTime);
                setLastTime(Date.now());
            }
            frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running, lastTime]);

    return (
        <>
            <div className="text-black h-auto flex flex-col items-center">
                <span className="text-6xl font-bold tabular-nums">
                    {time.hours.toString().padStart(2, "0")}:
                    {time.minutes.toString().padStart(2, "0")}:
                    {time.seconds.toString().padStart(2, "0")}.
                    {time.milliseconds.toString().padStart(3, "0")}
                </span>
                <div className="space-x-4">
                    <button
                        onClick={() => {
                            setRunning(false);
                            setCurrentTime(0);
                            setLastTime(0);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 border-4 border-yellow-700 rounded-full w-16 h-16"
                    >
                        Reset
                    </button>
                    {!running ? (
                        <button
                            onClick={() => {
                                setRunning(true);
                                setLastTime(Date.now());
                            }}
                            className="bg-green-500 hover:bg-green-600 border-4 border-green-700 rounded-full w-16 h-16"
                        >
                            Start
                        </button>
                    ) : (
                        <button
                            onClick={() => setRunning(false)}
                            className="bg-red-500 hover:bg-red-600 border-4 border-red-700 rounded-full w-16 h-16"
                        >
                            Stop
                        </button>
                    )}
                </div>
            </div>
        </>

    );
}
