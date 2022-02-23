<template>
    <div class="bg-white h-full overflow-hidden p-5">
        <div class="flex items-center">
            <div class="mr-2 font-bold text-gray-700">Explore</div>
            <div class="bg-purple-500 text-white py-1 px-2 flex items-center justify-center rounded-xl text-xs">{{displayedRequests}} {{displayedRequests > 1 || !displayedRequests ? 'Requests' : 'Request'}}</div>
        </div>

        <Projectselection />

        <div v-if="selectedProject" class="h-[90%]">
            <Search />

            <div class="h-[90%]">
                <Filters />
            </div>
        </div>
    </div>
</template>

<script>
import Projectselection from '../project-selection/project-selection.vue'
import Search from '../search/search.vue'
import Filters from '../filters/filters.vue'
import { inject } from '@vue/runtime-core'

export default {
    setup () {
        const selectedProject = inject('selectedProject')
        const displayedRequests = inject('displayedRequests')

        return {
            selectedProject,
            displayedRequests,
        }
    },

    components: { Projectselection, Search, Filters, }
}
</script>