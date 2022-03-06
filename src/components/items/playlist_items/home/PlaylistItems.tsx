import React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./PlaylistItems.module.css"
import {NavLink} from "react-router-dom";

interface IPlaylistItems{
    playlistName: string;
    imageUrl: string;
    playlistUri: string;
    playlistId: string;
}

export default function PlaylistItems(props:IPlaylistItems){
    return (
        <div className={style.container}>
            <NavLink
                to={`/playlist/${props.playlistId}`}
                style={{ textDecoration: "none", color: "white" }}
                >
                <div className={style.content}>
                    <img className={style.img} src={props.imageUrl}/>
                    <div className={style.name}>{props.playlistName}</div>
                </div>
            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={()=>{
                    console.log("a")
                }}
                className={style.icon}/>
        </div>
    )
}