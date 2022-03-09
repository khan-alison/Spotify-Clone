import React, {useEffect, useState} from "react";
import style from "./SearchPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {spotifyApi} from "../../../spotify/api";
import SearchRecommendation from "./seach_recommendation/SearchRecommendation";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import TracksResults from "./search_results/tracks_results/TracksResults";
import ArtistsResults from "./search_results/artists_results/ArtistsResults";
import PlaylistResults from "./search_results/playlist_results/PlaylistResults";
import {NavLink} from "react-router-dom";
import {getArtistID, getArtistName} from "../../../redux/actions/actions";


export default function Search() {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    const searchMessage = useSelector((state: any) => state.auth.searchMessage)
    const [topSearch,setTopSearch] = useState([])
    const [searchTrackResult, setSearchTrackResult] = useState([]);
    const [searchArtistResult, setSearchArtistResult] = useState([]);
    const [searchPlaylistResult,setSearchPlaylistResult] = useState([])
    useEffect(() => {
        setMessage(searchMessage + "")
        spotifyApi.searchTracks(searchMessage).then((data: any) => {
            console.log("tracks")
            console.log(data.body.tracks.items)
            setSearchTrackResult(data.body.tracks.items)
        });
        spotifyApi.searchArtists(searchMessage)
            .then(function (data: any) {
                console.log("artist")
                console.log(data.body.artists.items);
                setTopSearch(data.body.artists.items.splice(0,1))
                setSearchArtistResult(data.body.artists.items)
            }, (err: any) => {
                console.error(err);
            });

        spotifyApi.searchPlaylists(searchMessage)
            .then((data:any) => {
                console.log("playlist")
                console.log(data.body.playlists);
                setSearchPlaylistResult(data.body.playlists)
            }, (err:any) => {
                console.error( err);
            });

    }, [searchMessage]);
    const handlePlayIconClick = ()=>{
        console.log("a")
    }

    const handleClick = (id:string,name:string)=>{
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
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
                                            console.log(item.id)
                                            return (
                                                <div className={style.topResultContainer}>
                                                    <NavLink to={`/artist/${item.id}`}
                                                             onClick={()=>handleClick(item.id,item.name)}
                                                             style={{textDecoration:"none",color:"white"}}
                                                             >
                                                        <img src={item.images[0].url} className={style.image} alt=""/>
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
                                <TracksResults/>
                            </div>
                        </div>
                        <div className={style.playlistResult}>
                            <PlaylistResults/>
                        </div>
                        <div className={style.artistsResult}>
                            <ArtistsResults/>
                        </div>
                    </div>
                </div>
            ) : (

                <SearchRecommendation/>
            )}
        </div>
    )
}