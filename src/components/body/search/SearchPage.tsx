import React, {useEffect, useState} from "react";
import style from "./SearchPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {spotifyApi} from "../../../spotify/api";
import SearchRecommendation from "./seach_recommendation/SearchRecommendation";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlaylistResults from "./search_results/playlist_results/PlaylistResults";
import {NavLink} from "react-router-dom";
import {getArtistID, getArtistName} from "../../../redux/actions/actions";
import ArtistItems from "../../items/artist_items/ArtistItems";
import TracksResults from "./search_results/tracks_results/rs_search/TracksResults";


export default function Search() {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    const searchMessage = useSelector((state: any) => state.auth.searchMessage)
    const [topSearch,setTopSearch] = useState([])
    const [searchTrackResult, setSearchTrackResult] = useState([]);
    const [searchArtistResult, setSearchArtistResult] = useState([]);
    const [searchPlaylistResult,setSearchPlaylistResult] = useState([])
    const [showMorePlaylists,setShowMorePlaylists] = useState(false);
    const [showMoreArtists,setShowMoreArtists] = useState(false);


    useEffect(() => {
        setMessage(searchMessage +"")
        spotifyApi.searchTracks(searchMessage).then((data: any) => {
            setSearchTrackResult(data?.body?.tracks?.items)
        });

    }, [searchMessage]);

    useEffect(()=>{
        spotifyApi.searchArtists(searchMessage)
            .then(function (data: any) {
                setTopSearch(data?.body?.artists?.items.splice(0,1))
                if(showMoreArtists){
                    setSearchArtistResult(data?.body?.artists?.items)
                }else{
                    setSearchArtistResult(data?.body?.artists?.items.splice(0,5))
                }
            }, (err: any) => {
                console.error(err);
            });
    },[showMoreArtists,searchMessage])

    useEffect(()=>{
        spotifyApi.searchPlaylists(searchMessage)
            .then((data:any) => {
                if (showMorePlaylists){
                    setSearchPlaylistResult(data?.body?.playlists?.items)
                }else{
                    setSearchPlaylistResult(data?.body?.playlists?.items?.splice(0,5))
                }
            }, (err:any) => {
                console.error( err);
            });
    },[showMorePlaylists,searchMessage])
    const handlePlayIconClick = ()=>{
        console.log("a")
    }

    const handleClick = (id:string,name:string)=>{
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }


    const showMoreAlbumHandle =()=>{
        setShowMorePlaylists(!showMorePlaylists)
    }

    const showMoreArtistsHandle=()=>{
        setShowMoreArtists(!showMoreArtists)
    }
    return (
        <div className={style.container}>
            {message ? (
                <div className={style.result}>
                    <div className={style.resultsContainer}>
                        <div className={style.resultsHeader}>
                            <div className={style.topResult}>
                                <h4>
                                    Top Result
                                </h4>
                                    {
                                        topSearch.map((item:any,index:number)=>{
                                            return (
                                                <div className={style.topResultContainer}>
                                                    <NavLink to={`/artist/${item.id}`}
                                                             onClick={()=>handleClick(item.id,item.name)}
                                                             style={{textDecoration:"none",color:"white"}}
                                                             >
                                                        <img src={item?.images[0]?.url} className={style.image} alt=""/>
                                                        {/*<div className={style.imageLayout}*/}
                                                        {/*     style={{backgroundImage:`url(${item.images[0].url})`}}>*/}
                                                        {/*</div>*/}
                                                        <div>
                                                            <h2>{item.name}</h2>
                                                            <div style={{textTransform:"capitalize"}}>{item.type}</div>
                                                        </div>

                                                    </NavLink>
                                                    <PlayCircleFilledWhiteIcon
                                                        onClick={handlePlayIconClick}
                                                        className={style.icon}/>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                            <div className={style.tracksResult}>
                                <h4>
                                    Tracks Result
                                </h4>
                                <div className={style.trackResultContainer}>
                                    {   searchTrackResult && searchTrackResult.length>0 &&
                                        searchTrackResult.map((track:any,index:number)=>{
                                            return (
                                                <TracksResults
                                                    imageUrl={track?.album?.images[0]?.url}
                                                    name={track.name}
                                                    uri={track.uri}
                                                    durations={track.duration_ms}
                                                    id={track.id}
                                                    artists={track.artists}
                                                />
                                            )

                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={style.playlistResult}>

                            {/*<PlaylistResults/>*/}
                            <div className={style.albumHeader}>
                                <h4>
                                    Playlist Result
                                </h4>
                                <div  className={style.seeMore} onClick={showMoreAlbumHandle}>
                                    {showMorePlaylists ? "show less": "see more"}
                                </div>
                            </div>
                            <div className={style.playlistContainer}>
                                {  searchPlaylistResult && searchPlaylistResult.length >0 &&
                                    searchPlaylistResult.map((playlist:any,index:number)=>{
                                        return(
                                            <PlaylistResults
                                                playlistId={playlist.id}
                                                playlistName={playlist.name}
                                                playlistUri={playlist.uri}
                                                imageUrl={playlist?.images[0]?.url}
                                                description={playlist.description}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={style.artistsResult}>

                            <div className={style.albumHeader}>
                                <h4>
                                    Artist Result
                                </h4>
                                <div  className={style.seeMore} onClick={showMoreArtistsHandle}>
                                    {showMoreArtists ? "show less": "see more"}
                                </div>
                            </div>
                            <div className={style.artistsContainer}>
                                {
                                    searchArtistResult.map((artist:any,index:number)=>{
                                        return(
                                            <ArtistItems
                                                artistName={artist.name}
                                                imageUrl={artist?.images[0]?.url}
                                                artistId={artist.id} type={artist.type} uri={artist.uri}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : (

                <SearchRecommendation/>
            )}
        </div>
    )
}