import React from "react";
import styles from "./LoginPage.module.css"
import {loginURL} from "../../spotify/api";

export default function loginPage() {

    return(
        <div className={styles.container}>
        <div className={styles.body}>
        <img className={styles.img} src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" />
        <a className={styles.button} href={loginURL}>login with Spotify</a>
    </div>
    </div>
    )
}