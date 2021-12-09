import React from 'react'
import styles from './_Day.module.scss';

const Day = ({ dayInfo }) => {
    return (
        <li className={styles.day}>
            <div>
                <span className={styles.dayOfWeek}>{dayInfo.day}</span>
                <br />
                <span className={styles.date}>{dayInfo.date}</span>
            </div>
            <div className={`${styles.bar} ${styles[dayInfo.weather]}`}>
                <div className={styles.weather}>
                    <img src={`/${dayInfo.weather}.svg`} />
                </div>
                <div className={styles.temperature}>
                    {dayInfo.temperature}<span className={styles.degrees}>&deg;</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.precipitation}>
                        <div className={`${styles.icon} ${styles.content__umbrella}`}></div>{dayInfo.precipitation}%
                    </div>
                    <div className={styles.precipitation}>
                        <div className={`${styles.icon} ${styles.content__temp}`}></div>{dayInfo.low}%
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Day
