import React from 'react';
import styles from "../atomStyles/banner.module.css"
function Banner({title}){
    return (
        <div className={styles.banner}>
            <h1 className={styles.titleStyle}>{title}</h1>
        </div>
    )
}

export default Banner;