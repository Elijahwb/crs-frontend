<template>
    <div>
        <div v-if="selectedProject" class="w-full py-3 text-gray-700 mb-4 border-b border-gray-300 text-sm flex justify-between items-center group">
            <div class="text-purple-500 font-medium">{{displayedRequests}}</div>

            <div ref="addRequestActivator" class="flex items-center cursor-pointer hover:opacity-80">
                <div class="font-medium text-purple-500">New request</div>
                <div class="rounded-md shadow border ml-2 p-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </div>
        </div>
            
        <div v-if="selectedProject" class="h-[86.1vh] overflow-auto">
            <div v-if="requestsList.length > 0">
                <div v-for="request, index in requestsList" :key="index">
                    <RequestItem :index="index" :request='request' :title="request.title" :requestedBy='request.requestor.first_name' :workStatus='request.work_status' :approvedStatus='request.approval_status.status' :module="request.module.name" />
                </div>
            </div>

            <div v-if="requestsList.length === 0" class="text-gray-600 uppercase h-full flex items-center justify-center bg-white">
                No requests so far
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref, watch } from '@vue/runtime-core'
import RequestItem from './request-item.vue'
export default {
    setup () {
        const addRequestActivator = ref(null)

        const selectedProject = inject('selectedProject')

        const activateAddRequest = inject('activateAddRequest')

        watch(addRequestActivator, () => {
            if (addRequestActivator.value) addRequestActivator.value.addEventListener('click', activateAddRequest)
        })

        const requestsList = inject('requestsList')

        const displayedRequests = inject('displayedRequests')


        return {
            addRequestActivator,
            selectedProject,
            activateAddRequest,

            requestsList,
            displayedRequests,
        }
    },
    components: { RequestItem }
}
</script>