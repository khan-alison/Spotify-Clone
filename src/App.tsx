import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
// import { BrowserRouter , Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './pages/login/LoginPage'
import LandingPage from "./pages/landing_page/LandingPage";
import {spotifyApi} from "./spotify/api";
import {useDispatch} from "react-redux";
import {getTokenFromURL} from "./spotify/api"
import {
    getFollowedArtists, getMySavedAlbums,
    getRecentlyPlayedTrack,
    getSavedTracks,
    getUserInformation,
    getUserPlaylist
} from "./redux/actions/actions";
import {Routes,Route} from 'react-router';



function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = "";
    const _token = hash.access_token;

    let spotifyToken = ""

    if(_token){
      spotifyToken = _token;
      window.localStorage.setItem("token", JSON.stringify(spotifyToken));
    } else {
      const localToken = window.localStorage.getItem("token");
      if(localToken) {
        spotifyToken = JSON.parse(localToken)
      }else{
        return;
      }

    }
    handleToken(spotifyToken)


  }, []);


  const handleToken = (token: string) => {
    setToken(token);

    spotifyApi.setAccessToken(token);

    spotifyApi.getMe().then((user: any) => {
      dispatch(getUserInformation({ ...user.body, accessToken: token }));
    });

    spotifyApi.getUserPlaylists().then((userPlaylists: any) => {
      dispatch(getUserPlaylist(userPlaylists.body.items));
      console.log(userPlaylists.body.items)
    });

    spotifyApi.getUserPlaylists().then((userPlaylists: any) => {
      dispatch(getUserPlaylist(userPlaylists.body.items));
    });

    spotifyApi.getMySavedAlbums().then((myTopArtists: any) => {
      // dispatch(getSavedAlbum(myTopArtists.body.items));
      console.log(myTopArtists.body.items)
    });

    spotifyApi
        .getMySavedTracks({
          limit: 50,
          offset: 0,
        })
        .then((myPlaylist: any) => {
          dispatch(getSavedTracks(myPlaylist.body.items));
        });
      spotifyApi.getMySavedAlbums({
          limit : 20,
          offset: 0
      })
          .then((data:any) => {
              // Output items
                dispatch(getMySavedAlbums(data.body.items))
          }, function(err:any) {
              console.log('Something went wrong!', err);
          });

    spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 20,
        })
        .then((data: any) =>{
              dispatch(getRecentlyPlayedTrack(data.body.items))
            },
            function (err: Error) {
              console.log("Something went wrong!", err);
            }
        );
      spotifyApi.getCategories({
          limit : 5,
          offset: 0,
          country: 'SE',
          locale: 'sv_SE'
      })
          .then((data:any) =>{
              console.log(data.body);
          }, function(err:any) {
              console.log("Something went wrong!", err);
          });
      spotifyApi.getPlaylistsForCategory('party', {
          country: 'us',
          limit : 2,
          offset : 0
      })
          .then((data:any) => {
              console.log("category"+data.body);
          }, function(err:any) {
              console.log("Something went wrong!", err);
          });

      spotifyApi.getMyTopArtists()
          .then((data:any) => {
              let topArtists = data.body.items;
              console.log("top artist:"+topArtists);
          }, function(err:any) {
              console.log('Something went wrong!', err);
          });
  }

  return (
      <div>
            {
              token ?(<LandingPage spotify={spotifyApi} accessToken={token} />

              ): (
                    <LoginPage/>
              )
            }
      </div>
  );
}

export default App;
