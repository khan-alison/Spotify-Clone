import React, {useEffect, useState} from 'react';
import style from "./LibraryArtists.module.css"
import {useSelector} from "react-redux";
import ArtistItems from "../../../items/artist_items/ArtistItems";
import {spotifyApi} from "../../../../spotify/api";
import {getFollowedArtists} from "../../../../redux/actions/actions";

export default function LibraryArtists  () {
    const [flwArtist,setFlwArtist] = useState([]);
    const [flwLength,setFlwLength] = useState(0)
    const [message, setMessage] = useState('')

    const callbackFunction = (childData:any) => {
        console.log(childData)
        setMessage(childData)
    }
    useEffect(()=>{
        spotifyApi.getFollowedArtists({ limit : 50 })
            .then((data:any) => {
                // console.log(data.body.artists.items.length)
                setFlwLength(data.body.artists.items.length)
                setFlwArtist(data.body.artists.items)
            }, function(err:any) {
                console.log('Something went wrong!', err);
            });
    },[message])
    return (
        <div className={style.container} style={flwArtist.length == 0 ? {paddingBottom:'600px'} : {paddingBottom:'300px'} }>
            <h4>Artists</h4>
            <div className={style.artistContainer}>
                 {
                flwArtist.map((artist:any,index:number)=>{
                    console.log(flwArtist.length)
                    return(
                        <ArtistItems
                            key={index}
                            artistName={artist.name}
                            imageUrl={artist.images[0].url}
                            artistId={artist.id}
                            type={artist.type}
                            uri={artist.uri}
                            parentCallback={callbackFunction}
                        />
                    )
                })
            }
            </div>
        </div>
    );
};