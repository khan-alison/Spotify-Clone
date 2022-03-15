import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import style from "./PopUpDel.module.css";
import CloseIcon from "@mui/icons-material/Close";
// import { spotifyApi } from "../../../../Spotify/spotify";
// import {
//     getUserPlaylist,
//     changeCount,
// } from "../../../../redux/actions/loginAction";
import {useDispatch} from "react-redux";
import {spotifyApi} from "../../../spotify/api";
import {getUserPlaylist} from "../../../redux/actions/actions";
// import {getPlaylistName, getUserPlaylist} from "../../redux/actions/actions";

interface IPopUp {
    open: boolean;
    onClose: (data: any) => void;
    currName: string;
    playlistId: any;
    index:number;
    // takeData:any
}

function PopUpDel(props: IPopUp) {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const onTodoChange = (e: any) => {
        const data = e.target.value;
        setValue(data);
    };

    const handleClose = () => {
        props.onClose(false);
    };

    const handleChangePlaylistName = (index:number) => {
        spotifyApi.getUserPlaylists().then((userPlaylists: any) => {
            const remove = userPlaylists.body.items.splice(index,1)
            dispatch(getUserPlaylist(userPlaylists?.body?.items));
        });
        props.onClose(false);
    };

    if (!props.open) return null;
    return ReactDOM.createPortal(
        <>
            <div className={style.overLay}>
                <div className={style.container}>
                    <div  className={style.header}>
                        <h3 style={{color: "#fff"}}>Delete {props.currName} play list</h3>

                    </div>

                        <div  style={{color: "#fff"}}>
                            This action can't undo
                        </div>
                        <div className={style.btnOut}>
                            <div className={style.btnCancel}
                                onClick={handleClose}>
                          cancel
                        </div>
                            <div onClick={()=>handleChangePlaylistName(props.index)} className={style.btn}>Oke</div>
                        </div>

                </div>
            </div>
        </>,
        /* @ts-ignore */
        document.getElementById("portal")
    );
}

export default PopUpDel;
