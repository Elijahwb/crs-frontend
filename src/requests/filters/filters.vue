<template>
    <div class="text-sm overflow-y-auto h-[85%]">
        <div class="text-gray-600 font-medium mb-2">Approval Status</div>
        <div class="text-gray-500">
            <div class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                   <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleApprovalCheck($event, 2)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">Approved</div>
                </div>

                <div class="text-gray-500">{{approvedRequests}}</div>
            </div>

            <div class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                    <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleApprovalCheck($event, 1)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">Pending</div>
                </div>

                <div class="text-gray-500">{{pendingRequests}}</div>
            </div>

            <div class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                    <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleApprovalCheck($event, 3)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">Declined</div>
                </div>

                <div class="text-gray-500">{{declinedRequests}}</div>
            </div>
        </div>

        <div class="text-gray-600 font-medium mb-2">Working Status</div>
        <div class="text-gray-500">

            <div class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                    <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleWorkStatusCheck($event, 4)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">Closed</div>
                </div>

                <div class="text-gray-500">{{closedRequests}}</div>
            </div>

            <div class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                    <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleWorkStatusCheck($event, 3)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">Complete</div>
                </div>

                <div class="text-gray-500">{{completeRequests}}</div>
            </div>

            <div class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                    <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleWorkStatusCheck($event, 2)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">In Progress</div>
                </div>

                <div class="text-gray-500">{{inProgressRequests}}</div>
            </div>
        </div>

        <div class="text-gray-600 font-medium mb-2">Module</div>
        <div class="text-gray-500">
            <div v-for="mod, index in modulesList" :key="index" class="flex justify-between items-center my-3 pr-3">
                <div class="flex items-center">
                    <label class="check-container pr-0">
                        <span></span>
                        <input type="checkbox" @input="handleModuleCheck($event, mod.id)">
                        <span class="checkmark shadow-wbe rounded"></span>
                    </label>
                    <div class="font-medium ml-4 mt-2">{{mod.name}}</div>
                </div>

                <div class="text-gray-700 font-medium">{{mod.requests}}</div>
            </div>

            <div v-if="modulesList && modulesList.length === 0" class="flex items-center my-3">No Modules Present</div>

        </div>

        <div class="flex items-center justify-between pt-5 mt-5 uppercase">
            <div class="text-gray-600">Coverage</div>
            <div @click="resetRequestsFilters" class="text-purple-500 cursor-pointer hover:opacity-80">Reset</div>
        </div>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    setup () {
        const modulesList = inject('modulesList')

        const addApprovalFilter = inject('addApprovalFilter')
        const removeApprovalFilter = inject('removeApprovalFilter')

        const addWorkStatusFilter = inject('addWorkStatusFilter')
        const removeWorkStatusFilter = inject('removeWorkStatusFilter')

        const addModuleFilter = inject('addModuleFilter')
        const removeModuleFilter = inject('removeModuleFilter')

        const resetRequestsFilters = inject('resetRequestsFilters')

        const approvedRequests = inject('approvedRequests')
        const declinedRequests = inject('declinedRequests')
        const pendingRequests = inject('pendingRequests')
        const closedRequests = inject('closedRequests')
        const completeRequests = inject('completeRequests')
        const inProgressRequests = inject('inProgressRequests')

        const handleApprovalCheck = (event, id) => {
            if (event.target.checked) addApprovalFilter(id)

            else removeApprovalFilter(id)
            
        }

        const handleWorkStatusCheck = (event, id) => {
            if (event.target.checked) addWorkStatusFilter(id)

            else removeWorkStatusFilter(id)
            
        }

        const handleModuleCheck = (event, id) => {
            if (event.target.checked) addModuleFilter(id)

            else removeModuleFilter(id)
            
        }

        return {
            modulesList,
            handleApprovalCheck,
            handleWorkStatusCheck,
            handleModuleCheck,
            resetRequestsFilters,

            approvedRequests,
            pendingRequests,
            declinedRequests,
            closedRequests,
            completeRequests,
            inProgressRequests,

        }
    }
}
</script>