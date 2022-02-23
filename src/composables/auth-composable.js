import axios from "axios";
import { onMounted, provide, ref } from "vue";
import router from '@/router'

export default function useAuthentication () {
    
    const authenticatedUser = ref(null)
    const token = ref(null)
    const auth = ref(false)

    onMounted(() => {
        const storedAuth = sessionStorage.getItem('crtsBEWAuth') === 'true' ? true : false
        const storedToken = sessionStorage.getItem('crtsBEWToken')
        const storedUser = sessionStorage.getItem('crtsBEWUser')

        console.log('Auth ', sessionStorage.getItem('crtsBEWAuth'))

        if (storedAuth) {
            token.value = storedToken
            authenticatedUser.value = JSON.parse(storedUser)
            auth.value = storedAuth

        }
    })

    const loginLoader = ref(false)
    const activateLoginLoader = () => loginLoader.value = true
    const deActivateLoginLoader = () => loginLoader.value = false

    const login = (credentials) => {

        activateLoginLoader()
        
        axios.post('auth/login', credentials)
        .then( async(response) => {

            const { data } = response

            const { status, payload } = data

            if ( status === 'success') {

                const { token, user } = payload

                sessionStorage.setItem('crtsBEWToken', token)
                sessionStorage.setItem('crtsBEWUser', JSON.stringify(user))

                authenticatedUser.value = user

                auth.value = true

                sessionStorage.setItem('crtsBEWAuth', true)

                router.push('/landing')
            }
        })
        
        .catch((e) => console.log(e))

        .finally(() => {
            deActivateLoginLoader()
        })
    }

    const logout = () => {
        sessionStorage.removeItem('crtsBEWToken')
        sessionStorage.removeItem('crtsBEWUser')
        sessionStorage.removeItem('crtsBEWAuth')

        authenticatedUser.value = null
        token.value = null
        auth.value = false

        router.go()
    }

    provide('login', login)
    provide('logout', logout)
    provide('loginLoader', loginLoader)
    provide('user', authenticatedUser)
    provide('token', token)
    provide('auth', auth)

    return {
        auth,
    }
}