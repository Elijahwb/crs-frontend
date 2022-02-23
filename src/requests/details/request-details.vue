<template>
    <div v-if="requestDetailsVisible" class="bg-white w-full h-full flex flex-col items-center text-sm py-5">
        <div @click="deActivateRequestDetails" class="w-full pb-3 px-3 text-gray-700 mb-4 border-b border-gray-300 text-sm flex justify-between items-center group">
            <div class="text-purple-500 font-medium cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <div>Requests List</div>
            </div>

            <div class="relative flex items-center">
                <div class="mr-1 font-medium">Status</div>
                <div>
                    <div 
                    :class="{
                        'bg-yellow-300': approvedId === 1,
                        'bg-green-300': approvedId === 2,
                        'bg-red-300': approvedId === 3,
                    }" 
                    class="w-5 h-5  rounded-full"></div>
                    <div
                        :class="{
                        'bg-yellow-300': approvedId === 1,
                        'bg-green-300': approvedId === 2,
                        'bg-red-300': approvedId === 3,
                        }" 
                        class="w-5 h-5 rounded-full absolute top-0 animate-ping"></div>
                </div>
            </div>
        </div>

        <div class="h-[90vh] w-full flex justify-center overflow-y-auto">
            <form @submit.prevent="dispatchCreateNewRequest" autocomplete="off" class="text-gray-600 w-3/5">
                <div class="flex-1 flex flex-col justify-center mt-5 bt-5">
                    <label class="flex flex-col mb-3">
                        <span class="label-content text-sm font-medium text-purple-500 mr-2 uppercase">
                            subject:
                        </span>
                        <input readonly v-model="selectedRequest.title" autocomplete="off" class="mt-1 text-gray-600 py-2 border border-transparent placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-transparent block sm:text-sm focus:ring-0.5" type="text" name="email" placeholder="Request title" required/>
                    </label>

                    <!-- <label class="flex flex-col mb-5">
                        <span class="label-content text-sm font-medium text-purple-500">
                            Module
                        </span>
                        <input class="mt-1 text-gray-600 px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full sm:text-sm focus:ring-0.5"  type="password" required/>
                    </label> -->


                    <div class="relative mb-3">
                        <div class="text-sm font-medium text-purple-500 uppercase mb-1">Requested by:</div>
                        <div class="flex items-center border border-transparent h-9">
                            <input readonly ref="modulesSearchField" :value="`${selectedRequest.requestor.first_name} ${selectedRequest.requestor.last_name}` "  type="text" class="text-gray-600 placeholder-gray-400 focus:outline-none block w-[90%] h-full sm:text-sm focus:ring-0.5" placeholder="select project" required>
                            
                            <!-- <div class="flex items-center justify-center h-full w-[10%]">
                                <svg v-if="!modulesListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                                <svg v-if="modulesListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </div> -->
                        </div>
                    </div>

                    <div class="relative mb-3">
                        <div class="text-sm font-medium text-purple-500 uppercase mb-1">Module:</div>
                        <div class="flex items-center border border-transparent h-9">
                            <input readonly ref="modulesSearchField" :value="selectedRequest.module.name"  type="text" class="text-gray-600 uppercase placeholder-gray-400 focus:outline-none block w-[90%] h-full sm:text-sm focus:ring-0.5" placeholder="select project" required>
                            
                            <!-- <div class="flex items-center justify-center h-full w-[10%]">
                                <svg v-if="!modulesListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                                <svg v-if="modulesListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </div> -->
                        </div>
                    </div>

                    <div class="relative mb-3">
                        <div class="text-sm font-medium text-purple-500 uppercase mb-1">Developer:</div>
                        <div class="flex items-center border border-transparent h-9">
                            <input readonly :value="`${selectedRequest.developer.first_name} ${selectedRequest.developer.last_name}` " ref="developersSearchField" type="text" class="text-gray-600 capitalize placeholder-gray-400 focus:outline-none block w-[90%] h-full sm:text-sm focus:ring-0.5" placeholder="select developer" required>
                            
                            <!-- <div class="flex items-center justify-center h-full w-[10%]">
                                <svg v-if="!developersListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                                <svg v-if="developersListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </div> -->
                        </div>

                        <div v-if="developersListVisible" ref="developersItemsList" class="absolute py-2 bg-white shadow-lg w-full z-10">
                            <div ref="projectElement" :data-developer='JSON.stringify(developer)' v-for="developer, index in developersList" :key="index" class="uppercase p-2 cursor-pointer hover:bg-purple-500 hover:text-white">{{developer.first_name}} {{developer.last_name}}</div>
                            <div v-if="developersList.length === 0" class="p-2 cursor-pointer hover:bg-purple-500 hover:text-white"> No developers found</div>
                        </div>
                    </div>

                    <label class="flex flex-col mb-3">
                        <div class="text-sm font-medium text-purple-500 uppercase mb-2 border-b py-1">
                            Details
                        </div>
                        <div v-html="selectedRequest.description"></div>
                        <!-- <QuillEditor v-model:content="selectedRequest.description" contentType="html" readOnly='true' theme="snow" toolbar='minimal' /> -->
                    </label>


                    <div v-if="user.role_id === 1 && approvedId === 1" class="text-sm text-gray-500 font-medium border-t flex justify-between items-center mt-[5rem] mb-5">
                        <div class="flex items-center">
                            <button @click="declineRequest" :disabled='newRequestLoader' class="py-1 px-2 my-2 text-purple-500 hover:text-white hover:bg-gradient-to-b from-red-300 to-red-400 border border-purple-500 hover:border-red-300 rounded overflow-hidden flex items-center justify-center" type="submit">
                                <div v-if="!newRequestLoader" class="uppercase">Decline</div>
                                <Loader v-if="newRequestLoader" />
                            </button>
                        </div>
                        <div>
                            <button @click="approveRequest" :disabled='newRequestLoader' class="py-1 px-2 my-2 text-white bg-gradient-to-b from-purple-400 to-purple-500 rounded overflow-hidden flex items-center justify-center" type="submit">
                                <div v-if="!newRequestLoader" class="uppercase">approve</div>
                                <Loader v-if="newRequestLoader" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Loader from '@/global/loader'
// import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { inject, computed } from '@vue/runtime-core';

export default {
    setup () {

        const requestDetailsVisible = inject('requestDetailsVisible')

        const selectedRequest = inject('selectedRequest')

        const deActivateRequestDetails = inject('deActivateRequestDetails')

        const user = inject('user')

        const approveRequest = inject('approveRequest')
        const declineRequest = inject('declineRequest')


        const approvedId = computed(() => selectedRequest.value.approval_status_id)

        return {
            user,
            requestDetailsVisible,

            selectedRequest,
            deActivateRequestDetails,

            approveRequest,
            declineRequest,
            approvedId,
        }
    },

    components: { Loader }
}
</script>