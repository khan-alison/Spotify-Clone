import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import style from "./SidebarPlaylist.module.css"
import ClearIcon from "@mui/icons-material/Clear";
import PopUpDel from "../../pop_up/delete_cf/PopUpDel";

interface ISidebarPlaylist {
    name: string;
    id: string;
    uri: string;
    index:number;
}




export default function SidebarPlaylist(props:ISidebarPlaylist){
    const [isOpen,setIsOpen] = useState(false)
    // const a = state.count
    const handleClose = (data: any) => {
        setIsOpen(data);
    }
    const handleDeletePlaylist = ()=>{
        console.log('delete')
        setIsOpen(true)

    }

    return (
        <div className={style.container}>
            <NavLink
                     style={{ textDecoration: "none" }} to={`/playlist/${props.id}`}>
                <div className={style.SideBarPlaylist}>
                    <PopUpDel open={isOpen} playlistId={props.id} onClose={handleClose} index={props.index} currName={props.name}/>
                    <div style={{textOverflow:'ellipsis',overflow:'hidden'}}>{props.name}</div>
                </div>
            </NavLink>
            <div>
                <ClearIcon
                    onClick={handleDeletePlaylist}
                    className={style.icon}/>
            </div>
        </div>
    );

}