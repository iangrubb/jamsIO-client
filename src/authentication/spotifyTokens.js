

export const getAccessToken = () => {

    const refreshToken = localStorage.getItem
    const accessToken = localStorage.getItem('access-token')
    const accessTokenCreatedAt = localStorage.getItem('access-token-created-at')
    
}

export const setSpotifyTokens = ({ accessToken, refreshToken, }) => {
    // localStorage.setItem()
}

export const clearSpotifyTokens = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('access-token-created-at')
    localStorage.removeItem('refresh-token')
}
