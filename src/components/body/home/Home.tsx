import React, {useEffect, useMemo, useRef, useState} from "react";
import style from "./Home.module.css"
import {useDispatch, useSelector} from "react-redux";
import {dividerClasses} from "@mui/material";
import PlaylistItems from "../../items/playlist_items/home/PlaylistItems";
import TrackItems from "../../items/track_items/TrackItems";
import {NavLink} from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const recentlyPlayedTracks = useSelector((state: any) => state.auth.recentlyPlayedTracks);
    const userPlaylist = useSelector((state: any) => state.auth.usePlaylist)
    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    const getGreeting = useMemo(() => {
        const date = new Date();
        const currentTime = date.getHours();

        if (currentTime < 12) {
            return "Good morning";
        } else if (currentTime < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }, []);
    return (
        <div className={style.container}>
            <div className={style.userPlaylists}>
                <h4>{getGreeting}</h4>
                <div className={style.playlistItems}>
                    {userPlaylist.map((playlist: any, ind: number) => {
                        return (
                            <PlaylistItems
                                playlistId={playlist.id}
                                playlistName={playlist.name}
                                key={ind}
                                imageUrl={playlist?.images[0]?.url}
                                playlistUri={playlist.uri}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={style.recentlyTracks}>
                <h4>Recently Playlist</h4>
                <div className={style.recentlyTracksItems}>
                    {
                        recentlyPlayedTracks.map((item: any, index: any) => {
                            return (

                                <TrackItems
                                    key={index}
                                    imgUrl={item?.track?.album?.images[0]?.url}
                                    title={item?.track?.name}
                                    content={""}
                                    id={""}
                                    artists={item?.track?.artists}
                                    uri={item?.track?.uri}
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
