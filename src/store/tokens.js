export const setTokens = (access, refresh, username, is_superuser) => {
    sessionStorage.setItem('accessToken', access)
    sessionStorage.setItem('refreshToken', refresh)
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('is_superuser', is_superuser)
    sessionStorage.setItem('logged_in', true)
}

export const getTokens = () => {
    const access = sessionStorage.getItem('accessToken')
    const refresh = sessionStorage.getItem('refreshToken')
    return { access, refresh }
}

export const getUserData = () => {
    const username = sessionStorage.getItem('username')
    const is_superuser = sessionStorage.getItem('is_superuser')
    const logged_in = sessionStorage.getItem('logged_in')
    return { username, is_superuser, logged_in }
}