import React, {useEffect, useRef, useState} from 'react';
import style from "./ArtistDetails.module.css"
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FastAverageColor from "fast-average-color";
import {getArtistID, getArtistName} from "../../redux/actions/actions";

const fac = new FastAverageColor();

interface IArtistDetails{
    spotify:any
}

function ArtistDetails(props:IArtistDetails) {
    let artistId = useParams().artistID
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.auth);
    const [headerHeight, setHeaderHeight] = useState(0)
    const [artistData, getArtistData] = useState<any>("");
    const [tracksList, getTracksList] = useState<any>("");
    const [artistThumb,setArtistThumb] = useState("")
    const [opacity,setOpacity] =useState(1)
    const [bgColor,setBgColor] = useState("")
    const [flwNumber,setFlwNumber] = useState(0)
    const ref = useRef(null)



    useEffect(() => {
        props.spotify.getArtist(artistId).then((artist: any) => {
            // console.log(artist.body.images[0].url)
            getArtistData(artist);
            setArtistThumb(artist?.body?.images[0]?.url)
        });
        props.spotify.getArtistTopTracks(artistId, "VN").then((tracks: any) => {
            getTracksList(tracks);
        });
        let handleScroll = () => {
            if (window.pageYOffset == 0) {
                setOpacity(1);
            } else if (window.pageYOffset > 0 && window.pageYOffset < 300) {
                setOpacity(1-(window.pageYOffset/300));
            }
            else {
                setOpacity(0);
            }
        }
        setOpacity( window.pageYOffset/headerHeight )
        window.addEventListener("scroll", handleScroll);

    }, []);

    useEffect(() => {
        // @ts-ignore
        setHeaderHeight(ref.current.clientHeight)


// From loaded image (HTMLImageElement)

        fac
            .getColorAsync(artistThumb)
            .then((color) => {
                setBgColor(color.rgba)
                console.log(color.rgba);
            })
            .catch((e) => {
                console.log(e);
            });
    },)


    return (
        <div className={style.container}>
            {/*<img src={artistData?.body?.images[0]?.url} alt=""/>*/}
            <div
                ref={ref}
                className={style.header}
                style={{
                    backgroundImage: `url(${artistData?.body?.images[0]?.url})`,
                    backgroundSize:"",
                    opacity:`${opacity}`
                }}
            >
                <div className={style.headerInfo}>
                    <h2>{artistData?.body?.name}</h2>
                    <div>{artistData?.body?.followers?.total} follower</div>
                </div>
            </div>
            <div style={{background:`${bgColor}`}}>
                Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but also the leap in
                to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
                th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </div>
            <div>
                Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but also the leap in
                to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
                th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </div> <div>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap in
            to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
            th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div> <div>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap in
            to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
            th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div> <div>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap in
            to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
            th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div><div>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap in
            to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
            th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div><div>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap in
            to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
            th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div><div>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap in
            to electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi
            th desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div>

        </div>
    );
}

export default ArtistDetails;