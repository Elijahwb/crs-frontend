<template>
    <div :class="{'text-gray-900 font-bold': !request.viewed}" class="w-full p-3 bg-white text-gray-700 grid grid-cols-7 gap-1 mb-4 text-[12.5px] group">
        <div @click="activateRequestDetails(request)" class="col-span-2">
            <p class="overflow-ellipsis whitespace-nowrap overflow-hidden w-[90%] text-purple-500 cursor-pointer">{{title}}</p>
        </div>

        <div class="uppercase">{{requestedBy}}</div>

        <div class="uppercase">{{module}}</div>

        <div>05-02-2022</div>

        <div class="flex items-center">
            <div v-if="approvedStatus === 'Pending' " class="bg-yellow-200 text-yellow-600 px-2 py-0.5 rounded">{{approvedStatus}}</div>
            <div v-if="approvedStatus === 'Approved' " class="bg-green-200 text-green-600 px-2 py-0.5 rounded">{{approvedStatus}}</div>
            <div  v-if="approvedStatus === 'Declined' " class="bg-red-200 text-red-600 px-2 py-0.5 rounded">{{approvedStatus}}</div>
        </div>

        <div class="flex justify-between items-center relative">
            <div v-if="approvedStatus === 'Pending' " class="flex items-center">
                <div class="w-3 h-3 rounded-full border-2 border-yellow-300 mr-2"></div>
                <div>Waiting approval</div>
            </div>

            <div v-if="workStatus.id === 2 " class="flex items-center">
                <div class="w-3 h-3 rounded-full border-2 border-blue-300 mr-2"></div>
                <div>In progress</div>
            </div>

            <div v-if="workStatus.id === 3 " class="flex items-center">
                <div class="w-3 h-3 rounded-full border-2 border-green-300 mr-2"></div>
                <div>Completed</div>
            </div>

            <div v-if="workStatus.id === 4 " class="flex items-center">
                <div class="w-3 h-3 rounded-full border-2 border-gray-300 mr-2"></div>
                <div>Closed</div>
            </div>
            
            <svg v-if="request.work_status_id !== 4 && ((user.id === request.developer_id || user.role_id === 1) && request.approval_status_id !== 1) " @click="showActions(index)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>

            <div v-if="activeActions === index" class="absolute bg-white border border-purple-200 shadow-lg py-1 px-3 w-40 rounded-b right-2 top-7 z-10" :id=" 'actions-' + index ">
                <!-- <div class="py-1 px-2 my-1.5 w-full cursor-pointer rounded flex items-center hover:text-blue-500">
                    <div class="w-3 h-3 rounded-full border-2 border-blue-500 mr-2"></div>
                    <div >In Progress</div>
                </div> -->
                <div class="relative">
                    <div v-if="user.id === request.developer_id" @click="completeRequest(request.id)" class="py-1 px-2 my-1.5 w-full cursor-pointer rounded flex items-center hover:text-purple-500">
                        <div class="w-3 h-3 rounded-full border-2 border-purple-500 mr-2"></div>
                        <div>Complete</div>
                    </div>
                    <div v-if="user.role_id === 1" @click="closeRequest(request.id)" class="py-1 px-2 my-1.5 w-full cursor-pointer rounded flex items-center hover:text-green-500">
                        <div class="w-3 h-3 rounded-full border-2 border-green-500 mr-2"></div>
                        <div>Close</div>
                    </div>

                    <div v-if="completeRequestLoader" class="absolute bg-white/10 backdrop-blur-sm top-0 bottom-0 right-0 left-0 flex items-center justify-center">
                        loading...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {

    props: {
        title: String,
        requestedBy: String,
        module: String,
        date: String,
        approvedStatus: String,
        workStatus: Object,
        request: Object,
        index: Number,
    },

    setup (props) {

        const activeActions = ref(-1)

        const showActions = (index) => {
            if (activeActions.value !== index){

                activeActions.value = index

                setTimeout(()=> {
                    document.addEventListener('click', deactivateActions)
                }, 300)
            } 

            else  activeActions.value = -1
            
        }

        const deactivateActions = (event) => {
            const targetElement = document.getElementById(`actions-${props.index}`)

            let isTargetElementClicked = targetElement ? targetElement.contains(event.target) : false

            if (isTargetElementClicked) {

                // setTimeout(()=> {
                //     activeActions.value = -1
                // }, 300)
            }

            else {
                activeActions.value = -1

                setTimeout(()=> {
                    document.removeEventListener('click', deactivateActions)
                }, 500)
            }

            
        }

        const activateRequestDetails = inject('activateRequestDetails')

        const user = inject('user')

        const completeRequest = inject('completeRequest')
        const closeRequest = inject('closeRequest')
        const completeRequestLoader = inject('completeRequestLoader')

        return {
            activeActions,
            showActions,

            activateRequestDetails,

            user,

            completeRequest,
            closeRequest,
            completeRequestLoader,
        }
    }
    
}
</script>