import React from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./PlaylistGeneral.module.css"
import {getImageUrl, getUri} from "../../../../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";

interface ITrackItems {
    playlistName: string;
    imageUrl: string;
    playlistUri: string;
    playlistId: string;
    description:string;
}


export default function PlaylistGeneral(props:ITrackItems){
    const data = useSelector((state: any) => state.auth)
    const handlePlayIconClick = (uri:string)=>{
        dispatch(getUri(uri))
        console.log(data)
    }
    const dispatch = useDispatch()
    return(
        <div className={style.container}>
            <NavLink to={`/playlist/${props?.playlistId}`}
                     style={{textDecoration:"none",color:"white"}}
                     onClick={() => {
                         dispatch(getImageUrl([props.imageUrl]))
                     }}
            >
                <img className={style.img} src={props?.imageUrl} alt=""/>

                <h5 className={style.name}>{props?.playlistName}</h5>
                <p className={style.description}>By {props?.description}</p>

            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={()=>handlePlayIconClick(props.playlistUri)}
                className={style.icon}/>
        </div>
    )
}