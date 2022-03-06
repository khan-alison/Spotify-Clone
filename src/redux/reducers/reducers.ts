const initialState={
    user: null,
    usePlaylist:[],
    recentlyPlayedTracks:[],
    playlist:[],
    savedTracks:[]
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

        default:
            return initialState;
    }
}