import React from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./AlbumItems.module.css"

interface ITrackItems {
    imgUrl: string;
    name: string;
    id: string;
    artists:[];
    uri:string
}


export default function AlbumItems(props:ITrackItems){
    const handlePlayIconClick = ()=>{
        console.log("a")
    }

    return(
        <div className={style.container}>
            <NavLink to="/" style={{textDecoration:"none",color:"white"}} >
                <img className={style.img} src={props.imgUrl} alt=""/>

                <h5 className={style.name}>{props.name}</h5>
                {/*<div>{props.id}</div>*/}
                <p className={style.description}>{props.artists.map((item:any,index:number)=>(
                    <NavLink
                        key={index}
                        to={`/artist/${item.id}`}
                        className={style.artist}
                        style={{textDecoration:"none",color:"#A7A7A7"}}
                    >
                        {
                            (index<props.artists.length-1) ?
                                item.name + ", " :item.name
                            // item.name
                        }


                    </NavLink>

                ))}</p>

            </NavLink>
            <PlayCircleFilledWhiteIcon
                onClick={handlePlayIconClick}
                className={style.icon}/>
        </div>
    )
}