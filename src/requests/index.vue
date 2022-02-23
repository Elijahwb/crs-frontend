<template>
    <div class="w-full h-[95vh] overflow-hidden my-5 py-5 grid grid-cols-4 gap-5">
        <Explore />
        
        <div class="col-span-3 overflow-hidden h-full">
            <div v-if="!isAddRequestVisible && !requestDetailsVisible " class="h-full">
                <EmptyList />

                <RequestList />

            </div>

             <Requestdetails />

            <AddRequest v-if="isAddRequestVisible" />
        </div>
    </div>
</template>

<script>
import Explore from './explore'
import EmptyList from './empty'
import AddRequest from './add-request'
import RequestList from './list/requests-list.vue'
import Requestdetails from './details/request-details.vue'

import { inject } from '@vue/runtime-core'


export default {
    
    setup () {
        const selectedProject = inject('selectedProject')

        const isAddRequestVisible = inject('isAddRequestVisible')

        const requestDetailsVisible = inject('requestDetailsVisible')

        return {
            selectedProject,
            isAddRequestVisible,
            requestDetailsVisible,
        }
    },

    components: { Explore, EmptyList, AddRequest, RequestList, Requestdetails, }
}
</script>