import React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./PlaylistItems.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getImageUrl, getPlaylistID, getPlaylistName, getUri} from "../../../../redux/actions/actions";
import {logDOM} from "@testing-library/react";

interface IPlaylistItems {
    playlistName: string;
    imageUrl: string;
    playlistUri: string;
    playlistId: string;
}

export default function PlaylistItems(props: IPlaylistItems) {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.auth)
    const handlePlayIconClick = () => {
        console.log("a")
    }
    //
    const getInfoHandle=() => {
        dispatch(getImageUrl(props.imageUrl))
        dispatch(getPlaylistName(props?.playlistName))
        dispatch(getPlaylistID(props?.playlistId))
        dispatch(getUri(props?.playlistUri))
    }

    return (
        <div className={style.container}>
            <NavLink
                onClick={getInfoHandle}
                to={`/playlist/${props?.playlistId}`}
                style={{textDecoration: "none", color: "white"}}

            >
                <div className={style.content}>
                    <img className={style.img} src={props?.imageUrl}/>
                    <div className={style.name}>{props?.playlistName}</div>
                </div>
            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={handlePlayIconClick}
                className={style.icon}/>
        </div>
    )
}