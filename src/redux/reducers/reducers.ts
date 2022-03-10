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
    searchMessage:[],
    uri:null
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

        case 'GET_USER_PLAYLIST':
            return{
                ...state,
                playlist: action.payload,
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
        default:
            return initialState;
    }
}