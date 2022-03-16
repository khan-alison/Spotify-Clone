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

export const getSavedTracks = (payload: any)=>{
    return{
        type: 'GET_SAVED_TRACKS',
        payload,
    }
}

export const getMySavedAlbums = (payload: any)=>{
    return{
        type: 'GET_SAVED_ALBUMS',
        payload,
    }
}

export const getFollowedArtists = (payload: any)=>{
    return{
        type: 'GET_FOLLOWED_ARTIST',
        payload,
    }
}

export const getArtistName = (payload: any)=>{
    return{
        type: 'GET_ARTIST_NAME',
        payload,
    }
}

export const getArtistID = (payload: any)=>{
    return{
        type: 'GET_ARTIST_ID',
        payload,
    }
}


export const getPlaylistName = (payload: any)=>{
    return{
        type: 'GET_PLAYLIST_NAME',
        payload,
    }
}

export const getPlaylistID = (payload: any)=>{
    return{
        type: 'GET_PLAYLIST_ID',
        payload,
    }
}

export const getAlbumName = (payload: any)=>{
    return{
        type: 'GET_ALBUM_NAME',
        payload,
    }
}

export const getAlbumID = (payload: any)=>{
    return{
        type: 'GET_ALBUM_ID',
        payload,
    }
}

export const searchOnType = (payload: any)=>{
    return{
        type: 'SEARCH_ON_TYPE',
        payload,
    }
}

export const getUri =  (payload: any)=>{
    return{
        type: 'GET_URI',
        payload,
    }
}

export const getImageUrl =  (payload: any)=>{
    return{
        type: 'GET_IMAGE_URL',
        payload,
    }
}



