
const expirationBuffer = 5 * 60 * 1000

export const getAccessToken = () => {
    const accessToken = localStorage.getItem('access-token')


    const accessTokenCreatedAt = localStorage.getItem('access-token-expires-at')

    const refreshToken = localStorage.getItem('refresh-token')

    return accessToken
    
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh-token')
}

export const checkSpotifyRefresh = () => {

    // Check whether there is a set of tokens.
        // If so, check whether expires at requires a refresh
}

export const setSpotifyTokens = ({ accessToken, refreshToken, expiresAt }) => {
    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('access-token-expires-at', expiresAt)
    localStorage.setItem('refresh-token', refreshToken)
}

export const clearSpotifyTokens = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('access-token-expires-at')
    localStorage.removeItem('refresh-token')
}
