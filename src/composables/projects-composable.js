import axios from "axios";
import { provide, ref } from "vue";

export default function useProjectsFunctions () {

    const noProjectSelected = ref(true)
    
    const selectedProject = ref(null)

    const projectsList = ref([])

    const projectsLoader = ref(false)
    const activateProjectsLoader = () => projectsLoader.value = true
    const deActivateProjectsLoader = () => projectsLoader.value = false

    const fetchProjects = () => {

        activateProjectsLoader()

        axios.get('projects/all', {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}` 
            }
          })
        .then((response) => {

            const { data } = response

            const { status, payload } = data

            if (status === 'success') {

                projectsList.value = payload
            }
        })
        .finally(() => deActivateProjectsLoader())
        
    }

    const selectProject = (value) => {
        selectedProject.value = value
        noProjectSelected.value = false
    }

    provide('projectsLoader', projectsLoader)
    provide('fetchProjects', fetchProjects)
    provide('selectProject', selectProject)
    provide('noProjectSelected', noProjectSelected)
    provide('selectedProject', selectedProject)
    provide('projectsList', projectsList)

    return {
        fetchProjects,
        selectedProject,
    }

}