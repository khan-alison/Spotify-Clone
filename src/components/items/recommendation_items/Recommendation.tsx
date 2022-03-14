import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./Recommendation.module.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {useDispatch, useSelector} from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {getArtistID, getArtistName, getUri} from "../../../redux/actions/actions";
import {spotifyApi} from "../../../spotify/api";
// import {spotifyApi} from "../../../../spotify/api";

interface ITrackItems {
    imgUrl: string;
    title: string;
    album: string;
    albumId:string;
    id: string;
    index:number;
    artists:[];
    uri:string;
    playlistID:any;
    playlistLength:number;
    parentCallback:any;
}


export default function Recommendation(props:ITrackItems){
    const dispatch = useDispatch();
    const data = useSelector((state:any)=>state.auth)
    const [isFar, setFar] = useState(false);
    const [display,setDisplay] = useState('')

    const handleArtistClick = (id:string,name:string)=>{
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }

    console.log(props.playlistLength)

    const handlePlay = () => {
        dispatch(getUri(props.uri))
    }

    const addTrackHandle =(playlistID:any,track:any)=>{
        spotifyApi.addTracksToPlaylist(playlistID, [track])
            .then(function(data:any) {
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
        props.parentCallback(props.playlistLength+1)
        setDisplay('none')
    }
    return(
        <div className={style.trackItem}
             style={{display:`${display}`}}
        >
            <PlayArrowIcon className={style.playIcon} onClick={handlePlay}/>
            <div className={style.trackContent}>
                <img src={props.imgUrl} alt="" className={style.img}/>
                <div className={style.trackInfo}>
                    <div className={style.trackName}>
                        {props.title}
                    </div>
                    <p className={style.description}>{props.artists.map((item:any,ind:number)=>{
                        return (
                            <NavLink
                                key={ind}
                                to={`/artist/${item.id}`}
                                className={style.artist}
                                onClick={()=>handleArtistClick(item?.id,item?.name)}
                                style={{textDecoration:"none",color:"#A7A7A7"}}
                            >
                                {
                                    (ind<props.artists.length-1) ?
                                        item.name + ", "
                                        :
                                        item.name
                                }
                            </NavLink>
                        )
                    })}</p>
                </div>
            </div>
            <div className={style.trackAlbum}>
                <NavLink
                    className={style.album}
                    to={`/album/${props.albumId}`}
                    style={{textDecoration:"none",color:"#A7A7A7"}}
                >
                    {props.album}
                </NavLink>
            </div>
            <div
                onClick={()=>addTrackHandle(props.playlistID.playlistID,props.uri)}
                className={style.addBtn}>
                add
            </div>
        </div>
    )
}