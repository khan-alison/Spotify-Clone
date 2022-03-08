import React from 'react';
import style from "./LibraryAlbums.module.css"
import {useSelector} from "react-redux";
import AlbumItems from "../../../items/album_items/AlbumItems";

const LibraryAlbums = () => {
    const savedAlbums = useSelector((state: any)=>state.auth.savedAlbums)
    console.log(savedAlbums)
    return (
        <div className={style.container}>
            <h4>Albums</h4>
            <div className={style.albumsContainer}>

                {
                    savedAlbums.map((album:any,index:number)=>{
                        return (
                            <AlbumItems
                                key = {index}
                                imgUrl={album?.album.images[0].url}
                                name={album?.album.name}
                                id={album?.album.id}
                                artists={album?.album.artists}
                                uri={album?.album?.uri}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default LibraryAlbums;