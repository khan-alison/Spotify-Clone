import React from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./AlbumItems.module.css"
import {getAlbumID, getAlbumName, getArtistID, getArtistName, getListUri, getUri} from "../../../redux/actions/actions";
import {useDispatch} from "react-redux";

interface ITrackItems {
    imgUrl: string;
    name: string;
    id: string;
    artists: [];
    uri: string
}


export default function AlbumItems(props: ITrackItems) {
    const dispatch = useDispatch();
    const handleGetInfo = (id: string, name: string, uri: string) => {
        console.log(id, name, uri)
        dispatch(getAlbumID(id))
        dispatch(getAlbumName(name))
        dispatch(getListUri(uri))
    }
    const handlePlayIconClick = (uri:string) => {
        dispatch(getListUri(uri))
        console.log(uri)
    }

    return (
        <div className={style.container}>
            <NavLink
                onClick={() => handleGetInfo(props?.id, props?.name, props?.uri)}
                to={`/album/${props.id}`}
                style={{textDecoration: "none", color: "white"}}>
                <img className={style.img} src={props?.imgUrl} alt=""/>

                <h5 className={style.name}
                    title={props?.name}

                >{props?.name}</h5>
                {/*<div>{props?.id}</div>*/}
                <p className={style.description}>{props?.artists.map((item: any, index: number) => (
                    <NavLink
                        key={index}
                        to={`/artist/${item.id}`}
                        className={style.artist}
                        style={{textDecoration: "none", color: "#A7A7A7"}}
                    >
                        {
                            (index < props?.artists.length - 1) ?
                                item.name + ", " : item.name
                        }
                    </NavLink>

                ))}</p>

            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={()=>handlePlayIconClick(props.uri)}
                className={style.icon}/>
        </div>
    )
}