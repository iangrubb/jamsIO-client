export const getLoginToken = () => localStorage.getItem('login-token')

export const getAccessToken = () => localStorage.getItem('access-token')

export const getAccessTokenExpiration = () => localStorage.getItem('access-token-expires-at')

export const getRefreshToken = () => {
    return localStorage.getItem('refresh-token')
}

export const setLoginToken = token => localStorage.setItem('login-token', token)

export const setSpotifyTokens = ({ accessToken, refreshToken, expiresAt }) => {
    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('access-token-expires-at', expiresAt)
    localStorage.setItem('refresh-token', refreshToken)
}

export const refreshSpotifyTokens = ({ accessToken, expiresAt }) => {
    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('access-token-expires-at', expiresAt)
}

export const clearTokens = () => {
    localStorage.removeItem('login-token')
    localStorage.removeItem('access-token')
    localStorage.removeItem('access-token-expires-at')
    localStorage.removeItem('refresh-token')
}
