<template>
    <div class="w-full my-5 text-sm text-gray-500 relative">
        <div class="font-medium mb-2">Project</div>
       <div class="flex items-center w-full border-b border-gray-300 h-9">
            <input :disabled='projectsLoader' v-if="!noProjectSelected" ref="projectsSearchField" v-model="selectedProject.name" type="text" class="outline-none w-[90%] h-full px-1 uppercase font-medium text-purple-500" :class="{'placeholder-purple-500' : projectsLoader}" :placeholder="projectsLoader ? 'Loading projects...' : 'select project' ">
            <input :disabled='projectsLoader' v-if="noProjectSelected" ref="projectsSearchField" type="text" class="outline-none w-[90%] h-full px-1 uppercase" :class="{'placeholder-purple-500' : projectsLoader}" :placeholder="projectsLoader ? 'Loading projects...' : 'select project' ">
            <div class="flex items-center justify-center h-full w-[10%]">
                <svg v-if="!projectsListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
                <svg v-if="projectsListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
            </div>
        </div>
        <div ref="projectsItemsList" v-if="projectsListVisible" class="absolute py-2 bg-white shadow w-full z-10">
            <div :data-project='JSON.stringify(project)' v-for="project, index in projectsList" :key="index" class="uppercase p-2 cursor-pointer hover:bg-purple-500 hover:text-white">{{project.name}}</div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { inject, watch } from '@vue/runtime-core'
export default {
    setup () {
        const projectsSearchField = ref(null)
        const projectsItemsList = ref(null)
        const projectsListVisible = ref(false)

        const noProjectSelected = inject('noProjectSelected')
        const selectProject = inject('selectProject')
        const selectedProject = inject('selectedProject')
        const projectsList = inject('projectsList')

        const projectsLoader = inject('projectsLoader')

        const showProjects = () => projectsListVisible.value = true

        const handleBlur = (event) => {
            
            event.preventDefault()
            const target = event.target

            setTimeout(() => {

                projectsListVisible.value = false
                target.blur()
            }, 200)
        }
    

        watch(projectsSearchField, () => {
            if(projectsSearchField.value) {

                projectsSearchField.value.addEventListener('focusin', showProjects)
                projectsSearchField.value.addEventListener('focusout', handleBlur)
            }
        })

        watch(projectsItemsList, () => {
            if (projectsItemsList.value) {
                const projectItems = projectsItemsList.value.children
                
                for (let i = 0; i < projectItems.length; i++) {

                    projectItems[i].addEventListener('click', ()=> {
                        const project = JSON.parse(projectItems[i].dataset['project'])
                        selectProject(project)
                    })
                }

            }
        })

        return {
            projectsListVisible,
            projectsSearchField,
            projectsList,
            projectsItemsList,
            noProjectSelected,
            selectedProject,
            showProjects,
            selectProject,
            handleBlur,
            projectsLoader,
        }
    }
}
</script>