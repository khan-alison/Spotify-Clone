import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import style from "./SidebarPlaylist.module.css"
import ClearIcon from "@mui/icons-material/Clear";
import PopUpDel from "../../pop_up/delete_cf/PopUpDel";
import {getImageUrl, getListUri, getPlaylistID, getPlaylistName} from "../../../redux/actions/actions";
import {useDispatch} from "react-redux";

interface ISidebarPlaylist {
    name: string;
    id: string;
    uri: string;
    index:number;
}




export default function SidebarPlaylist(props:ISidebarPlaylist){
    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()

    // const a = state.count
    const handleClose = (data: any) => {
        setIsOpen(data);
    }
    const handleDeletePlaylist = ()=>{
        console.log('delete')
        setIsOpen(true)

    }

    const getInfoHandle = ( name: string, id: string, uri: string) => {
        dispatch(getPlaylistName(name))
        dispatch(getPlaylistID(id))
        dispatch(getListUri(uri))
    }

    return (
        <div className={style.container}>
            <NavLink
                onClick={() => {
                    getInfoHandle( props?.name, props?.id, props?.uri)
                }}
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