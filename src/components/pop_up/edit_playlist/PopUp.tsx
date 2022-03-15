import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import style from "./PopUp.module.css";
import CloseIcon from "@mui/icons-material/Close";
// import { spotifyApi } from "../../../../Spotify/spotify";
// import {
//     getUserPlaylist,
//     changeCount,
// } from "../../../../redux/actions/loginAction";
import {useDispatch} from "react-redux";
import {spotifyApi} from "../../../spotify/api";
import {getPlaylistName,getUserPlaylist} from "../../../redux/actions/actions";

interface IPopUp {
    open: boolean;
    onClose: (data: any) => void;
    currName: string;
    playlistId: any;
    // takeData:any
}

function PopUp(props: IPopUp) {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const onTodoChange = (e: any) => {
        const data = e.target.value;
        setValue(data);
    };

    const handleClose = () => {
        setValue("");
        props.onClose(false);
    };

    const handleChangePlaylistName = () => {
        spotifyApi
            .changePlaylistDetails(props.playlistId.playlistID, {
                name: `${value}`,
            })
            .then(
                function (data: any) {
                    spotifyApi.getUserPlaylists().then((userPlaylists: any) => {
                        dispatch(getPlaylistName(value));
                        spotifyApi.getUserPlaylists().then((userPlaylists: any) => {
                            dispatch(getUserPlaylist(userPlaylists.body.items));
                        });
                        setValue("");
                        props.onClose(false);
                    });
                },
                function (err: Error) {
                    console.log("Something went wrong!", err);
                }
            );
    };

    if (!props.open) return null;
    return ReactDOM.createPortal(
        <>
            <div className={style.overLay}>
                <div className={style.container}>
                    <h3 style={{color: "#fff"}} className={style.header}>Edit detail</h3>
                    <div className={style.form}>
                        <span className={style.closeButton} onClick={handleClose}>
                          <CloseIcon style={{color: "#fff"}}/>
                        </span>
                        <label htmlFor="" style={{color: "#fff"}}>
                            Name
                        </label>
                        <input type="text" value={value} onChange={onTodoChange}/>
                        <button onClick={handleChangePlaylistName} className={style.btn}>save</button>
                        {/*    <form>*/}
                        {/*        <fieldset>*/}
                        {/*            <legend>name</legend>*/}
                        {/*            <label htmlFor="fname">First name:</label>*/}
                        {/*            <input type="text" id="fname" name="fname"/>*/}
                        {/*        </fieldset>*/}
                        {/*    </form>*/}
                    </div>

                </div>
            </div>
        </>,
        /* @ts-ignore */
        document.getElementById("portal")
    );
}

export default PopUp;
