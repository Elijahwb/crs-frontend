<template>
    <section class="h-screen flex items-center justify-center bg-gray-100">
        <div class="w-3/5 h-3/5 grid grid-cols-2 rounded shadow-lg bg-white">
            <div class="w-full h-full flex items-center justify-center relative">
                <img src="./assets/img3.png" alt="">
                <div class="absolute top-0 bottom-0 left-0 right-0 bg-purple-500/20"></div>
            </div>
            <LoginForm />
        </div>  
    </section>
</template>

<script>
import LoginForm from './components/login-form.vue'

export default {

    components: { LoginForm },

}
</script>