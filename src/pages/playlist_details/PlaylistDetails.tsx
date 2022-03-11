import React, {useEffect, useRef, useState} from "react";
import style from "./PlaylistDetails.module.css"
import useRouteMatch, {NavLink, useLocation, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {spotifyApi} from "../../spotify/api";
import {getPlaylistID, getPlaylistName, getUri, getUserPlaylist} from "../../redux/actions/actions";
import FastAverageColor from "fast-average-color";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface  IUserPlaylist{
    spotify:any
}
const fac = new FastAverageColor();


export default function  PlaylistDetails(props:IUserPlaylist){
    let playListId = useParams()
    const dispatch = useDispatch();
    const [userPlaylistData, getUserPlaylistData] = useState<any>([]);
    const imgUrl = useSelector((state: any) => state.auth.imageUrl)
    const data = useSelector((state: any) => state.auth)
    const [playlistThumb,setPlaylistThumb] = useState("")
    const [backgroundColor, getBackgroundColor] = useState<any>("");
    const [background,setBackground] = useState<any>("")
    const [position,setPosition] = useState<any>("")
    const [offsetTop,setOffsetTop] = useState(0)
    const [clientHeight,setClientHeigt] = useState(0)
    const ref = useRef(null);


    function msToTime(ms: any) {
        let seconds: any = (ms / 1000).toFixed(1);
        let minutes: any = (ms / (1000 * 60)).toFixed(1);
        let hours: any = (ms / (1000 * 60 * 60)).toFixed(1);
        let days: any = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " sec";
        else if (minutes < 60) return minutes + " min";
        else if (hours < 24) return hours + " hr";
        else return days + " Days";
    }

    useEffect(()=>{
        spotifyApi.getPlaylist(playListId.playlistID).then((playList: any) => {
            getUserPlaylistData(playList?.body);
            setPlaylistThumb(playList?.body?.images[0].url)
        });
        let handleScroll = () => {
            if(window.pageYOffset==0 && window.pageYOffset<336){
                setPosition("static")
                setBackground("rgba(0,0,0,0)")
            }else if(window.pageYOffset >=336 && window.pageYOffset<=(clientHeight+offsetTop)){
                setPosition("sticky")
                setBackground("rgba(33,33,33,1)")
            }else{
                setPosition("static")
                setBackground("rgba(0,0,0,0)")

            }
        }
        window.addEventListener("scroll", handleScroll);


    },[playListId])

    useEffect(()=>{
        // @ts-ignore
        setOffsetTop(ref?.current?.offsetTop)
        // @ts-ignore
        setClientHeigt(ref?.current?.clientHeight)
        fac
            .getColorAsync(`${playlistThumb}`)
            .then((color) => {
                getBackgroundColor(color.hex);
            })
            .catch((e) => {
                console.log(e);
            });
    },)
    const timers = userPlaylistData?.tracks?.items
        .map((item: any) => {
            return item.track.duration_ms;
        })
        .reduce(
            (
                previousValue: any,
                currentValue: any,
            ) => {
                return previousValue + currentValue;
            }
        );

    const playIconClickedHandle = () =>{
        console.log(data)
        dispatch(getUri(userPlaylistData.uri))
    }


    return(
        <div className={style.container}>
            <div style={{backgroundColor:`${backgroundColor}`}} className={style.header}>
                <img src={playlistThumb} alt="" className={style.headerImg}/>
                <div className={style.headerContent}>
                    <div className={style.headerType}>
                        {userPlaylistData?.type}
                    </div>
                    <div className={style.headerName}>{userPlaylistData?.name}</div>
                    <div className={style.headerDescription}>{userPlaylistData?.description}</div>
                    <div className={style.headerInfo}>
                        <p style={{fontWeight:'bold'}}>{userPlaylistData?.owner?.display_name}</p>
                        <p style={{fontWeight:'bold'}}>&bull;{` ${userPlaylistData?.tracks?.total} ${userPlaylistData?.tracks?.total === 1? "song":"songs"}`}</p>
                        <p style={{color:'#C7B7B7'}}>&bull; {msToTime(timers)}</p>
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
                    {position: `${position}`,top:'70px',backgroundColor:`${background}`}} className={style.artistInfo}>
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
                    {
                        userPlaylistData?.tracks?.items.map((item:any,index:number)=>{
                            return(
                                <div  className={style.trackItem}  >
                                    <div className={style.trackNum}>{index+1}</div>
                                    <div className={style.trackName}>{item.track.name}</div>
                                    <div className={style.trackAlbum}>{item.track.album.name}</div>
                                    <div className={style.trackAdded}>{item.added_at}</div>
                                    <div className={style.trackDur}>{msToTime(item.track.duration_ms)}</div>
                                </div>
                            )
                        })
                    }
                </div>

                {/*<img src={userPlaylistData?.images[0]?.url} alt=""/>*/}
            </div>
        </div>
    )
}