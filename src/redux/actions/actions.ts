export const getUserInformation =  (payload: any)=>{
    return{
        type: 'GET_USER_INFORMATION',
        payload,
    }
}

export const getUserPlaylist = (payload: any)=>{
    return{
        type: 'GET_USER_PLAYLIST',
        payload,
    }
}

export const getRecentlyPlayedTrack =  (payload: any)=>{
    return{
        type: 'GET_RECENTLY_PLAYED_TRACK',
        payload,
    }
}



