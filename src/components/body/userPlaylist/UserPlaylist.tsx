import React, {useEffect, useState} from "react";
import style from "./UserPlaylist.module.css"
import useRouteMatch, {useLocation,useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {spotifyApi} from "../../../spotify/api";
import {getUserPlaylist} from "../../../redux/actions/actions";


interface  IUserPlaylist{
    spotify:any
}



export default function  UserPlaylist(props:IUserPlaylist){
    let playListId = useParams()
    const dispatch = useDispatch();
    const [userPlaylistData, getUserPlaylistData] = useState<any>("");
    useEffect(()=>{
        spotifyApi.getPlaylist(playListId.playlistID).then((playList: any) => {
            getUserPlaylistData(playList);
        });
    },[playListId])
    return(
        <div>{userPlaylistData?.body?.name}</div>
    )
}