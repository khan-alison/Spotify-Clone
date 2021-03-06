import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistGeneral from "../../../items/playlist_items/general/PlaylistGeneral";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import style from "./LibraryPlaylist.module.css";
import { NavLink } from "react-router-dom";
import { spotifyApi } from "../../../../spotify/api";
import { getUri, getListUri } from "../../../../redux/actions/actions";

export default function LibraryPlaylist() {
  const dispatch = useDispatch();
  const [savedTrack, setSavedTrack] = useState([]);
  const userPlaylist = useSelector((state: any) => state.auth.usePlaylist);

  const ref = useRef(null);

  useEffect(() => {
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: 0,
      })
      .then((myPlaylist: any) => {
        setSavedTrack(myPlaylist.body.items);
      });
  }, []);

  const handleClick = () => {
    const list = savedTrack.reduce((acc: any, cur: any) => {
      acc.push(cur.track.uri);
      return acc;
    }, []);
    dispatch(getUri(""));

    dispatch(getListUri(list));
  };

  // console.log(savedTrack[0].track)
  return (
    <div className={style.container}>
      <div>
        <h4 ref={ref}>Playlists</h4>
        <div className={style.playlistItems}>
          <div className={style.likedSongs}>
            <NavLink
              to="/collections/tracks"
              style={{ textDecoration: "none", color: "white" }}
            >
              <p className={style.tracksName}>
                {savedTrack.map((track: any, index: number) => {
                  return index < savedTrack.length - 1
                    ? track.track.artists[0].name +
                        " " +
                        track.track.name +
                        ", "
                    : track.track.artists[0].name + " " + track.track.name;
                })}
              </p>
              <h1 style={{ fontWeight: "bold" }}>Liked songs</h1>
              <p>{savedTrack.length} songs</p>
            </NavLink>
            <PlayCircleFilledWhiteIcon
              onClick={handleClick}
              className={style.icon}
            />
          </div>
          {userPlaylist.map((playlist: any, index: any) => {
            return (
              <PlaylistGeneral
                key={index}
                playlistName={playlist?.name}
                imageUrl={playlist?.images[0]?.url}
                playlistUri={playlist.uri}
                playlistId={playlist.id}
                description={playlist.owner.display_name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
