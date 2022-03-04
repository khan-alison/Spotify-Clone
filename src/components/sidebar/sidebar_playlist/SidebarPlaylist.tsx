import React from "react";
import {NavLink} from "react-router-dom";
import style from "./SidebarPlaylist.module.css"

interface ISidebarPlaylist {
    name: string;
    id: string;
    uri: string;
}


export default function SidebarPlaylist(props:ISidebarPlaylist){
    return (
        <NavLink className={style.container} style={{ textDecoration: "none" }} to={`/playlist/${props.id}`}>
            <div className={style.SideBarPlaylist}>
                <div>{props.name}</div>
            </div>
        </NavLink>
    );

}