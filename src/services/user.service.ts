import ApiService from '@/services/api.service'
import {TokenService} from '@/services/token.service'

const dataURL = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_BASE_API
const loginURL: string = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_LOGIN_URL
const logoutURL: string = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_LOGOUT_URL

/** Define AuthenticationError, which extends and inherits from the Error class*/
class AuthenticationError extends Error {
    errorCode: number

    constructor(errorCode: number, message: string) {
        /** Accesses the constructor for the parent Error class object, and passes message data in. **/
        super(message)

        /** Name of the object is name of the constructor function (Authentication Error) **/
        this.name = this.constructor.name

        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    /** Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
     **/
    async authStatus() {
        try {
            return await ApiService.get(dataURL + '/authstatus/');
        } catch (error: any) {
            throw new AuthenticationError(error.response.status, error.response.data)
        }
    },
    async login(username: string, password: string) {
        const requestData = {
            method: 'post',
            url: loginURL,
            data: {
                grant_type: 'password',
                username: username,
                password: password
            }
        }
        try {
            const response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.token)
            TokenService.saveUserId(username);
            ApiService.setHeader()
            return response.data
        } catch (error: any) {
            throw new AuthenticationError(error.response.status, error.response.data.non_field_errors)
        }
    },
    /** Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization Bearer <token>` header from future requests.
     **/
    async logout() {
        // Remove the token and remove Authorization header from Api Service as well
        await ApiService.post(logoutURL, {})
        TokenService.removeToken()
        ApiService.removeHeader()
    },
    async logout401() {
        TokenService.removeToken()
        TokenService.removeUserId()
        ApiService.removeHeader()
    }
}

export {UserService, AuthenticationError}