import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
interface IAppFooter {
  accessToken: any;
  trackUri: any;
}

export default function Footer(props: IAppFooter) {
  const data = useSelector((state: any) => state.auth);
  const song: any = [data.uri];
  const listSongs: any = data.listUri;
  const toPlay = song != "" ? song : listSongs;
  console.log(toPlay);

  return (
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
        uris={toPlay || null}
      />
    </div>
  );
}
