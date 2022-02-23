<template>
    <main class="h-screen flex bg-gray-100">
        <Sidenav />

        <section class="w-[calc(100%-5rem)] overflow-hidden h-full">
            <div class="py-5"></div>
            <section class="container overflow-hidden h-[96%] px-2">
                <slot />
            </section>
        </section>
    </main>
</template>

<script>
import Sidenav from './side-nav.vue'

export default {
    components: { Sidenav }
}
</script>