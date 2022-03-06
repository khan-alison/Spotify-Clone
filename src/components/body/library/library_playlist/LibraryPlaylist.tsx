import React from "react";
import {useSelector} from "react-redux";
import TrackItems from "../../../items/track_items/TrackItems";
import PlaylistItems from "../../../items/playlist_items/home/PlaylistItems";
import PlaylistGeneral from "../../../items/playlist_items/general/PlaylistGeneral";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import {log} from "util";
import style from "./LibraryPlaylist.module.css"
import {NavLink} from "react-router-dom";

export default function LibraryPlaylist(){
    const savedTrack = useSelector((state: any)=>state.auth.savedTracks)
    const userPlaylist = useSelector((state: any) => state.auth.usePlaylist)
    console.log(savedTrack[0].track)
    return(
        <div className={style.container}>
            <div>
                <h4>Playlists</h4>
                    <div className={style.playlistItems}>
                        <div className={style.likedSongs}>
                            <NavLink to="/collections/tracks" style={{textDecoration:"none",color:"white"}}>
                                <p className={style.tracksName}>
                                    {
                                        savedTrack.map((track:any,index:number)=>{
                                            return (
                                                (index<savedTrack.length-1) ?
                                                    track.track.artists[0].name+" "
                                                    + track.track.name + ", " :track.track.artists[0].name+" "
                                                    + track.track.name
                                            )
                                        })
                                    }
                                </p>
                                <h1 style={{fontWeight: "bold"}}>Liked songs</h1>
                                <p>12 songs</p>
                            </NavLink>
                            <PlayCircleFilledWhiteIcon className={style.icon}/>
                        </div>
                        {
                            userPlaylist.map((playlist:any,index:any)=>{
                                return(
                                    <PlaylistGeneral
                                        playlistName={playlist?.name}
                                        imageUrl={playlist?.images[0]?.url}
                                        playlistUri={playlist.uri}
                                        playlistId={playlist.id}
                                        description={playlist.owner.display_name}
                                    />
                                )
                                }
                            )
                        }
                        {
                            userPlaylist.map((playlist:any,index:any)=>{
                                    return(
                                        <PlaylistGeneral
                                            playlistName={playlist?.name}
                                            imageUrl={playlist?.images[0]?.url}
                                            playlistUri={playlist.uri}
                                            playlistId={playlist.id}
                                            description={playlist.owner.display_name}
                                        />
                                    )
                                }
                            )
                        }

                    </div>
            </div>
        </div>
    )
}