import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Day from '../Day';
import styles from './_WeatherApp.module.scss';
import Switcher from '../Switcher';

const WeatherApp = () => {
    const daysOfWeekMap = {
        0: 'SUN',
        1: 'MON',
        2: 'TUES',
        3: 'WED',
        4: 'THUR',
        5: 'FRI',
        6: 'SAT'
    }

    const weatherMap = {
        "Thunderstorm": "stormy",
        "Drizzle": "rainy",
        "Rain": "rainy",
        "Snow": "snowy",
        "Mist": "partly_cloudy",
        "Smoke": "cloudy",
        "Haze": "cloudy",
        "Dust": "cloudy",
        "Fog": "cloudy",
        "Sand": "cloudy",
        "Ash": "cloudy",
        "Squall": "cloudy",
        "Tornado": "cloudy",
        "Clear": "sunny",
        "Clouds": "partly-cloudy"
    }

    const [week, changeWeek] = useState([]);

    const [unit, changeUnit] = useState(false);

    const handleChange = (e) => {
        changeUnit(e.target.checked);
    }

    useEffect(() => {

        const formatForecast = (forecastArray) => {
            let result = [];
            forecastArray.map(day => {
                let item = {};
                let date = new Date(day.dt * 1000);
                item.date = date.getDate();
                item.day = daysOfWeekMap[date.getDay()];
                item.temperature = Math.floor(day.temp.day);
                item.precipitation = Math.floor(day.pop * 100);
                item.low = Math.floor(day.temp.min);
                item.weather = weatherMap[day.weather[0].main];
                result.push(item);
            });
            result.pop();
            return result;
        }
        let unitValue = (unit) ? "imperial" : "metric";
        console.log(unitValue);
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=49.62177&lon=20.69705&exclude=minutely,current,hourly,alerts&units=${unitValue}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(res => {
                const newForecast = res.data.daily;
                changeWeek(formatForecast(newForecast));
            },
                (error) => {
                    console.log(error);
                }
            );
    }, [unit]);

    return (
        <>
            <Switcher value={unit} handleChange={handleChange} />
            <ul className={styles.wrapper}>
                {
                    week.map((day, index) => {
                        return <Day key={index} dayInfo={day} />
                    })
                }
            </ul>
        </>
    )
}

export default WeatherApp
