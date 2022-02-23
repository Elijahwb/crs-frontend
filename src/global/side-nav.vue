<template>
    <div class="w-[5rem] h-screen bg-white shadow-lg flex justify-center">
        <div class="h-full w-full flex flex-col items-center justify-between py-10">
           <div></div>
           <div class="relative group">
                <svg @click="logout" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <div class="hidden group-hover:block absolute top-0.5 left-7 bg-purple-500 text-white text-sm px-2 rounded-sm">
                    logout
                </div>
           </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";

    const logout = inject('logout')
</script>