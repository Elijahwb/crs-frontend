import axios from "axios";
import { computed, provide, ref, toRaw, } from "vue";

export default function useRequestsFunctions () {
    const requestDetailsVisible = ref(false)
    const selectedRequest = ref(null)
    const selectedProjectReferrence = ref(null)
    const newRquestNotifier = ref(null)

    const setupRequestsFunctions = (project) => selectedProjectReferrence.value = project
    const setNewRequestNotifier = (notifier) => newRquestNotifier.value = notifier

    const activateRequestDetails = (request) => {
        requestDetailsVisible.value = true
        selectedRequest.value = request

    }
    
    const deActivateRequestDetails = () => {
        requestDetailsVisible.value = false


        axios.post('requests/view', {requestId: selectedRequest.value.id},
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then((response) => {
            const { data } = response

            const { status } = data

            if(status === 'success') {
                fetchProjectRequests(selectedProjectReferrence.value.id)
            }
        })
        .finally(() => selectedRequest.value = null)
    }

    provide('selectedRequest', selectedRequest)
    provide('requestDetailsVisible', requestDetailsVisible)
    provide('activateRequestDetails', activateRequestDetails)
    provide('deActivateRequestDetails', deActivateRequestDetails)


    const isAddRequestVisible = ref(false)

    const activateAddRequest = () => isAddRequestVisible.value = true
    const deActivateAddRequest = () => isAddRequestVisible.value = false

    const requestsList = ref(null)
    const compoApprovedRequests = ref(0)
    const compoDeclinedRequests = ref(0)
    const compoPendingRequests = ref(0)
    const compoClosedRequests = ref(0)
    const compoCompleteRequests = ref(0)
    const compoInProgressRequests = ref(0)


    const requestSearchQuery = ref('')

    const requestsLoader = ref(false)
    const activateRequestsLoader = () => requestsLoader.value = true
    const deActivateRequestsLoader = () => requestsLoader.value = false
    const fetchProjectRequests = (id) => {

        activateRequestsLoader()

        const dataObject = {
            projectId: id
        }

        axios.post('requests/all', dataObject, 
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then((response) => {

            const { data } = response

            const { status, payload } = data

            console.log('Response ', payload)

            if (status === 'success') {
                const { allRequests, approvedRequests, declinedRequests, pendingRequests, closedRequests, completeRequests, inProgressRequests } = payload

                requestsList.value = allRequests
                compoApprovedRequests.value = approvedRequests
                compoDeclinedRequests.value = declinedRequests
                compoPendingRequests.value = pendingRequests
                compoClosedRequests.value = closedRequests,
                compoCompleteRequests.value = completeRequests,
                compoInProgressRequests.value = inProgressRequests,


                deActivateRequestsLoader()
            }

        })
    }

    const approvalFilters = ref([])

    const addApprovalFilter = (filterId) => approvalFilters.value.push(filterId)

    const removeApprovalFilter = (filterId) => {
        approvalFilters.value = approvalFilters.value.filter((filter) => filter !== filterId )
    }

    const workStatusFilters = ref([])

    const addWorkStatusFilter = (filterId) => workStatusFilters.value.push(filterId)

    const removeWorkStatusFilter = (filterId) => {
        workStatusFilters.value = workStatusFilters.value.filter((filter) => filter !== filterId )
    }

    const moduleFilters = ref([])

    const addModuleFilter = (moduleId) => moduleFilters.value.push(moduleId)

    const removeModuleFilter = (moduleId) => {
        moduleFilters.value = moduleFilters.value.filter((filter) => filter !== moduleId )
    }

    const resetRequestsFilters = () => {
        requestSearchQuery.value = ''
        approvalFilters.value = []
        workStatusFilters.value = []
        moduleFilters.value = []
        document.querySelectorAll('input[type=checkbox]').forEach((input) => input.checked = false)
    }


    const filteredRequests = computed(() => {
        if(requestsList.value) {
            let finalList = [...requestsList.value]

            // Filtering by searching
            if (requestSearchQuery.value !== '') {
                finalList = requestsList.value.filter((request) => {
                    if (request.title.toLowerCase().includes(requestSearchQuery.value.toLowerCase())) return request

                    else if (request.description.toLowerCase().includes(requestSearchQuery.value.toLowerCase())) return request

                    else if (`${request.requestor.first_name} ${request.requestor.last_name}`.toLowerCase().includes(requestSearchQuery.value.toLowerCase())) return request
                })
            }

            // Filtering by approval
            if (approvalFilters.value.length !== 0) {

                let resultedList = []

                for (let i = 0; i < approvalFilters.value.length; i++) {
                    let list = finalList.filter((request) => {
                        if (request.approval_status_id === approvalFilters.value[i]) return request
                    })

                    resultedList = [...resultedList,...list]
                }

                finalList = resultedList
            }

            // Filtering by workstatus
            if (workStatusFilters.value.length !== 0) {

                let resultedList = []

                for (let i = 0; i < workStatusFilters.value.length; i++) {
                    let list = finalList.filter((request) => {
                        if (request.work_status_id === workStatusFilters.value[i]) return request
                    })

                    resultedList = [...resultedList,...list]

                    console.log('list', list)
                }

                finalList = resultedList
            }

            // Filtering by modules
            if (moduleFilters.value.length !== 0) {

                let resultedList = []

                for (let i = 0; i < moduleFilters.value.length; i++) {
                    let list = finalList.filter((request) => {
                        if (request.module_id === moduleFilters.value[i]) return request
                    })

                    resultedList = [...resultedList,...list]

                    console.log('list', list)
                }

                finalList = resultedList
            }


            return finalList
        }
        return requestsList
    })

    const displayedRequests = computed(() => filteredRequests.value.length)


    const newRequestLoader = ref(false)
    const activateNewRequestLoader = () => newRequestLoader.value = true
    const deActivateNewRequestLoader = () => newRequestLoader.value = false

    const createNewRequest = (newRequest) => {
        activateNewRequestLoader()
        let obj = toRaw(newRequest)

        console.log(obj)

        axios.post('requests/create', obj, 
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then((response) => {
            const { data } = response
            const { status, payload } = data

            if (status === 'success') {
                const { allRequests, approvedRequests, declinedRequests, pendingRequests } = payload

                requestsList.value = allRequests
                compoApprovedRequests.value = approvedRequests
                compoDeclinedRequests.value = declinedRequests
                compoPendingRequests.value = pendingRequests

                isAddRequestVisible.value = false

                newRquestNotifier.value()

            }
        })
        .finally(() => {
            deActivateNewRequestLoader()
            isAddRequestVisible.value = false
        })
    }

    const approveRequest = () => {
        axios.post('requests/approve', {requestId: selectedRequest.value.id},{
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then(response => {
            const { data } = response
            const { status, payload } = data

            if (status === 'success') {
                const { allRequests, approvedRequests, declinedRequests, pendingRequests, closedRequests, completeRequests, inProgressRequests } = payload

                requestsList.value = allRequests
                compoApprovedRequests.value = approvedRequests
                compoDeclinedRequests.value = declinedRequests
                compoPendingRequests.value = pendingRequests
                compoClosedRequests.value = closedRequests
                compoCompleteRequests.value = completeRequests
                compoInProgressRequests.value = inProgressRequests

                allRequests.forEach(request => {
                    if (request.id === selectedRequest.value.id) {
                        selectedRequest.value = request
                    }
                })
            }
        })
    }

    const declineRequest = () => {
        axios.post('requests/decline', {requestId: selectedRequest.value.id},
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then(response => {
            const { data } = response
            const { status, payload } = data

            if (status === 'success') {
                const { allRequests, approvedRequests, declinedRequests, pendingRequests, closedRequests, completeRequests, inProgressRequests } = payload

                requestsList.value = allRequests
                compoApprovedRequests.value = approvedRequests
                compoDeclinedRequests.value = declinedRequests
                compoPendingRequests.value = pendingRequests
                compoClosedRequests.value = closedRequests
                compoCompleteRequests.value = completeRequests
                compoInProgressRequests.value = inProgressRequests

                allRequests.forEach(request => {
                    if (request.id === selectedRequest.value.id) {
                        selectedRequest.value = request
                    }
                })
            }
        })
    }

    const completeRequestLoader = ref(false)
    const completeRequest = (requestId) => {
        completeRequestLoader.value = true
        console.log('inside complete request function')
        axios.post('requests/complete', {requestId: requestId},
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then(response => {
            const { data } = response
            const { status, payload } = data

            console.log('data', data)

            if (status === 'success') {
                const { allRequests, approvedRequests, declinedRequests, pendingRequests, closedRequests, completeRequests, inProgressRequests } = payload

                requestsList.value = allRequests
                compoApprovedRequests.value = approvedRequests
                compoDeclinedRequests.value = declinedRequests
                compoPendingRequests.value = pendingRequests
                compoClosedRequests.value = closedRequests
                compoCompleteRequests.value = completeRequests
                compoInProgressRequests.value = inProgressRequests
            }
        })
        .finally(() => completeRequestLoader.value = false)
    }

    const closeRequest = (requestId) => {
        completeRequestLoader.value = true
        console.log('inside complete request function')
        axios.post('requests/close', {requestId: requestId},
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then(response => {
            const { data } = response
            const { status, payload } = data

            console.log('data', data)

            if (status === 'success') {
                const { allRequests, approvedRequests, declinedRequests, pendingRequests, closedRequests, completeRequests, inProgressRequests } = payload

                requestsList.value = allRequests
                compoApprovedRequests.value = approvedRequests
                compoDeclinedRequests.value = declinedRequests
                compoPendingRequests.value = pendingRequests
                compoClosedRequests.value = closedRequests
                compoCompleteRequests.value = completeRequests
                compoInProgressRequests.value = inProgressRequests
            }
        })
        .finally(() => completeRequestLoader.value = false)
    }


    provide('newRequestLoader', newRequestLoader)
    provide('createNewRequest', createNewRequest)

    /** FILTERS SECTION **/
    provide('requestSearchQuery', requestSearchQuery)
    provide('addApprovalFilter', addApprovalFilter)
    provide('removeApprovalFilter', removeApprovalFilter)
    provide('addWorkStatusFilter', addWorkStatusFilter)
    provide('removeWorkStatusFilter', removeWorkStatusFilter)
    provide('addModuleFilter', addModuleFilter)
    provide('removeModuleFilter', removeModuleFilter)
    provide('resetRequestsFilters', resetRequestsFilters)

    provide('requestsList', filteredRequests)
    provide('displayedRequests', displayedRequests)
    provide('approvedRequests', compoApprovedRequests)
    provide('declinedRequests', compoDeclinedRequests)
    provide('pendingRequests', compoPendingRequests)
    provide('closedRequests', compoClosedRequests)
    provide('completeRequests', compoCompleteRequests)
    provide('inProgressRequests', compoInProgressRequests)

    provide('isAddRequestVisible', isAddRequestVisible)
    provide('activateAddRequest', activateAddRequest)
    provide('deActivateAddRequest', deActivateAddRequest)

    provide('approveRequest', approveRequest)
    provide('declineRequest', declineRequest)
    provide('completeRequest', completeRequest)
    provide('completeRequestLoader', completeRequestLoader)
    provide('closeRequest', closeRequest)



    return {
        fetchProjectRequests,
        setupRequestsFunctions,
        setNewRequestNotifier,
    }

}