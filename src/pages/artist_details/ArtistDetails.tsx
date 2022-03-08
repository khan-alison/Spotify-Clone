import React, {useEffect, useRef, useState} from 'react';
import style from "./ArtistDetails.module.css"
import {NavLink, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FastAverageColor from "fast-average-color";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {getArtistID, getArtistName} from "../../redux/actions/actions";
import {spotifyApi} from "../../spotify/api";
import { Dropdown } from 'react-bootstrap';

const fac = new FastAverageColor();

interface IArtistDetails{
    spotify:any
}

function ArtistDetails(props:IArtistDetails) {
    let artistId = useParams().artistID
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.auth);
    const [headerHeight, setHeaderHeight] = useState(0)
    const [artistData, getArtistData] = useState<any>("");
    const [tracksList, getTracksList] = useState<any>("");
    const [artistThumb,setArtistThumb] = useState("")
    const [opacity,setOpacity] =useState(1)
    const [bgColor,setBgColor] = useState("")
    const [bgImg,setBgImg] = useState("")
    const [artistTopTracks,setArtistTopTracks] = useState([])
    const [isFlw,setIsFlw] = useState(false)
    const ref = useRef(null)

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

    useEffect(() => {
        let handleScroll = () => {
            if (window.pageYOffset == 0) {
                setOpacity(1);
            } else if (window.pageYOffset > 0 && window.pageYOffset < 300) {
                setOpacity(1-(window.pageYOffset/300));
            }
            else {
                setOpacity(1);
            }
        }
        window.addEventListener("scroll", handleScroll);
        props.spotify.isFollowingArtists([artistId])
            .then(function(data:any) {
                let isFollowing = data.body;
                    // @ts-ignore
                    setIsFlw(isFollowing[0])
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });

        props.spotify.getArtist(artistId).then((artist: any) => {
            getArtistData(artist);
            setArtistThumb(artist?.body?.images[0]?.url)
        });
        spotifyApi.getArtistTopTracks(artistId, 'US')
            .then((data:any) => {
                console.log(data.body.tracks);
                setArtistTopTracks(data.body.tracks.splice(0,5))
            }, (err:any) => {
                console.log('Something went wrong!', err);
            });
        props.spotify.getArtistTopTracks(artistId, "VN").then((tracks: any) => {
            getTracksList(tracks);
        });


    }, [isFlw]);

    useEffect(() => {
        // @ts-ignore
        setHeaderHeight(ref.current.clientHeight)
        fac
            .getColorAsync(artistThumb)
            .then((color) => {
                setBgColor(color.rgba)
            })
            .catch((e) => {
                console.log(e);
            });
    },)

    const handleUnfollowClick = (event:any)=>{
        if(event.currentTarget.textContent == "Follow"){
            spotifyApi.followArtists([artistId])
                .then((data:any) => {
                    setIsFlw(true)
                }, (err:any) => {
                    console.log('Something went wrong!', err);
                });
        }else{
            spotifyApi.unfollowArtists([artistId])
                .then(function(data:any) {
                    setIsFlw(false)
                }, function(err:any) {
                    console.log('Something went wrong!', err);
                });
        }
    }

    return (
        <div className={style.container}>
            <div
                ref={ref}
                className={style.header}
                style={{
                    backgroundImage: `url(${artistThumb})`,
                    backgroundSize:"",
                    opacity:`${opacity}`
                }}
            >
                <div className={style.headerInfo}>
                    <h2>{artistData?.body?.name}</h2>
                    <div>{artistData?.body?.followers?.total} follower</div>
                </div>
            </div>
            <div className={style.body} style={{backgroundImage:`linear-gradient(${bgColor},#222221)`}}>
                <div className={style.artistOptions}>
                    <PlayCircleFilledWhiteIcon className={style.icon}/>
                    <div
                        onClick={handleUnfollowClick}
                        className={style.flwBtn}
                    >{isFlw ? "Following" : "Follow"}</div>
                </div>
                <div className={style.popular}>
                    <h4>Popular</h4>
                    <div className={style.popularContainer}>
                        {
                            artistTopTracks.map((track:any,index:number)=>{
                                return(
                                    <div key={index} className={style.popularItem}>
                                        <div className={style.popularContent}>
                                            <div>{index+1}</div>
                                            <img className={style.image} src={track.album.images[0].url} alt=""/>
                                            <div className={style.name}>{track.name}</div>
                                        </div>
                                        <div className={style.popularity}>
                                            {track.popularity}
                                        </div>
                                        <div className={style.actions}>
                                            <FavoriteBorderIcon className={style.farIcon}/>
                                            <div className={style.duration_ms}>{msToTime(track.duration_ms)}</div>
                                            <Dropdown style={{ display: "flex" }}>
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
                                                            style={{ textDecoration: "none", color: "grey" }}
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
                                                            style={{ textDecoration: "none", color: "grey" }}
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
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ArtistDetails;