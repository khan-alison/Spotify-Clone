import React, {useEffect, useRef, useState} from 'react';
import style from "./ArtistDetails.module.css"
import {NavLink, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FastAverageColor from "fast-average-color";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {getArtistID, getArtistName, getUri} from "../../redux/actions/actions";
import {spotifyApi} from "../../spotify/api";
import {Dropdown} from 'react-bootstrap';
import AlbumItems from "../../components/items/album_items/AlbumItems";
import ArtistItems from "../../components/items/artist_items/ArtistItems";

const fac = new FastAverageColor();

interface IArtistDetails {
    spotify: any
}

function ArtistDetails(props: IArtistDetails) {
    let artistId = useParams().artistID
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.auth);
    const uri = useSelector((state: any) => state.auth.uri);
    const [headerHeight, setHeaderHeight] = useState(0)
    const [artistData, setArtistData] = useState<any>("");
    const [relatedArtist,setRelatedArtist] = useState([])
    const [tracksList, setTracksList] = useState<any>("");
    const [artistThumb, setArtistThumb] = useState("");
    const [artistAlbums,setArtistAlbums] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const [bgColor, setBgColor] = useState("");
    const [bgImg, setBgImg] = useState("");
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [isFlw, setIsFlw] = useState(false);
    const [isFar, setFar] = useState(false);
    const [seeMore,setSeeMore] = useState(false);
    const [showMoreAlbums,setShowMoreAlbums] = useState(false);
    const [showMoreArtists,setShowMoreArtists] = useState(false);

    const ref = useRef(null);

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
                setOpacity(1 - (window.pageYOffset / 300));
            } else {
                setOpacity(1);
            }
        }
        window.addEventListener("scroll", handleScroll);
        props.spotify.isFollowingArtists([artistId])
            .then(function (data: any) {
                let isFollowing = data.body;
                // @ts-ignore
                setIsFlw(isFollowing[0])
            }, function (err: any) {
                console.log('Something went wrong!', err);
            });

        spotifyApi.getArtist(artistId).then((artist: any) => {
            setArtistData(artist);
            console.log(artist.body)
            dispatch(getArtistID(artist.body.id))
            dispatch(getArtistName(artist.body.name))
            dispatch(getUri(artist.body.uri))
            setArtistThumb(artist?.body?.images[0]?.url)
        });

        spotifyApi.getArtistTopTracks(artistId, "VN").then((tracks: any) => {
            setTracksList(tracks);
        });

        setSeeMore(false)
        setShowMoreAlbums(false)
        setShowMoreArtists(false)


    }, [isFlw,artistId]);

    useEffect(()=>{
        spotifyApi.getArtistRelatedArtists(artistId)
            .then(function(data:any) {
                console.log(data.body.artists);
                if(showMoreArtists){
                    setRelatedArtist(data.body.artists)
                }else{
                    setRelatedArtist(data.body.artists.splice(0,5))
                }
            }, function(err:any) {
                console.log(err);
            });
    },[showMoreArtists,artistId])

    useEffect(()=>{
        spotifyApi.getArtistAlbums(artistId).then(
            function(data:any) {
                if(showMoreAlbums){
                    setArtistAlbums(data.body.items.splice(0,10))
                }else{
                    setArtistAlbums(data.body.items.splice(0,5))
                }
                console.log('Artist albums', data.body.items);
            },
            function(err:any) {
                console.error(err);
            }
        );
    },[showMoreAlbums,artistId])

    useEffect(()=>{
        spotifyApi.getArtistTopTracks(artistId, 'US')
            .then((data: any) => {
                if(seeMore){
                    setArtistTopTracks(data.body.tracks)
                }else{
                    setArtistTopTracks(data.body.tracks.splice(0, 5))
                }
            }, (err: any) => {
                console.log('Something went wrong!', err);
            });
    },[seeMore,artistId])

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

    const handleClick = (id:any) => {
        spotifyApi.containsMySavedTracks([id])
            .then((data:any) => {

                // An array is returned, where the first element corresponds to the first track ID in the query
                var trackIsInYourMusic = data.body[0];

                if (trackIsInYourMusic) {
                    setFar(true)
                } else {
                    setFar(false)
                }
            }, (err:any) => {
                console.log('Something went wrong!', err);
            });
    }

    const seeMoreHandle = () => {
        setSeeMore(!seeMore)
        console.log('data.body.tracks_results')
    }

    const showMoreAlbumHandle =()=>{
        setShowMoreAlbums(!showMoreAlbums)
    }

    const showMoreArtistHandle = ()=>{
        setShowMoreArtists(!showMoreArtists)
    }

    const handleUnfollowClick = (event: any) => {
        if (event.currentTarget.textContent == "Follow") {
            spotifyApi.followArtists([artistId])
                .then((data: any) => {
                    setIsFlw(true)
                }, (err: any) => {
                    console.log('Something went wrong!', err);
                });
        } else {
            spotifyApi.unfollowArtists([artistId])
                .then(function (data: any) {
                    setIsFlw(false)
                }, function (err: any) {
                    console.log('Something went wrong!', err);
                });
        }
    }

    const unlikedHandle = (id:string) =>{
        spotifyApi.removeFromMySavedTracks([id])
            .then(function(data:any) {
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
    }

    const likeHandle = (id:string)=>{
        spotifyApi.addToMySavedTracks([id])
            .then(function(data:any) {
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
    }


    return (
        <div className={style.container}>
            <div
                ref={ref}
                className={style.header}
                style={{
                    backgroundImage: `url(${artistThumb})`,
                    backgroundSize: "",
                    opacity: `${opacity}`
                }}
            >
                <div className={style.headerInfo}>
                    <h2>{artistData?.body?.name}</h2>
                    <div>{artistData?.body?.followers?.total} follower</div>
                </div>
            </div>
            <div className={style.body} style={{backgroundImage: `linear-gradient(${bgColor},#222221)`}}>
                <div className={style.artistOptions}>
                    <PlayCircleFilledWhiteIcon className={style.icon} onClick={()=>{
                       dispatch(getUri(uri))
                        console.log(data)

                    }}/>
                    <div
                        onClick={handleUnfollowClick}
                        className={style.flwBtn}
                    >{isFlw ? "Following" : "Follow"}</div>
                </div>
                <div className={style.popular}>
                    <h4>Popular</h4>
                    <div className={style.popularContainer}>
                        {
                            artistTopTracks.map((track: any, index: number) => {
                                return (
                                    <div key={index} className={style.popularItem} onMouseEnter={()=>handleClick(track.id)}>
                                        <div className={style.popularContent}>
                                            <div className={style.number}>{index + 1}</div>
                                            <PlayArrowIcon className={style.playIcon}/>
                                            <img className={style.image} src={track.album.images[0].url} alt=""/>
                                            <div className={style.name}>{track.name}</div>
                                        </div>
                                        <div className={style.popularity}>
                                            {track.popularity}
                                        </div>
                                        <div className={style.actions}>
                                            {isFar ?<FavoriteIcon onMouseDown={()=>unlikedHandle(track.id)} onMouseUp={()=>handleClick(track.id)} className={style.farIcon}/> :<FavoriteBorderIcon onMouseUp={()=>handleClick(track.id)} onMouseDown={()=>likeHandle(track.id)} className={style.farIcon}/>}
                                            <div className={style.duration_ms}>{msToTime(track.duration_ms)}</div>
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
                            })
                        }
                    </div>
                    <div  className={style.seeMore} onClick={seeMoreHandle}>
                        {seeMore ? "show less": "see more"}
                    </div>

                </div>
                <div className={style.album}>
                    <div className={style.albumHeader}>
                        <h4>Albums</h4>
                        <div  className={style.seeMore} onClick={showMoreAlbumHandle}>
                            {showMoreAlbums ? "show less": "see more"}
                        </div>
                    </div>
                    <div className={style.albumContainer}>
                        {
                            artistAlbums.map((album:any,index:number)=>{
                                return <AlbumItems
                                    imgUrl={album.images[0].url}
                                    name={album.name}
                                    id={album.id}
                                    artists={album.artists}
                                    uri={album.uri}
                                />
                            })
                        }
                    </div>

                </div>
                <div className={style.relatedArtists}>
                    <div className={style.artistHeader}>
                        <h4>Fans also like</h4>
                        <div  className={style.seeMore} onClick={showMoreArtistHandle}>
                            {showMoreArtists ? "show less": "see all"}
                        </div>
                    </div>
                    <div className={style.artistContainer}>
                        {
                            relatedArtist.map((artist:any,index:number)=>{
                                return (
                                    <ArtistItems artistName={artist.name}
                                    imageUrl={artist.images[0].url}
                                    artistId={artist.id} type={artist.type} uri={artist.uri}
                                    isFar={isFar}/>
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