import {defineStore} from 'pinia'
import router from '@/router.js'
import { TokenService } from '@/services/token.service'
import { AuthenticationError, UserService } from '@/services/user.service'

export const useAppStore = defineStore('app', {
    state: () => ({
        accessToken: TokenService.getToken(),
        authenticating: false,
        authenticationError: '',
        authenticationErrorCode: 0,
        loggedInUser: '',
    }),
    getters: {
        getLoggedInUser(state) {
            return state.loggedInUser
        },
        loggedIn(state) {
            return !!state.accessToken
        }
    },
    actions: {
        async login(username: string, password: string) {
            this.authenticating = true
            this.authenticationError = ''
            this.authenticationErrorCode = 0

            // Code for handling redirectPath assignment if the redirect is an array or a string
            let redirectPath : string
            const redirectQuery = router.currentRoute.value.query.redirect
            if (Array.isArray(redirectQuery)){
                redirectPath = redirectQuery[0] || '/'
            } else {
                redirectPath = redirectQuery || '/'
            }
            try {
                const response = await UserService.login(username, password)
                this.accessToken = response.token
                this.loggedInUser = username
                this.authenticating = false
                await router.push(redirectPath)
                return true
            } catch (e) {
                if (e instanceof AuthenticationError) {
                    this.authenticating = false
                    this.authenticationError = e.message
                    this.authenticationErrorCode = e.errorCode
                }
                return false
            }
        },
        async logout() {
            await UserService.logout()
            this.accessToken = ''
            this.loggedInUser = ''
            await router.push('/login')
        },
        async logout401() {
            await UserService.logout401()
            this.accessToken = ''
            this.loggedInUser = ''
            await router.push('/login')
        },
        setUserOnRefresh() {
            const userId = TokenService.getUserId()
            if (userId) {
                this.loggedInUser = userId
            }
            return true
        },
        resetErrorState() {
            this.authenticationError = ''
            this.authenticationErrorCode = 0
        },
    }
})