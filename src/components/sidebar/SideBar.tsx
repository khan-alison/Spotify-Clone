import React, {useEffect} from "react";
import style from "./SideBar.module.css"
import { Link, NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SidebarOptions from "./sidebar_option/SidebarOptions";
import SidebarPlaylist from "./sidebar_playlist/SidebarPlaylist";
import {spotifyApi} from "../../spotify/api";
import {getUserPlaylist} from "../../redux/actions/actions";

export default function SideBar(){
    const dispatch = useDispatch()
    const userPlaylist = useSelector((state: any) => state.auth.usePlaylist);
    const createNewPlaylist = () => {
        spotifyApi.createPlaylist(`My playlist #${userPlaylist.length}`, { 'description': 'My description', 'public': true })
            .then(function(data: any) {
                console.log('Created playlist!', data);
                spotifyApi.getUserPlaylists().then((userPlaylists: any) => {
                    dispatch(getUserPlaylist(userPlaylists.body.items))
                    console.log(userPlaylists.body.items)
                });
            }, function(err: Error) {
                console.log('Something went wrong!', err);
            });
    }


    return(
        <div className={style.container}>
                <Link to="/">
                        <img
                            className={style.sidebarLogo}
                            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                            alt="logo"
                        />
                </Link>
            <NavLink style={{ textDecoration: "none" }} to="/">
                <SidebarOptions title="Home" icon={HomeIcon}/>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to="/search">
                <SidebarOptions title="Search" icon={SearchIcon}/>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to="/library">
                <SidebarOptions title="Library" icon={LibraryMusicIcon}/>
            </NavLink>

            <div className={style.playlist} onClick={createNewPlaylist}>
                <PlaylistAddIcon className={style.logo}/>
                Create playlist
            </div>

            <NavLink style={{ textDecoration: "none",color:'grey' }} to="/collections/tracks">

                <div className={style.playlist} style={{marginTop: '6px'}}>
                        <img className={style.img}
                             src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
                             alt=""
                        />
                    Liked songs
                </div>
            </NavLink>

            <hr className={style.hr}/>

            <div className={style.sidebarPlaylist}>
                {
                    userPlaylist &&
                    userPlaylist.length > 0 &&
                    userPlaylist.map((playList:any,index:number)=>{
                        return(
                            <SidebarPlaylist key={index} name={playList.name} id={playList.id} index={index} uri={playList.uri}/>
                        )
                    })
                }
            </div>
        </div>
    )
}