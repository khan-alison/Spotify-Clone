import React from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./PlaylistGeneral.module.css"

interface ITrackItems {
    playlistName: string;
    imageUrl: string;
    playlistUri: string;
    playlistId: string;
    description:string;
}


export default function PlaylistGeneral(props:ITrackItems){
    const handlePlayIconClick = ()=>{
        console.log("a")
    }
    return(
        <div className={style.container}>
            <NavLink to={`/playlist/${props.playlistId}`} style={{textDecoration:"none",color:"white"}} >
                <img className={style.img} src={props.imageUrl} alt=""/>

                <h5 className={style.name}>{props.playlistName}</h5>
                <p className={style.description}>By {props.description}</p>

            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={handlePlayIconClick}
                className={style.icon}/>
        </div>
    )
}