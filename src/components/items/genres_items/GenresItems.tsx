import React from "react";
import style from "./Genres.module.css"
interface IGenresProp {
    title: string;
    icon: string;
    bgColor: string;
}

export default function Genres(props: IGenresProp) {
    return (
        <div className={style.genres} style={{ backgroundColor: props.bgColor }}>
            <h3>{props.title}</h3>
            <img
                src={props.icon}
                alt=""
                style={{ width: "50%", height: "50%" }}
                className={style.genresIcon}
            />
        </div>
    );
}