import React from "react";
import style from "./SidebarOptions.module.css"

interface ISidebarOptions{
    title:string,
    icon:any
}

export default function SidebarOptions(props:ISidebarOptions){
    return (
        <div className={style.container}>
            {props.icon && <props.icon className={style.icons}/>}
            <p>{props.title}</p>
        </div>
    )
}