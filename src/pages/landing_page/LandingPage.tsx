import React, {useEffect, useRef, useState} from "react";
import style from "./LandingPage.module.css"
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import Home from "../../components/body/home/Home";
import Footer from "../../components/footer/Footer";
import {Routes, Route} from 'react-router';
import {BrowserRouter, Navigate} from 'react-router-dom';
import Search from "../../components/body/search/SearchPage";
import LibraryPage from "../../components/body/library/LibraryPage";
import PlaylistDetails from "../playlist_details/PlaylistDetails";
import {useSelector} from "react-redux";
import LibraryPlaylist from "../../components/body/library/library_playlist/LibraryPlaylist";
import LibraryPodcasts from "../../components/body/library/library_podcasts/LibraryPodcasts";
import LibraryArtists from "../../components/body/library/library_artists/LibraryArtists";
import LibraryAlbums from "../../components/body/library/library_albums/LibraryAlbums";
import ArtistDetails from "../artist_details/ArtistDetails";
import AlbumItems from "../../components/items/album_items/AlbumItems";
import AlbumDetails from "../albums_details/AlbumDetails";

interface ILandingPage {
    accessToken: any,
    spotify: any
}

export default function LandingPage({accessToken, spotify}: ILandingPage) {
    const [playingTrack, setPlayingTrack] = useState();
    const state = useSelector((state: any) => state.auth);

    const chooseTrack = (track: any) => {
        setPlayingTrack(track.uri);
    };

    return (
        <div className={style.container}>
            <div className={style.body}>
                <div className={style.body_left}>
                    <SideBar/>
                </div>
                <div className={style.body_right}>
                    <div>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/library" element={<LibraryPage/>}>
                                <Route
                                    index
                                    element={<Navigate to="/library/playlists"/>}
                                />
                                <Route path="playlists" element={<LibraryPlaylist/>}/>
                                <Route path="artists" element={<LibraryArtists/>}/>
                                <Route path="albums" element={<LibraryAlbums/>}/>
                            </Route>
                            <Route path="/playlist/:playlistID" element={<PlaylistDetails spotify={spotify}/>}/>
                            <Route path="/artist/:artistID" element={<ArtistDetails spotify={spotify}/>}/>
                            <Route path="/album/:albumID" element={<AlbumDetails spotify={spotify}/>}/>
                        </Routes>

                    </div>
                </div>
            </div>
            <div className={style.body_bottom}>
                <Footer accessToken={accessToken} trackUri={playingTrack}/>
            </div>
        </div>
    )
}