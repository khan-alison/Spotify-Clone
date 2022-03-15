export const authEndpoint = "https://accounts.spotify.com/authorize"

const SpotifyWebApi = require('spotify-web-api-node');

export const spotifyApi = new SpotifyWebApi({
    clientId: '6f28d29ba6aa47e39359d0b6c8ea902c',
    clientSecret: '88f47d81eb43461f93f6039612df6cc7',
    redirectUri: 'http://localhost:3000/'
});

const redirectUri = "http://localhost:3000/"
const clientId = "6f28d29ba6aa47e39359d0b6c8ea902c"
const scopes = [
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    //sss
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify",
    "user-follow-read",
    'playlist-modify-public',
    'playlist-read-collaborative',
    'user-follow-modify',
    'user-follow-read',
    'playlist-modify-private'


]


export const getTokenFromURL = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce<Record<string, string>>((initial,item) => {
            let part = item.split('=');
            initial[part[0]] = decodeURIComponent(part[1]);

            return initial;
        },{})

}

// export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-follow-read%20user-library-modify%20user-read-playback-state%20user-read-recently-played%20user-modify-playback-state%20playlist-modify-public&response_type=token&show_dialog=true`
export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
