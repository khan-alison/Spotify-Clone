import React, {useEffect, useRef, useState} from "react";
import style from "./PlaylistDetails.module.css"
import useRouteMatch, {NavLink, useLocation, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import {spotifyApi} from "../../spotify/api";
import {
    getArtistID,
    getArtistName,
    getPlaylistID,
    getPlaylistName,
    getUri,
    getUserPlaylist, searchOnType
} from "../../redux/actions/actions";
import FastAverageColor from "fast-average-color";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackItemsLine from "../../components/items/track_items/line/TrackItemsLine";
import Recommendation from "../../components/items/recommendation_items/Recommendation";
import ClearIcon from "@mui/icons-material/Clear";
import TracksResults from "../../components/body/search/search_results/tracks_results/rs_search/TracksResults";
import PopUp from "../../components/pop_up/edit_playlist/PopUp";
import PopUpDel from "../../components/pop_up/delete_cf/PopUpDel";
// import PopUp from "../../components/pop_up/PopUp";
// import TracksResults from "../../components/body/search/search_results/tracks_results/TracksResults";

interface IUserPlaylist {
    spotify: any
}

const fac = new FastAverageColor();


export default function PlaylistDetails(props: IUserPlaylist) {
    let playListId = useParams()
    const dispatch = useDispatch();
    const [userPlaylistData, getUserPlaylistData] = useState<any>([]);
    const imgUrl = useSelector((state: any) => state.auth.imageUrl)
    const data = useSelector((state: any) => state.auth)
    const [playlistThumb, setPlaylistThumb] = useState("")
    const [backgroundColor, getBackgroundColor] = useState<any>("");
    const [background, setBackground] = useState<any>("")
    const [position, setPosition] = useState<any>("")
    const [offsetTop, setOffsetTop] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)
    const [recommendation, setRecommendations] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [findMore, setFindMore] = useState(false)
    const [playListLength, setPlaylistLength] = useState(0)
    const ref = useRef(null);
    const [search, setSearch] = useState("");
    const [searchTrackResult, setSearchTrackResult] = useState([]);
    const [isOpen,setIsOpen] = useState(false)
    // const a = state.count
    const handleClose = (data: any) => {
        setIsOpen(data);
    }




    const handleClick = (id: string, name: string) => {
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }


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

    useEffect(() => {
        spotifyApi.getPlaylist(playListId.playlistID).then((playList: any) => {
            getUserPlaylistData(playList?.body);
            setPlaylistThumb(playList?.body?.images[0]?.url || 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2')
            setPlaylistLength(playList?.body?.tracks?.total)
        });
        setFindMore(false)
        setSearch('')
        setSearchTrackResult([])
    }, [playListId, playListLength])

    useEffect(() => {
        spotifyApi.getPlaylist(playListId.playlistID).then((playList: any) => {
            dispatch(getPlaylistName(playList?.body?.name))
            dispatch(getPlaylistID(playList?.body?.id))
            dispatch(getUri(playList?.body?.uri))
            spotifyApi.getRecommendations({
                min_energy: 0.4,
                seed_artists: [playList?.body?.tracks?.items[0]?.track?.artists[0]?.id, playList?.body?.tracks?.items[1]?.track?.artists[0]?.id],
                min_popularity: 50
            })
                .then(function (data: any) {
                    let recommendations = data.body;
                    setRecommendations(recommendations.tracks.splice(0, 10))
                }, function (err: any) {
                    console.log("Something went wrong!", err);
                });
        });
    }, [refresh])

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
    const timers = userPlaylistData?.tracks?.items
        && userPlaylistData?.tracks?.items.length > 0
        && userPlaylistData?.tracks?.items
        .map((item: any) => {
            return item?.track?.duration_ms;
        })
        .reduce(
            (
                previousValue: any,
                currentValue: any,
            ) => {
                return previousValue + currentValue;
            }
        );

    const playIconClickedHandle = () => {
        console.log(data)
        dispatch(getUri(userPlaylistData.uri))
    }

    const refreshHandle = () => {
        setRefresh(!refresh)
        console.log(refresh)
    }

    const findMoreHandle = () => {
        setFindMore(!findMore)
        console.log(findMore)
    }

    const callbackFunction = (childData: any) => {
        console.log(childData)
        setPlaylistLength(childData)
    }

    const callbackDelete = (childData:any) => {
        console.log(childData)
        setPlaylistLength(childData)
    }

    const searchHandle = (event: any) => {
        setSearch(event.target.value)
        if(event.target.value == ''){
            setSearchTrackResult([])
        }
    }

    const clearHandle = () =>{
        setSearch('')
        setSearchTrackResult([])
    }

    const unfindHandle = ()=>{
        setFindMore(false)
        setSearch('')
        setSearchTrackResult([])
    }

    useEffect(() => {
        setSearch(search +"")
        spotifyApi.searchTracks(search).then((data: any) => {
            console.log(data?.body?.tracks?.items)
            setSearchTrackResult(data?.body?.tracks?.items)
        });

    }, [search]);

    return (
        <div className={style.container}>
            <div style={{backgroundColor: `${backgroundColor}`|| '#444544'}} className={style.header}>
                <img src={playlistThumb || 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2'} alt="" className={style.headerImg}/>
                <div className={style.headerContent}>
                    <div className={style.headerType}>
                        {userPlaylistData?.type}
                    </div>
                    <div
                        className={style.headerName}
                         onClick={() => setIsOpen(true)}
                    >{userPlaylistData?.name}</div>
                    <PopUp open={isOpen} playlistId={playListId} onClose={handleClose} currName={userPlaylistData?.name}/>
                    <div className={style.headerDescription}>{userPlaylistData?.description}</div>
                    <div className={style.headerInfo}>
                        <p style={{fontWeight: 'bold'}}>{userPlaylistData?.owner?.display_name}</p>
                        <p style={{fontWeight: 'bold'}}>&bull;{` ${playListLength} ${userPlaylistData?.tracks?.total === 1 ? "song" : "songs"}`}</p>
                        <p style={{color: '#cbc6c6'}}>&bull; {msToTime(timers||0)}</p>
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
                    {   userPlaylistData?.tracks?.items && userPlaylistData?.tracks?.items.length >0 &&
                        userPlaylistData?.tracks?.items.map((item: any, index: number) => {
                            return (
                                <TrackItemsLine
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
                                    playlistId={playListId}
                                    playlistLength={playListLength}
                                    parentCallback={callbackDelete}
                                />
                            )
                        })
                    }
                    {
                        findMore ? (<div></div>):(
                            <div
                                style={{marginTop: '30px'}}
                                className={style.refresh}
                                onClick={findMoreHandle}>
                                <div className={style.refBtn}>Find more</div>
                            </div>
                        )
                    }
                </div>
                {
                    !findMore ? (
                            <>
                                <div className={style.recommendationContainer}>
                                    <h4>Recommendation</h4>
                                    {   recommendation && recommendation.length > 0 &&
                                        recommendation.map((item: any, index: number) => {
                                            return (
                                                <Recommendation
                                                    key={index}
                                                    imgUrl={item.album.images[0].url}
                                                    title={item.name}
                                                    album={item.album.name}
                                                    albumId={item.album.id} id={item.id}
                                                    index={index} artists={item.artists}
                                                    uri={item.uri}
                                                    playlistID={playListId}
                                                    playlistLength={userPlaylistData?.tracks?.total}
                                                    parentCallback={callbackFunction}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                <div
                                    className={style.refresh}
                                    onClick={refreshHandle}>
                                    <div className={style.refBtn}>Refresh</div>
                                </div>
                            </>
                    ): 
                        <>
                            <hr/>
                            <div className={style.searchContainer}>
                                <div className={style.searchHeader}>
                                    <h4>Let's find something for your playlist</h4>
                                    <ClearIcon
                                        className={style.clearIcon}
                                        onClick={unfindHandle}
                                    />
                                </div>
                                <div className={style.search}>
                                    <label htmlFor="searchInput">
                                        <SearchIcon className={style.searchIcon}/>
                                    </label>
                                    <input
                                        id="searchInput"
                                        type="text"
                                        autoComplete="off"
                                        className={style.searchInput}
                                        placeholder="Artists, songs, or podcasts"
                                        value={search}
                                        onChange={searchHandle}
                                        // onBlur={onBlur}
                                    >
                                    </input>
                                    {
                                        search ? (
                                            <ClearIcon
                                                className={style.clearIcon}
                                                onClick={clearHandle}
                                            />
                                        ): <div></div>
                                    }
                                </div>
                                <div className={style.trackResultContainer}>
                                    {   searchTrackResult && searchTrackResult.length>0 &&
                                        searchTrackResult.map((track:any,index:number)=>{
                                            return (
                                                <Recommendation
                                                    key={index}
                                                    imgUrl={track?.album?.images[0]?.url}
                                                    title={track.name}
                                                    album={track?.album?.name}
                                                    albumId={track?.album?.id}
                                                    id={track.id}
                                                    index={index} artists={track.artists} uri={track.uri} playlistID={playListId}
                                                    playlistLength={playListLength}
                                                    parentCallback={callbackFunction}
                                                />
                                            )

                                        })
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}