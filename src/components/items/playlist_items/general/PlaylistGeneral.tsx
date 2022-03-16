import React from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./PlaylistGeneral.module.css"
import {getImageUrl, getListUri, getPlaylistID, getPlaylistName, getUri} from "../../../../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";

interface ITrackItems {
    playlistName: string;
    imageUrl: string;
    playlistUri: string;
    playlistId: string;
    description: string;
}


export default function PlaylistGeneral(props: ITrackItems) {
    const data = useSelector((state: any) => state.auth)
    const handlePlayIconClick = (uri: string) => {
        dispatch(getListUri(uri))
        console.log(data)
    }
    const dispatch = useDispatch()

    const getInfoHandle = (url: string, name: string, id: string, uri: string) => {
        dispatch(getImageUrl(url))
        dispatch(getPlaylistName(name))
        dispatch(getPlaylistID(id))
        dispatch(getListUri(uri))
    }
    return (
        <div className={style.container}>
            <NavLink to={`/playlist/${props?.playlistId}`}
                     style={{textDecoration: "none", color: "white"}}
                     onClick={() => {
                         getInfoHandle(props.imageUrl, props?.playlistName, props?.playlistId, props?.playlistUri)
                     }}
            >
                <img className={style.img}
                     src={props?.imageUrl || 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2'}
                     alt=""/>

                <h5 className={style.name}
                    title={props?.playlistName}
                >{props?.playlistName}</h5>
                <p className={style.description}>By {props?.description}</p>

            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={() => handlePlayIconClick(props.playlistUri)}
                className={style.icon}/>
        </div>
    )
}