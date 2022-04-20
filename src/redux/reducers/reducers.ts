const initialState={
    user: null,
    usePlaylist:[],
    recentlyPlayedTracks:[],
    playlist:[],
    savedTracks:[],
    savedAlbums:[],
    followedArtist:[],
    artistName:[],
    artistID:[],
    playlistName:[],
    playlistID:[],
    albumName:[],
    albumID:[],
    searchMessage:[],
    uri:null,
    listUri:null,
    imageUrl:[],
}

export const reducers = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_USER_INFORMATION':
            return{
                ...state,
                user: action.payload,
            }
        case 'GET_USER_PLAYLIST':
            return{
                ...state,
                usePlaylist: action.payload,
            }

        case 'GET_RECENTLY_PLAYED_TRACK':
            return{
                ...state,
                recentlyPlayedTracks:action.payload,
            }
        case 'GET_SAVED_TRACKS':
            return{

                ...state,
                savedTracks: action.payload,
            }
        case 'GET_SAVED_ALBUMS':
            return{
                ...state,
                savedAlbums:action.payload,
            }
        case 'GET_FOLLOWED_ARTIST':
            return{
                ...state,
                followedArtist:action.payload,
            }
        case 'GET_ARTIST_NAME':
            return{
                ...state,
                artistName:action.payload
            }
        case 'GET_ARTIST_ID':
            return{
                ...state,
                artistID:action.payload
            }
        case 'GET_PLAYLIST_NAME':
            return{
                ...state,
                playlistName:action.payload
            }
        case 'GET_PLAYLIST_ID':
            return{
                ...state,
                playlistID:action.payload
            }

        case 'GET_ALBUM_NAME':
            return{
                ...state,
                albumName:action.payload
            }
        case 'GET_ALBUM_ID':
            return{
                ...state,
                albumID:action.payload
            }
        case 'SEARCH_ON_TYPE':
            return {
                ...state,
                searchMessage:action.payload
            }

        case 'GET_URI':
            return{

                ...state,
                uri: action.payload,
            }

        case 'GET_LIST_URI':
            return{

                ...state,
                listUri: action.payload,
            }
        case 'GET_IMAGE_URL':
            return{
                ...state,
                imageUrl: action.payload,
            }
        default:
            return initialState;
    }
}