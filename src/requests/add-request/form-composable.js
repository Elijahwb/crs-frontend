import { inject, ref, watch } from "vue";

export default function useRequestFormFunctions () {
    const modulesListVisible = ref(false)
    const modulesSearchField = ref(null)
    const modulesItemsList = ref(null)
    const selectedModule = ref('')

    const showModulesList = () => modulesListVisible.value = true

    const hideModulesList = () => modulesListVisible.value = false

    const modulesList = inject('modulesList')

    const selectModule = (module) => {
        selectedDeveloper.value = ''
        selectedModule.value = module
        newRequest.value.moduleId = module.id
        developersList.value = module.moduleDevelopers
    }

    const handleBlur = (event) => {
            
        event.preventDefault()
        const target = event.target

        setTimeout(() => {

            modulesListVisible.value = false
            target.blur()
        }, 200)
    }


    watch(modulesSearchField, () => {
        if(modulesSearchField.value) {

            modulesSearchField.value.addEventListener('focusin', showModulesList)
            modulesSearchField.value.addEventListener('focusout', handleBlur)
        }
    })

    watch(modulesItemsList, () => {
        if (modulesItemsList.value) {
            const projectItems = modulesItemsList.value.children
            
            for (let i = 0; i < projectItems.length; i++) {

                projectItems[i].addEventListener('click', ()=> {
                    const project = JSON.parse(projectItems[i].dataset['module'])
                    selectModule(project)
                })
            }

        }
    })


    const developersListVisible = ref(false)
    const developersSearchField = ref(null)
    const developersItemsList = ref(null)
    const selectedDeveloper = ref('')

    const showDevelopersList = () => developersListVisible.value = true

    const hideDevelopersList = () => developersListVisible.value = false

    const developersList = ref([])

    const ed = (developer) => {
        selectedDeveloper.value = developer
        newRequest.value.developerId = developer.id
    }

    const handleDeveloperBlur = (event) => {
            
        event.preventDefault()
        const target = event.target

        setTimeout(() => {

            developersListVisible.value = false
            target.blur()
        }, 200)
    }


    watch(developersSearchField, () => {
        if(developersSearchField.value) {

            developersSearchField.value.addEventListener('focusin', showDevelopersList)
            developersSearchField.value.addEventListener('focusout', handleDeveloperBlur)
        }
    })

    watch(developersItemsList, () => {
        if (developersItemsList.value) {
            const projectItems = developersItemsList.value.children
            
            for (let i = 0; i < projectItems.length; i++) {

                projectItems[i].addEventListener('click', ()=> {
                    const project = JSON.parse(projectItems[i].dataset['developer'])
                    ed(project)
                })
            }

        }
    })

    const selectedProject = inject('selectedProject')
    const user = inject('user')
    const newRequestLoader = inject('newRequestLoader')
    const createNewRequest = inject('createNewRequest')

    const newRequest = ref({
        description: '',
        projectId: selectedProject.value.id,
        requestedBy: user.value.id
    })

    const dispatchCreateNewRequest = () => createNewRequest(newRequest.value)

    return { 
        selectedModule,
        modulesList,
        modulesListVisible,
        showModulesList,
        hideModulesList,
        modulesSearchField,
        modulesItemsList,

        selectedDeveloper,
        developersList,
        developersListVisible,
        showDevelopersList,
        hideDevelopersList,
        developersSearchField,
        developersItemsList,

        newRequest,
        newRequestLoader,
        dispatchCreateNewRequest,
    }
}