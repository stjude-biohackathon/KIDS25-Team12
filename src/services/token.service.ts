const TOKEN_KEY = 'auth_token';
const USER_NAME = 'username';

const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    saveToken(accessToken: string) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },
    getUserId() {
        return localStorage.getItem(USER_NAME)
    },
    saveUserId(u: string) {
        localStorage.setItem(USER_NAME, u)
    },
    removeUserId() {
        localStorage.removeItem(USER_NAME)
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },
}

export { TokenService }
