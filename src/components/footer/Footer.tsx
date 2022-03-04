import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
interface IAppFooter {
    accessToken: any;
    trackUri: any;
}

export default function Footer(props:IAppFooter){
    return(
        <div>
            <SpotifyPlayer
                styles={{
                    activeColor: "#fff",
                    bgColor: "#333",
                    color: "#fff",
                    loaderColor: "#fff",
                    sliderColor: "#1cb954",
                    trackArtistColor: "#ccc",
                    trackNameColor: "#fff",
                }}
                token={props.accessToken}
                showSaveIcon
                magnifySliderOnHover={true}
                play={true}
                uris="spotify:playlist:2HzQsHFVvwixrKXBWOZ2Tt"
            />
        </div>
    )
}