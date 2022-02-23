<template>
    <div class="w-full p-5 flex flex-col items-center justify-center">
        <div class="flex items-center justify-center">
            <div class="uppercase text-xl border text-purple-500 rounded-full h-14 w-14 flex justify-center items-center">crs</div>
        </div>

        <div class="flex items-center justify-center text-xl text-gray-600 mb-5 pb-5">Welcome back!</div>

        <form @submit.prevent="dispatchLogin" autocomplete="off" class="text-gray-600 w-full">
            <div class="flex-1 flex flex-col justify-center mt-5 bt-5">
                <label class="flex flex-col mb-5">
                    <span class="label-content text-sm">
                        Email Address
                    </span>
                    <input v-model="credentials.email" autocomplete="off" class="mt-1 text-gray-600 px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full rounded-md sm:text-sm focus:ring-1" type="email" name="email" placeholder="mutoni@example.com" required/>
                </label>

                <label class="flex flex-col mb-5">
                    <span class="label-content  text-sm">
                        Password
                    </span>
                    <input v-model="credentials.password" class="mt-1 text-gray-600 px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full rounded-md sm:text-sm focus:ring-1"  type="password" required/>
                </label>

                <div class="text-sm text-gray-500 font-medium flex justify-between items-center my-1">
                    <div class="flex items-center">
                        <input type="checkbox" />
                        <div class="ml-2">remember me</div>
                    </div>
                    <div><router-link class="hover:text-purple-500" to='/'>Forgot password?</router-link></div>
                </div>

                <button :disabled='loginLoader' class="py-1 my-2 text-white bg-gradient-to-b from-purple-400 to-purple-500 rounded overflow-hidden flex items-center justify-center" type="submit">
                    <div v-if="!loginLoader">Login</div>
                    <Loader v-if="loginLoader" />
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import Loader from '@/global/loader'
import { inject, ref } from '@vue/runtime-core'

export default {

    setup () {
        const login = inject('login')
        const loginLoader = inject('loginLoader')

        const credentials = ref({})

        const dispatchLogin = () => {
            login(credentials.value)
        }

        return {
            dispatchLogin,
            loginLoader,
            credentials
        }
    },

    components: { Loader }
}
</script>