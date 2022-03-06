import React from "react";
import style from "./Library.module.css"
import {Routes,Route,Navigate} from 'react-router';
import Home from "../home/Home";
import LibraryPlaylist from "./library_playlist/LibraryPlaylist";
import {Outlet} from "react-router-dom";


export default function LibraryPage(){
    return(
        <div className={style.container}>
          <Outlet/>
        </div>
    )
}