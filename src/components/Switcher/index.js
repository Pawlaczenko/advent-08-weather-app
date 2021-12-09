import React from 'react'
import styles from './_Switcher.module.scss';

const Switcher = ({ value, handleChange }) => {
    return (
        <label htmlFor="switcher" className={styles.switcher}>
            <input checked={value} className={styles.input} id="switcher" type="checkbox" onChange={handleChange} />
            <span className={styles.slider}></span>
        </label>
    )
}

export default Switcher
