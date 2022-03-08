import React from "react";
import {NavLink} from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from "./TrackItems.module.css"
import {getArtistID, getArtistName} from "../../../redux/actions/actions";
import {useDispatch} from "react-redux";

interface ITrackItems {
    imgUrl: string;
    title: string;
    content: string;
    id: string;
    artists:[]
}


export default function TrackItems(props:ITrackItems){
    const dispatch = useDispatch();

    const handleClick = (id:string,name:string)=>{
        dispatch(getArtistID(id))
        dispatch(getArtistName(name))
    }

    const handlePlayIconClick = ()=>{
        console.log("a")
    }
    return(
        <div className={style.container}>
            <NavLink to="/" style={{textDecoration:"none",color:"white"}} >
                <img className={style.img} src={props.imgUrl} alt=""/>

                <h5 className={style.name}>{props.title}</h5>
                <p className={style.description}>{props.artists.map((item:any,index:number)=>(
                    <NavLink
                        key={index}
                        to={`/artist/${item.id}`}
                        className={style.artist}
                        onClick={()=>handleClick(item.id,item.name)}
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