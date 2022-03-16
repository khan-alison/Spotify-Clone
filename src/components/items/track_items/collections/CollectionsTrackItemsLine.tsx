import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./CollectionsTrackItemsLine.module.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {useDispatch, useSelector} from "react-redux";
import {getArtistID, getArtistName, getUri} from "../../../../redux/actions/actions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {spotifyApi} from "../../../../spotify/api";
import {Dropdown} from "react-bootstrap";

interface ITrackItems {
    imgUrl: string;
    title: string;
    album: string;
    albumId:string;
    id: string;
    index:number;
    artists:[];
    uri:string;
    ms_duration:string;
    date_added:string;
    playlistId?:any;
    playlistLength:number;
    parentCallback?:any;
}


export default function CollectionsTrackItemsLine(props:ITrackItems){
    const dispatch = useDispatch();
    const data = useSelector((state:any)=>state.auth)
    const [isFar, setFar] = useState(false);

    useEffect(()=>{
        spotifyApi.containsMySavedTracks([props?.id])
            .then((data: any) => {
                var trackIsInYourMusic = data.body[0];
                if (trackIsInYourMusic) {
                    setFar(true)
                } else {
                    setFar(false)
                }
            }, (err: any) => {
                console.log('Something went wrong!', err);
            });
    },[])


    const handleClick = (id: any) => {
        spotifyApi.containsMySavedTracks([id])
            .then((data: any) => {

                // An array is returned, where the first element corresponds to the first track ID in the query
                var trackIsInYourMusic = data.body[0];

                if (trackIsInYourMusic) {
                    setFar(true)
                } else {
                    setFar(false)
                }
            }, (err: any) => {
                console.log('Something went wrong!', err);
            });
    }
    const handleArtistClick = (id:string,name:string)=>{
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }

    const handlePlayIconClick = (uri:any)=>{
        dispatch(getUri(uri))
        console.log(uri)
        console.log(data)
    }
    const handlePlay = () => {
        dispatch(getUri(props.uri))
        console.log(data)
    }

    const unlikedHandle = (id: string) => {
        spotifyApi.removeFromMySavedTracks([id])
            .then(function (data: any) {
            }, function (err: any) {
                console.log('Something went wrong!', err);
            });
        props.parentCallback(props.playlistLength-1)
    }


    const handleDeleteTrack = (uri:any,pID:any) => {
        var tracks = [{ uri : `${uri}` }];
        var playlistId = pID.playlistID;
        spotifyApi.removeTracksFromPlaylist(playlistId, tracks)
            .then(function(data:any) {
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
        props.parentCallback(props.playlistLength-1)
    }

    return(
        <div className={style.trackItem}>
            <PlayArrowIcon className={style.playIcon} onClick={handlePlay}/>
            <div className={style.trackNum}>{props.index + 1}</div>
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
            <div className={style.trackAdded}>{props.date_added}</div>
            <div className={style.trackDur}>
                 <FavoriteIcon
                        onMouseDown={() => unlikedHandle(props.id)}
                        onMouseUp={() => handleClick(props.id)}
                        className={style.farIcon}/>
                <div>
                    {props.ms_duration}
                </div>
                <Dropdown style={{display: "flex"}}>
                    <Dropdown.Toggle
                        className={style.userInfo}
                        style={{
                            display: "flex",
                            background: "none",
                            border: "none",
                            boxShadow: "none",
                        }}
                        variant="success"
                        id="dropdown-basic"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu style={{backgroundColor: "#333"}}>
                        <Dropdown.Item className={style.dropDownItems}>
                            <NavLink
                                style={{textDecoration: "none", color: "white"}}
                                to={`/artist`}
                                onClick={() => {
                                    console.log("b")
                                }}
                            >
                                Go to artist
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item className={style.dropDownItems}>
                            <NavLink
                                style={{textDecoration: "none", color: "white"}}
                                to={`/album/${props.albumId}`}

                                onClick={() => {
                                    console.log("a");
                                }}
                            >
                                Go to album
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item className={style.dropDownItems}>
                            <div
                                style={{ textDecoration: "none", color: "white" }}

                                onMouseDown={() => unlikedHandle(props.id)}
                                onMouseUp={() => handleClick(props.id)}
                            >
                                Remove form favorite playlist
                            </div>
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}