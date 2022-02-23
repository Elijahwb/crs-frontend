<template>
    <div v-if="!selectedProject" class="text-gray-600 uppercase h-full flex items-center justify-center bg-white rounded relative">
        <div class="h-full w-full flex flex-col items-center justify-center">
            <img class="w-2/5" src="../assets/img1.png" alt="">
                <div>Please select a project to view change requests</div>
        </div>
        
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    
    setup () {
        const selectedProject = inject('selectedProject')

        return {
            selectedProject
        }
    },
}
</script>