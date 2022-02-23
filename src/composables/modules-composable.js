import axios from "axios"
import { provide, ref } from "vue"

export default function useModulesFunctions () {
    const modulesList = ref([])

    const modulesLoader = ref(false)
    const activateModulesLoader = () => modulesLoader.value = true
    const deActivateModulesLoader = () => modulesLoader.value = false

    const fetchProjectModules = (id) => {

        activateModulesLoader()

        const dataObject = {
            projectId: id
        }

        axios.post('modules/all', dataObject, 
        {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
        })
        .then((response) => {

            const { data } = response

            const { status, payload } = data

            console.log('Modules', payload)

            if (status === 'success') {

                modulesList.value = payload

                console.log('modules ', payload)
            }
        })
        .finally(() => deActivateModulesLoader())
    }

    provide('modulesList', modulesList)
    provide('fetchProjectModules', fetchProjectModules)

    return {
        fetchProjectModules,
    }
}