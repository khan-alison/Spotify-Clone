import React, {useEffect, useReducer, useState} from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./ArtistItems.module.css"
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import {spotifyApi} from "../../../spotify/api";
import {getArtistID, getArtistName} from "../../../redux/actions/actions";
import {useDispatch} from "react-redux";
import {log} from "util";

interface ITrackItems {
    artistName: string;
    imageUrl: string;
    artistId: string;
    type:string;
    uri:string;
    parentCallback:any;
}


export default function ArtistItems(props:ITrackItems){
    const [flwArtist,setFlwArtist] = useState([]);
    const [flwLength,setFlwLength] = useState(0)
    const dispatch = useDispatch();

    const handleUnfollowClick = ()=>{
        spotifyApi.getFollowedArtists({ limit : 30 })
            .then((data:any) => {
                // console.log(data.body.artists.items.length)
                setFlwArtist(data.body.artists.items)
                setFlwLength(data.body.artists.items.length)
                props.parentCallback(`${flwLength}`)
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
        spotifyApi.unfollowArtists([props.artistId])
            .then(function(data:any) {
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
    }

    const handleClick = (id:string,name:string)=>{
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }

    const handlePlayIconClick = ()=>{
        console.log("a")
    }

    return(
        <div className={style.container} >
            <NavLink to={`/artist/${props.artistId}`}
                // @ts-ignore
                     onClick={()=>handleClick(props.artistId,props.artistName)} style={{textDecoration:"none",color:"white"}} >
                <img className={style.img} src={props.imageUrl} alt=""/>

                <h5 className={style.name}>{props.artistName}</h5>
                <p className={style.description}>{props.type} </p>
            </NavLink>
            <HeartBrokenIcon
                className={style.unlikeIcon}
                onClick={handleUnfollowClick}
            />
            <PlayCircleFilledWhiteIcon
                onClick={handlePlayIconClick}
                className={style.icon}/>
        </div>
    )
}