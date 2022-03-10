import React, {useState} from "react";
import style from "./TracksResults.module.css"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Dropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {spotifyApi} from "../../../../../spotify/api";
import {getArtistID, getArtistName, getUri} from "../../../../../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";

interface ITracksResult {
    imageUrl: string,
    name: string,
    uri: string,
    durations: string,
    id: string,
    artists: [],
}

export default function TracksResults(props: ITracksResult) {
    const dispatch = useDispatch();
    const [isFar, setFar] = useState(false);
    const data = useSelector((state: any) => state.auth)

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

    const unlikedHandle = (id: string) => {
        spotifyApi.removeFromMySavedTracks([id])
            .then(function (data: any) {
            }, function (err: any) {
                console.log('Something went wrong!', err);
            });
    }

    const likeHandle = (id: string) => {
        spotifyApi.addToMySavedTracks([id])
            .then(function (data: any) {
            }, function (err: any) {
                console.log('Something went wrong!', err);
            });
    }

    function msToTime(ms: any) {
        let seconds: any = (ms / 1000).toFixed(1);
        let minutes: any = (ms / (1000 * 60)).toFixed(1);
        let hours: any = (ms / (1000 * 60 * 60)).toFixed(1);
        let days: any = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " sec";
        else if (minutes < 60) return minutes + " ms";
        else if (hours < 24) return hours + " hr";
        else return days + " Days";
    }

    const handleArtistClicked = (id: string, name: string, uri: any) => {
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }

    const handlePlay = () => {
        dispatch(getUri(props.uri))
    }

    return (
        <div className={style.container}>
            <div className={style.infor}>
                <PlayArrowIcon className={style.playIcon} onClick={handlePlay}/>
                <img className={style.image} src={props.imageUrl} alt=""/>
                <div className={style.content}>
                    <div className={style.name}>{props.name}</div>
                    <div className={style.description}>
                        {props.artists.map((item: any, index: number) => (
                            <NavLink
                                key={index}
                                to={`/artist/${item.id}`}
                                className={style.artist}
                                onClick={() => handleArtistClicked(item.id, item.name, item.uri)}
                                style={{textDecoration: "none", color: "#A7A7A7"}}
                            >
                                {
                                    (index < props.artists.length - 1) ?
                                        item.name + ", " : item.name
                                    // item.name
                                }

                            </NavLink>

                        ))}
                    </div>
                </div>
            </div>
            <div className={style.actions}>
                {isFar ? <FavoriteIcon
                        onMouseDown={() => unlikedHandle(props.id)}
                        onMouseUp={() => handleClick(props.id)}
                        className={style.farIcon}/> :
                    <FavoriteBorderIcon
                        onMouseUp={() => handleClick(props.id)}
                        onMouseDown={() => likeHandle(props.id)}
                        className={style.farIcon}/>}
                <div className={style.duration_ms}>{msToTime(props.durations)}</div>
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
                                style={{textDecoration: "none", color: "grey"}}
                                to={`/artist`}
                                onClick={() => {
                                    console.log("b")
                                    // props.spotify
                                    //     .getArtistAlbums(item?.track?.artists[0]?.id, {
                                    //         limit: 5,
                                    //     })
                                    //     .then((albums: any) => {
                                    //         dispatch(getArtistAlbums(albums.body.items));
                                    //     });
                                    // dispatch(getArtistId(item?.track?.artists[0]?.id));
                                }}
                            >
                                Go to artist
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item className={style.dropDownItems}>
                            <NavLink
                                style={{textDecoration: "none", color: "grey"}}
                                to={`/album`}
                                onClick={() => {
                                    console.log("a");
                                    // dispatch(getArtistId(item.track.album.artists[0].id));
                                    // dispatch(
                                    //     getAlbumImage(item.track.album.images[0].url)
                                    // );
                                }}
                            >
                                Go to album
                            </NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
    )
}