import React, {useEffect, useRef, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {spotifyApi} from "../../spotify/api";
// import style from "../playlist_details/PlaylistDetails.module.css";
import style from "./AlbumDetails.module.css"
import PopUp from "../../components/pop_up/edit_playlist/PopUp";
import FastAverageColor from "fast-average-color";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrackItemsLine from "../../components/items/track_items/line/TrackItemsLine";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import {
    getAlbumID,
    getAlbumName,
    getUri
} from "../../redux/actions/actions";

interface IAlbumDetails {
    spotify: any
}

const fac = new FastAverageColor();


export default function AlbumDetails(props: IAlbumDetails) {
    let albumId = useParams().albumID
    const dispatch = useDispatch();
    const [album, setAlbum] = useState<any>([])
    const [playlistThumb, setPlaylistThumb] = useState("")
    const [backgroundColor, getBackgroundColor] = useState<any>("");
    const [background, setBackground] = useState<any>("")
    const [offsetTop, setOffsetTop] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)
    const [artist, setArtist] = useState([])
    const [position, setPosition] = useState<any>("")
    const ref = useRef(null);


    function msToTime(ms: any) {
        let seconds: any = (ms / 1000).toFixed(1);
        let minutes: any = (ms / (1000 * 60)).toFixed(1);
        let hours: any = (ms / (1000 * 60 * 60)).toFixed(1);
        let days: any = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " secs";
        else if (minutes < 60) return minutes + " mins";
        else if (hours < 24) return hours + " hr";
        else return days + " Days";
    }


    useEffect(() => {
        spotifyApi.getAlbum(albumId)
            .then(function (data: any) {
                dispatch(getAlbumName(data?.body?.name))
                dispatch(getAlbumID(data?.body?.id))
                dispatch(getUri(data?.body?.uri))
                setAlbum(data?.body)
                setPlaylistThumb(data?.body?.images[0]?.url)
                setArtist(data.body.artists)
            }, function (err: any) {
                console.error(err);
            })
    }, [albumId])

    useEffect(() => {
        let handleScroll = () => {
            if (window.pageYOffset == 0 && window.pageYOffset < 336) {
                setPosition("static")
                setBackground("rgba(0,0,0,0)")
            } else if (window.pageYOffset >= 336 && window.pageYOffset <= (clientHeight + offsetTop - 180)) {
                setPosition("sticky")
                setBackground("rgba(33,33,33,1)")
            } else {
                setPosition("static")
                setBackground("rgba(0,0,0,0)")

            }
        }
        window.addEventListener("scroll", handleScroll);
    }, [clientHeight, offsetTop])

    useEffect(() => {
        // @ts-ignore
        setOffsetTop(ref?.current?.offsetTop)
        // @ts-ignore
        setClientHeight(ref?.current?.clientHeight)
        fac
            .getColorAsync(`${playlistThumb}`)
            .then((color) => {
                getBackgroundColor(color.hex);
            })
            .catch((e) => {
                console.log(e);
            });
    })

    const playIconClickedHandle = () => {
        dispatch(getUri(album.uri))
    }
    const timers = album?.tracks?.items
        && album?.tracks?.items.length > 0
        && album?.tracks?.items
            .map((item: any) => {
                return item?.duration_ms;
            })
            .reduce(
                (
                    previousValue: any,
                    currentValue: any,
                ) => {
                    return previousValue + currentValue;
                }
            );
    const handlePlay = () => {
        dispatch(getUri(album.uri))
    }
    return (
        <div className={style.container}>
            <div style={{backgroundColor: `${backgroundColor}` || '#444544'}} className={style.header}>
                <img
                    src={playlistThumb || 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2'}
                    alt="" className={style.headerImg}/>
                <div className={style.headerContent}>
                    <div className={style.headerType}>
                        {album?.type}
                    </div>
                    <div
                        className={style.headerName}
                        title={album?.name}
                    >{album?.name}</div>
                    <div className={style.headerDescription}>{album?.description}</div>
                    <div className={style.headerInfo}>
                        <p style={{fontWeight: 'bold'}}>
                            {
                                artist.map((artist: any, index: number) => {
                                    return <>
                                        {artist.name}
                                    </>
                                })
                            }
                        </p>
                        <p style={{fontWeight: 'bold'}}>&bull;{` ${album.total_tracks} ${album?.tracks?.total === 1 ? "song" : "songs"}`}</p>
                        <p style={{color: '#cbc6c6'}}>&bull; {msToTime(timers)}</p>
                    </div>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.artistOptions}>
                    <PlayCircleFilledWhiteIcon
                        onClick={playIconClickedHandle}
                        className={style.icon}/>
                </div>
                <div style={
                    // @ts-ignore
                    {position: `${position}`, top: '70px', zIndex: 1, backgroundColor: `${background}`}}
                     className={style.artistInfo}
                >
                    <div className={style.infoTitleBar}>
                        <div className={style.number}>#</div>
                        <div className={style.title}>TITLE</div>
                        <div className={style.durationIcon}>
                            <AccessTimeIcon className={style.durIcon}/>
                        </div>
                    </div>


                </div>
                <div className={style.trackItems} ref={ref}>
                    {album?.tracks?.items && album?.tracks?.items.length > 0 &&
                        album?.tracks?.items.map((item: any, index: number) => {
                            return (
                                <div className={style.trackLine}>
                                    <PlayArrowIcon className={style.playIcon} onClick={handlePlay}/>
                                    <div className={style.number}>{index + 1}</div>
                                    <div className={style.title}>
                                        <div>{item.name}</div>
                                        <p className={style.description}>{item?.artists.map((artist: any, ind: number) => {
                                            return (
                                                <NavLink
                                                    key={ind}
                                                    to={`/artist/${artist.id}`}
                                                    className={style.artist}
                                                    // onClick={()=>handleArtistClick(item?.id,item?.name)}
                                                    style={{textDecoration: "none", color: "#A7A7A7"}}
                                                >
                                                    {
                                                        (ind < item?.artists.length - 1) ?
                                                            artist.name + ", "
                                                            :
                                                            artist.name
                                                    }
                                                </NavLink>
                                            )
                                        })}</p>
                                    </div>
                                    <div className={style.durationIcon}>{item.duration_ms}</div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}