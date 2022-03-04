import React, {useEffect, useRef, useState} from "react";
import style from "./LandingPage.module.css"
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import Home from "../../components/body/home/Home";
import Footer from "../../components/footer/Footer";
import {Routes,Route} from 'react-router';
import Search from "../../components/body/search/SearchPage";
import LibraryPage from "../../components/body/library/LibraryPage";
import UserPlaylist from "../../components/body/userPlaylist/UserPlaylist";
import {useSelector} from "react-redux";

interface ILandingPage{
    accessToken:any,
    spotify:any
}

export default function  LandingPage({accessToken,spotify}:ILandingPage) {
    const [playingTrack, setPlayingTrack] = useState();
    const state = useSelector((state: any) => state.auth);

    const chooseTrack = (track: any) => {
        setPlayingTrack(track.uri);
    };

    return(
        <div className={style.container}>
            <div className={style.body}>
                <div className={style.body_left}>
                    <SideBar/>
                </div>
                <div className={style.body_right}>
                    <div>

                        <Header />

                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/library" element={<LibraryPage/>}/>
                            <Route path="/playlist/:playlistID" element={<UserPlaylist spotify={spotify}/>}/>
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