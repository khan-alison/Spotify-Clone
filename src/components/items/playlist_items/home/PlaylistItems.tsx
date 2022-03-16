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
        dispatch(getUri(props?.playlistUri))
        console.log(data)
    }
    //
    const getInfoHandle=(url:string,name:string,id:string,uri:string) => {
        // dispatch(getImageUrl(props.imageUrl))
        // dispatch(getPlaylistName(props?.playlistName))
        // dispatch(getPlaylistID(props?.playlistId))
        // dispatch(getUri(props?.playlistUri))
        dispatch(getImageUrl(url))
        dispatch(getPlaylistName(name))
        dispatch(getPlaylistID(id))
        dispatch(getUri(uri))
    }

    return (
        <div className={style.container}>
            <NavLink
                onClick={()=>{
                    getInfoHandle(props.imageUrl,props?.playlistName,props?.playlistId,props?.playlistUri)
                }}
                to={`/playlist/${props?.playlistId}`}
                style={{textDecoration: "none", color: "white"}}

            >
                <div className={style.content}>
                    <img className={style.img} src={props?.imageUrl ||'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2'}/>
                    <div className={style.name}>{props?.playlistName}</div>
                </div>
            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={handlePlayIconClick}
                className={style.icon}/>
        </div>
    )
}