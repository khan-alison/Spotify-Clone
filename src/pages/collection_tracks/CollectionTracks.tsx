import React, {useEffect, useRef, useState} from "react";
// import style from "../albums_details/AlbumDetails.module.css";
import style from "./CollectionTracks.module.css"
import {spotifyApi} from "../../spotify/api";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrackItemsLine from "../../components/items/track_items/line/TrackItemsLine";
import FastAverageColor from "fast-average-color";
import CollectionsTrackItemsLine from "../../components/items/track_items/collections/CollectionsTrackItemsLine";
import {useSelector} from "react-redux";

interface ICollectionTracks {
    spotify: any
}

const fac = new FastAverageColor();


export default function CollectionTracks(props:ICollectionTracks){
    const [savedTracks,setSavedTracks] = useState([])
    const [length,setLength] = useState(0)
    const ref = useRef(null);
    const data = useSelector((state:any)=>state.auth)

    const [position, setPosition] = useState<any>("")
    const [offsetTop, setOffsetTop] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)
    const [background, setBackground] = useState<any>("")


    useEffect(()=>{
        spotifyApi
            .getMySavedTracks({
                limit: 50,
                offset: 0,
            })
            .then((myPlaylist: any) => {
                setLength(myPlaylist.body.total)
                setSavedTracks(myPlaylist.body.items)
            });
    },[length])
    function msToTime(ms: any) {
        let seconds: any = (ms / 1000).toFixed(1);
        let minutes: any = (ms / (1000 * 60)).toFixed(1);
        let hours: any = (ms / (1000 * 60 * 60)).toFixed(1);
        let days: any = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " sec";
        else if (minutes < 60) return minutes;
        else if (hours < 24) return hours + " hr";
        else return days + " Days";
    }

    function formatDate(date: any) {
        function monthName(mon: any) {
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mon - 1];
        }

        const time = date.toString().slice(0, 10).split("-")
        const year = time[0]
        const month = time[1]
        const day = time[2]
        return `${monthName(month)} ${day}, ${year}`
    }

    const callbackDelete = (childata:any)=>{
        console.log(childata)
        setLength(childata)
    }


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

    })
    return(
        <div className={style.container}>
            <div className={style.header}>
                <img
                    src={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'}
                    alt="" className={style.headerImg}/>
                <div className={style.headerContent}>
                    <div className={style.headerType}>
                        playlist
                    </div>
                    <div
                        className={style.headerName}
                    >Favorite</div>
                    <div className={style.headerInfo}>
                        <p style={{fontWeight: 'bold'}}>{data.user.display_name} &bull;{` ${length} ${length === 1 ? "song" : "songs"}`}</p>
                    </div>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.artistOptions}>
                    <PlayCircleFilledWhiteIcon
                        // onClick={playIconClickedHandle}
                        className={style.icon}/>
                </div>
                <div style={
                    // @ts-ignore
                    {position: `${position}`, top: '70px', zIndex: 1, backgroundColor: `${background}`}}
                     className={style.artistInfo}>
                    <div className={style.infoTitleBar}>
                        <div className={style.number}>#</div>
                        <div className={style.title}>TITLE</div>
                        <div className={style.album}>ALBUM</div>
                        <div className={style.dateAdded}>DATE ADDED</div>
                        <div className={style.durationIcon}>
                            <AccessTimeIcon className={style.durIcon}/>
                        </div>
                    </div>
                </div>
                <div className={style.trackItems} ref={ref}>
                    {   savedTracks && savedTracks.length >0 &&
                        savedTracks.map((item: any, index: number) => {
                            return (
                                <CollectionsTrackItemsLine
                                    key={index}
                                    imgUrl={item.track.album.images[0].url}
                                    title={item.track.name}
                                    album={item.track.album.name}
                                    id={item.track.id}
                                    index={index}
                                    albumId={item.track.album.id}
                                    artists={item?.track?.artists}
                                    date_added={formatDate(item.added_at)}
                                    ms_duration={msToTime(item.track.duration_ms)}
                                    uri={item.track.uri}
                                    playlistLength={length}
                                    parentCallback={callbackDelete}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}