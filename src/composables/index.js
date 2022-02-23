import useProjectsFunctions from './projects-composable'
import useRequestsFunctions from './requests-composable'
import useAuthentication from './auth-composable'
import { onMounted, ref, watch } from 'vue'
import useModulesFunctions from './modules-composable'

export default function useAllFunctionality () {

    const { auth } = useAuthentication()

    const { fetchProjects, selectedProject, } = useProjectsFunctions()

    const { fetchProjectModules, } = useModulesFunctions()

    const { fetchProjectRequests, setupRequestsFunctions, setNewRequestNotifier } =  useRequestsFunctions()

    watch(auth, ()=> {
        if (auth.value === true) fetchProjects()
    })

    watch(selectedProject, ()=> {
        if (selectedProject.value) {
            setupRequestsFunctions(selectedProject.value)
            fetchProjectModules(selectedProject.value.id)
            fetchProjectRequests(selectedProject.value.id)
        }
    })


    const createdNewRequest = ref(1)

    const notifyNewRequest = () =>  createdNewRequest.value++

    // const approvalChange = ref(1)

    // const notifyApprovalChange = () =>  approvalChange.value++

    onMounted(() => {
        setNewRequestNotifier(notifyNewRequest)
    })

    watch(createdNewRequest, ()=> {
        fetchProjectModules(selectedProject.value.id)
    })

}